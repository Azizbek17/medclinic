export const checkEmptyField = (value) => {
    return value && value.replace(/^\s+|\s+$/g, '') !== ''
};