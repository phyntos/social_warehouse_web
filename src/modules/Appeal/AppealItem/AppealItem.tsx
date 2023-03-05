import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useContainerTitle } from '../../../common/Container/Container';
import ProHeader from '../../../common/ProHeader/ProHeader';
import { useGetAppealByIdQuery } from '../AppealApi/AppealApi';

const AppealItem = () => {
    useContainerTitle('Карточка заявки');
    const { id = '' } = useParams();
    const { data: appeal } = useGetAppealByIdQuery(id, { skip: !id });

    return (
        <div>
            <ProHeader
                infos={[
                    { key: 'code', label: 'Код сделки', value: appeal?.code },
                    {
                        key: 'createdDate',
                        label: 'Дата создания',
                        value: dayjs(appeal?.createdDate).format('DD.MM.YYYY HH:mm'),
                    },
                ]}
                actionItems={appeal?.actions?.map((action) => ({
                    label: action.name,
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onClick: () => {},
                    key: action.code,
                    modalFields: action.modalFields,
                }))}
            />
        </div>
    );
};

export default AppealItem;
