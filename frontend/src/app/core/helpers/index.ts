export const isNullOrUndefined = <T>(value: T):boolean => value === null || value === undefined || typeof value === 'undefined';
export const isNullOrWhitespace = (value: string):boolean => isNullOrUndefined(value) || value?.trim()?.length === 0;
export const hasValue = <T>(value: T[]):boolean => !isNullOrUndefined(value) && value?.length > 0;

export * from '../helpers/index';