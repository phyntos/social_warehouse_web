import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { ActionType, ProForm, ProFormDatePicker, ProFormRadio, ProFormSelect } from '@ant-design/pro-components';
import { Col, Row, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProButton from '../../../common/ProButton/ProButton';
import { useProContainerTitle } from '../../../common/ProContainer/ProContainer';
import ProHeader from '../../../common/ProHeader/ProHeader';
import ProWorkflow from '../../../common/ProWorkflow/ProWorkflow';
import DirectorySelect from '../../../components/Directory/DirectorySelect';
import { deepComparison } from '../../../functions';
import { useAppDispatch } from '../../../redux/hooks';
import {
    OperationActionCodes,
    OperationApi,
    OperationTypeCodes,
    OperationTypesEnum,
    OperationVM,
    useGetOperationByIdQuery,
    usePostActionOperationMutation,
    useUpdateOperationMutation,
} from '../OperationApi/OperationApi';
import OperationPosition from '../OperationPosition/OperationPosition';
import './OperationItem.scss';

const ValidateActions: OperationActionCodes[] = ['SEND_TO_CONFIRMATION'];

const toLowerCase = <T extends string>(str: T) => str.toLowerCase() as Lowercase<T>;

const OperationItem = () => {
    const { id = '' } = useParams();
    const operationPositonRef = useRef<ActionType>();

    const [form] = ProForm.useForm<OperationVM>();
    const { data: operation, isFetching, refetch } = useGetOperationByIdQuery(id, { skip: !id });
    const [postAction] = usePostActionOperationMutation();
    const [updateOperation] = useUpdateOperationMutation();
    useProContainerTitle(operation?.code || '');

    const operationType = ProForm.useWatch('operationType', form);
    const fromPlaceType = ProForm.useWatch('fromPlaceType', form);
    const toPlaceType = ProForm.useWatch('toPlaceType', form);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onSetForm = useCallback(() => {
        if (operation) {
            form.setFieldsValue(operation);
        }
    }, [form, operation]);

    const onSaveForm = async (validate?: boolean) => {
        const values = validate === true ? await form.validateFields() : form.getFieldsValue();

        const request = Object.assign({}, operation, values);
        const isCompared = deepComparison(operation, request);

        if (isCompared) return;

        await updateOperation(request).unwrap();
        return request;
    };

    useEffect(() => {
        onSetForm();
    }, [onSetForm]);

    const actionClick = async (actionCode: OperationActionCodes, fields?: Record<string, any>) => {
        const savedData = await onSaveForm(ValidateActions.includes(actionCode));
        await postAction({ ...operation, ...savedData, actionCode, ...fields, id }).unwrap();
        if (actionCode === 'DELETE_AT_DRAFT') navigate('/deliveryOrders/list');
        dispatch(OperationApi.util.invalidateTags([{ type: 'Operation', id }]));
    };

    const setField = <Key extends keyof OperationVM>(name: Key, value: OperationVM[Key] | undefined = undefined) => {
        form.setFieldValue(name, value);
    };

    return (
        <Spin spinning={isFetching}>
            <ProHeader
                infos={[
                    { key: 'code', label: 'Код операции', value: operation?.code },
                    {
                        key: 'createdDate',
                        label: 'Дата создания',
                        value: dayjs(operation?.createdDate).format('DD.MM.YYYY HH:mm'),
                    },
                ]}
                actionItems={operation?.actions?.map((action) => ({
                    label: action.name,
                    onClick: (fields) => actionClick(action.code, fields),
                    key: action.code,
                    modalFields: action.modalFields,
                }))}
                onReload={() => {
                    dispatch(OperationApi.util.invalidateTags([{ type: 'Operation', id }]));
                    operationPositonRef.current?.reloadAndRest?.();
                }}
            />
            <ProWorkflow workflows={operation?.workflows} />

            <ProForm submitter={false} form={form} className='operation-item-form'>
                <Row gutter={[10, 10]}>
                    <Col span={6}>
                        <ProFormSelect<OperationTypeCodes>
                            name='operationType'
                            valueEnum={OperationTypesEnum}
                            label='Тип операции'
                            fieldProps={{
                                onChange: (value) => {
                                    setField('fromPlaceGuid');
                                    setField('toPlaceGuid');
                                    switch (value) {
                                        case 'Movement':
                                            setField('fromPlaceType', 'Warehouse');
                                            setField('toPlaceType', 'Shop');
                                            break;
                                        case 'Adding':
                                            setField('fromPlaceType');
                                            setField('toPlaceType', 'Warehouse');
                                            break;
                                        case 'Removing':
                                            setField('fromPlaceType', 'Warehouse');
                                            setField('toPlaceType');
                                            break;
                                        default:
                                            break;
                                    }
                                },
                            }}
                        />
                    </Col>
                    <Col span={6}>
                        <ProFormDatePicker label='Дата операции' name='operationDate' />
                    </Col>
                    <Col span={6}></Col>
                    <Col span={6}>
                        <div style={{ textAlign: 'right' }}>
                            <Space>
                                <ProButton onAsyncClick={() => onSaveForm()} icon={<SaveOutlined />}>
                                    Сохранить
                                </ProButton>
                                <ProButton type='default' onClick={() => onSetForm()} icon={<RollbackOutlined />}>
                                    Отмена
                                </ProButton>
                            </Space>
                        </div>
                    </Col>
                    <Col span={6}>
                        {operationType !== 'Adding' && (
                            <Space align='end' className='operation-place-field'>
                                <ProFormRadio.Group
                                    valueEnum={{
                                        Warehouse: 'Склад',
                                        Shop: 'Магазин',
                                    }}
                                    radioType='button'
                                    label='Откуда'
                                    name='fromPlaceType'
                                    disabled={operationType === 'Movement'}
                                    fieldProps={{ onChange: () => setField('fromPlaceGuid') }}
                                />
                                {fromPlaceType && (
                                    <DirectorySelect directory={toLowerCase(fromPlaceType)} name='fromPlaceGuid' />
                                )}
                            </Space>
                        )}
                    </Col>
                    <Col span={6}>
                        {operationType !== 'Removing' && (
                            <Space align='end' className='operation-place-field'>
                                <ProFormRadio.Group
                                    valueEnum={{
                                        Warehouse: 'Склад',
                                        Shop: 'Магазин',
                                    }}
                                    radioType='button'
                                    label='Куда'
                                    name='toPlaceType'
                                    disabled
                                    fieldProps={{ onChange: () => setField('toPlaceGuid') }}
                                />
                                {toPlaceType && (
                                    <DirectorySelect directory={toLowerCase(toPlaceType)} name='toPlaceGuid' />
                                )}
                            </Space>
                        )}
                    </Col>
                </Row>
            </ProForm>

            <OperationPosition actionRef={operationPositonRef} operationId={id} />
        </Spin>
    );
};

export default OperationItem;
