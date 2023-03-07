import { ModalField } from '../common/ProHeader/ProHeader';

export type Roles =
    // Суперпользователь
    | 'root'
    // Администратор
    | 'admin'
    /// Пользователь ЛК
    | 'contact'
    /// Руководитель сектора продаж | АКИМ
    | 'sales-head'
    /// Менеджер продаж
    | 'sales-manager'
    /// Менеджер склада
    | 'warehouse-manager';

export type ContactVM = {
    id: string;
    lastName?: string;
    firstName?: string;
    middleName?: string;
    positionName?: string;
    phoneNumber?: string;
    registered?: boolean;
    email?: string;
    isEmailConfirmed?: true;
};

export interface ShopVM extends BaseVM {
    id: string;
    contacts?: ContactVM[];
    email?: string;
    phoneNumber?: string;
    name?: string;
    address?: string;
}

export type BaseDirectory = {
    code?: string;
    nameRu?: string;
    nameKz?: string;
    nameEn?: string;
    description?: string;
    color?: string;
};

export type BaseVM = {
    createdBy?: UserVM;
    createdById?: string;
    created?: string;
    lastModifiedBy?: UserVM;
    lastModifiedById?: string;
    lastModified?: string;
    deletedBy?: UserVM;
    deletedById?: string;
    deleted?: string;
};

export type LogVM = {
    id?: number;
    authorEmail?: string;
    authorName?: string;
    description?: string;
    logCodeName?: string;
    logDate?: string;
    reason?: string;
    additionalInfo?: string;
    role?: Roles;
};

export type ActionVM<ActionCodes> = {
    code: ActionCodes;
    name: string;
    modalFields: ModalField[];
};

export type UserVM = {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber?: string;
    extCode?: string;
    role: Roles;
    email: string;
};
