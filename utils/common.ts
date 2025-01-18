

export const replaceSpaces = (value: string): string => value.replace(/\s/g, '-');

export const restoreSpaces = (value: string): string => value.trim().replace(/-/g, ' ');