import { ActionType, ProForm, ProFormDatePicker } from '@ant-design/pro-components';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContainerTitle } from '../../../common/Container/Container';
import ProHeader from '../../../common/ProHeader/ProHeader';
import ProWorkflow from '../../../common/ProWorkflow/ProWorkflow';
import { deepComparison } from '../../../functions';
import { useAppDispatch } from '../../../redux/hooks';
import {
    AppealActionCodes,
    AppealApi,
    AppealVM,
    useGetAppealByIdQuery,
    usePostActionAppealMutation,
    useUpdateAppealMutation,
} from '../AppealApi/AppealApi';
import AppealPosition from '../AppealPosition/AppealPosition';
import './AppealItem.scss';

const ValidateActions: AppealActionCodes[] = ['SEND_TO_CONFIRMATION'];

const AppealItem = () => {
    useContainerTitle('Карточка заявки');
    const { id = '' } = useParams();
    const appealPositonRef = useRef<ActionType>();

    const [form] = ProForm.useForm<AppealVM>();
    const { data: appeal, isFetching, refetch } = useGetAppealByIdQuery(id, { skip: !id });
    const [postAction] = usePostActionAppealMutation();
    const [updateAppeal] = useUpdateAppealMutation();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onSetForm = useCallback(() => {
        if (appeal) {
            form.setFieldsValue(appeal);
        }
    }, [form, appeal]);

    const onSaveForm = async (validate?: boolean) => {
        const values = validate === true ? await form.validateFields() : form.getFieldsValue();

        const request = Object.assign({}, appeal, values);
        const isCompared = deepComparison(appeal, request);

        if (isCompared) return;

        await updateAppeal(request).unwrap();
        return request;
    };

    useEffect(() => {
        onSetForm();
    }, [onSetForm]);

    const actionClick = async (actionCode: AppealActionCodes, fields?: Record<string, any>) => {
        const savedData = await onSaveForm(ValidateActions.includes(actionCode));
        await postAction({ ...appeal, ...savedData, actionCode, ...fields, id }).unwrap();
        if (actionCode === 'DELETE_AT_DRAFT') navigate('/deliveryOrders/list');
        dispatch(AppealApi.util.invalidateTags([{ type: 'Appeal', id }]));
    };

    return (
        <Spin spinning={isFetching}>
            <ProHeader
                infos={[
                    { key: 'code', label: 'Код заявки', value: appeal?.code },
                    {
                        key: 'createdDate',
                        label: 'Дата создания',
                        value: dayjs(appeal?.createdDate).format('DD.MM.YYYY HH:mm'),
                    },
                ]}
                actionItems={appeal?.actions?.map((action) => ({
                    label: action.name,
                    onClick: (fields) => actionClick(action.code, fields),
                    key: action.code,
                    modalFields: action.modalFields,
                }))}
                onReload={() => {
                    dispatch(AppealApi.util.invalidateTags([{ type: 'Appeal', id }]));
                    appealPositonRef.current?.reloadAndRest?.();
                }}
            />
            <ProWorkflow workflows={appeal?.workflows} />
            <ProForm submitter={false} form={form}>
                <ProFormDatePicker label='Дата забора' name='operationDate' />
            </ProForm>
            <AppealPosition actionRef={appealPositonRef} appealId={id} appeal={appeal} />
        </Spin>
    );
};

export default AppealItem;
