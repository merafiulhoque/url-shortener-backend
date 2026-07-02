export const errorHandler = (err, req, res, next) => {
    // if(err instanceof AppError){
    //     return res.status(err.statusCode).json({
    //         success: false,
    //         message: err.message + err.stack + err.cause 
    //     })
    // }
    // if(err instanceof Error){
    //     return res.json({
    //         success: false,
    //         message: err.message + err.stack + err.cause
    //     })
    // }
    console.error(err);
    return res.json({
        success: false,
        message: err.message + err.stack + err.code
    });
};
export class AppError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
