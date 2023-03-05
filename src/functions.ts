import { Rule } from 'antd/es/form';
import { ProTabulatorRequest } from 'pro-tabulator/dist/types';

export type CurrencyCodes = 'KZT' | 'RUB' | 'USD';

export type PaginationParams<T> = T & {
    page: number;
    size: number;
};

export type PaginationResponse<T> = {
    currentPage: number;
    records: number;
    data: T[];
};
export const getTableRequest = <T extends Record<string, any>, P extends Record<string, any>>(
    getLazyQuery: (params: PaginationParams<P>) => Promise<PaginationResponse<T>>,
): ProTabulatorRequest<T, P> => {
    return async ({ current, pageSize, ...params }) => {
        const data = await getLazyQuery({
            page: current || 1,
            size: pageSize || 10,
            ...params,
        } as PaginationParams<P>);

        return {
            data: data.data,
            total: data.records,
        };
    };
};

export const numberFormatter = (
    price: number | undefined,
    value: CurrencyCodes | 'kilogram' | undefined,
    type: 'unit' | 'currency',
) => {
    return (price || 0).toLocaleString(
        'ru-RU',
        value
            ? {
                  style: type,
                  [type]: value,
                  currencyDisplay: 'code',
              }
            : undefined,
    );
};

export const getFullName = (...names: (string | undefined)[]) => {
    return names.filter(Boolean).join(' ');
};

export const deepComparison = <T>(first: T, second: T) => {
    /* Checking if the types and values of the two arguments are the same. */
    if (first === second) return true;

    /* Checking if any arguments are null */
    if (first === null || second === null) return false;

    /* Checking if any argument is none object */
    if (typeof first !== 'object' || typeof second !== 'object') return false;

    /* Using Object.getOwnPropertyNames() method to return the list of the objects’ properties */
    const first_keys = Object.getOwnPropertyNames(first) as (keyof T)[];

    const second_keys = Object.getOwnPropertyNames(second) as (keyof T)[];

    /* Checking if the objects' length are same*/
    if (first_keys.length !== second_keys.length) return false;

    /* Iterating through all the properties of the first object with the for of method*/
    for (const key of first_keys) {
        /* Making sure that every property in the first object also exists in second object. */
        if (!Object.hasOwn(second, key)) return false;

        /* Using the deepComparison function recursively (calling itself) and passing the values of each property into it to check if they are equal. */
        if (deepComparison(first[key], second[key]) === false) return false;
    }

    /* if no case matches, returning true */
    return true;
};

export const getRequiredRule = (text: string, action: 'введите' | 'выберите' = 'введите'): Rule => ({
    required: true,
    message: `Пожалуйста, ${action} ${text}`,
});

export const getNotZeroRule =
    (text: string): Rule =>
    () => ({
        validator: async (_, value) => {
            if (String(value) === '0') throw new Error(text + ' должно быть больше 0');
        },
    });

export const numberNormalize =
    ({
        isInteger,
        isPositive,
        min,
        max,
    }: {
        isInteger?: boolean;
        isPositive?: boolean;
        min?: number;
        max?: number;
    }): ((value: string, prevValue: string) => any) =>
    (value: string, prevValue) => {
        if (typeof value === 'undefined') return undefined;
        if (!isInteger) value = value.replace(',', '.');
        else {
            value = value.replace(',', '');
            value = value.replace('.', '');
        }
        if (isPositive) {
            value = value.replace('-', '');
        }

        let number = Number(value);
        if (Number.isNaN(number)) number = Number(prevValue);
        if (Number.isNaN(number)) number = 0;

        const isMin = typeof min !== 'undefined' && number > min;
        const isMax = typeof max !== 'undefined' && number > max;

        if (isMin) number = min;
        if (isMax) number = max;
        if (isMax && isMin) number = 0;

        let numberValue = String(number);

        if (!isInteger && value[value.length - 1] === '.' && !numberValue.includes('.')) {
            numberValue += '.';
        }
        if (!isPositive) {
            if (value === '0-') {
                numberValue = '-';
            }
            if (value === '-') {
                numberValue = '0';
            }
        }
        return numberValue;
    };
