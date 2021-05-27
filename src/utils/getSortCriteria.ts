export const getSortCriteria = (req) => {
    const sortObj = req.query.sortBy as string;
    const sortCriteria = sortObj.split(':');
    const field = sortCriteria[0];
    const direction = sortCriteria[1] === 'asc' ? 1 : -1;

    return { field, direction}
}