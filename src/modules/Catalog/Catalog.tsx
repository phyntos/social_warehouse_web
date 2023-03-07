import { EditableProTabulator } from 'pro-tabulator';
import React from 'react';
import { PRIMARY_COLOR } from '../../bootstrap';
import { getTableRequest } from '../../functions';
import {
    CatalogListParams,
    CatalogListVM,
    useGetDirectoriesQuery,
    useLazyGetCatalogsQuery,
} from './CatalogApi/CatalogApi';

const Catalog = () => {
    const [getCatalogs] = useLazyGetCatalogsQuery();
    const { data: directories } = useGetDirectoriesQuery();

    return (
        <EditableProTabulator<CatalogListVM, CatalogListParams>
            id='CatalogList'
            request={getTableRequest((params) => getCatalogs(params).unwrap())}
            columns={[
                {
                    dataIndex: 'name',
                    title: 'Наименование товара',
                    valueType: 'text',
                    // width: 300,
                    useForUpload: true,
                },
                {
                    dataIndex: 'tnpCode',
                    title: 'Тип товара',
                    valueType: 'select',
                    width: '30%',
                    useForUpload: true,
                    fieldProps: (form, schema) => ({
                        showSearch: schema.isEditable,
                        mode: schema.isEditable ? undefined : 'multiple',
                        options: directories?.statuses,
                    }),
                },
            ]}
            rowKey='id'
            // scroll={{ x: 1900 }}
            ordered
            downloadProps={{
                fileName: 'Каталог',
            }}
            // uploadProps={
            //     writeDeliveryOrder
            //         ? {
            //               ordered: true,
            //               onUpload: async (deliveryOrderCargos) => {
            //                   await onSaveForm();
            //                   await createMultiple({ deliveryOrderId, deliveryOrderCargos });
            //               },
            //           }
            //         : undefined
            // }
            disableHeightScroll
            colorPrimary={PRIMARY_COLOR}
            editableProps={{
                onCreate: async () => {
                    // return await createCargo(deliveryOrderId).unwrap();
                    return '123';
                },
                onDelete: async (id) => {
                    console.log(id);

                    // await deleteCargo({ deliveryOrderId, id }).unwrap();
                },
                onSave: async (data) => {
                    console.log(data);
                    // await saveCargo(data).unwrap();
                },
                onDeleteMultiple: async (idList) => {
                    console.log(idList);
                    // await deleteMultiple({ deliveryOrderId, idList }).unwrap();
                },
                onSaveMultiple: async (deliveryOrderCargos) => {
                    console.log(deliveryOrderCargos);
                    // await saveMultiple({ deliveryOrderId, deliveryOrderCargos }).unwrap();
                },
                hidden: {
                    actions: {
                        delete: true,
                    },
                    deleteMultiple: true,
                },
                // hidden: {
                //     actions: !writeDeliveryOrder || undefined,
                //     create: !writeDeliveryOrder,
                //     deleteMultiple: !writeDeliveryOrder,
                //     saveMultiple: !writeDeliveryOrder,
                // },
            }}
        />
    );
};

export default Catalog;
