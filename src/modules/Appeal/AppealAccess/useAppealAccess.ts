import { useParams } from 'react-router-dom';
import AccessControl from '../../../common/Access/AccessControl';
import { Roles } from '../../../redux/types';
import { useTokenData } from '../../Auth/AuthApi/AuthSlice';
import { AppealStatusCodes, useGetAppealByIdQuery } from '../AppealApi/AppealApi';

type AppealAccessItem = {
    status: AppealStatusCodes;
    role: Roles;
};

const accessKeys = ['CreateAppeal', 'WarehouseColumns', 'CatalogColumns'] as const;

type AccessKey = Extract<(typeof accessKeys)[number], string>;

const accessControl = new AccessControl<AccessKey, AppealAccessItem>('AppealAccess');

accessControl.setAccess('CreateAppeal', 'role', 'read', 'white', ['contact']);

accessControl.setAccess('WarehouseColumns', 'role', 'read', 'black', ['contact']);
accessControl.setAccess('WarehouseColumns', 'status', 'write', 'white', ['CONFIRMATION']);

accessControl.setAccess('CatalogColumns', 'role', 'write', 'white', ['contact']);
accessControl.setAccess('CatalogColumns', 'status', 'write', 'white', ['DRAFT']);

const useAppealAccess = <KeyList extends AccessKey[]>(...keys: KeyList) => {
    const { id = '' } = useParams();
    const { data } = useGetAppealByIdQuery(id, { skip: !id });
    const role = useTokenData('role');

    type AccessReturnType = Record<`read${KeyList[number]}` | `write${KeyList[number]}`, boolean>;

    return keys.reduce<AccessReturnType>((access, key) => {
        if (!role)
            return {
                ...access,
                [`read${key}`]: false,
                [`write${key}`]: false,
            };

        if (role === 'root')
            return {
                ...access,
                [`read${key}`]: true,
                [`write${key}`]: true,
            };

        const { write, read } = accessControl.hasAccess(key, {
            role,
            status: data?.statusCode,
        });

        return {
            ...access,
            [`read${key}`]: read,
            [`write${key}`]: write && read,
        };
    }, {} as AccessReturnType);
};

export default useAppealAccess;
