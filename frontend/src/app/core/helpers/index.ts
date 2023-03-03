export const isNullOrUndefined = <T>(value: T):boolean => value === null || value === undefined || typeof value === 'undefined';
export const isNullOrWhitespace = (value: string):boolean => isNullOrUndefined(value) || value?.trim()?.length === 0;
export const isFullObject = <T>(value: Object):boolean => typeof value === 'object' && Object.keys(value).length > 0;
export const hasValue = <T>(value: T[]):boolean => !isNullOrUndefined(value) && value?.length > 0;
export const formatDate = (date: Date):string => new Date(date).toLocaleDateString('es-ES');

export * from '../helpers/index';