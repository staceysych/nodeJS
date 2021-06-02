export const errorHandler = (error: any, req, res, next) => {

    console.log(error);

    res.status(error.code || 500).send({
        error: {
            status: error.code || 500,
            message: error.msg || 'Internal Server Error',
        },
    });
}