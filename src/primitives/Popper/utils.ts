export const getFirstIfArray = <T>(arg: T | T[]): T => (Array.isArray(arg) ? arg[0] : arg);
