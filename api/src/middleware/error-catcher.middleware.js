import HttpException from "../exceptions/http-exception.js";
import ValidationHttpException from "../exceptions/validation.http-exception.js";
import InternalServerErrorHttpException from "../exceptions/internal-server-error.http-exception.js";

const errorCatcherMiddleware = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (err) {
        if (err.constructor.name === "ValidationError") {
            err = new ValidationHttpException(err.errors);
        }

        if (!(err instanceof HttpException)) {
            err = new InternalServerErrorHttpException(err);
        }

        err.report(req, res); 
        err.render(req, res);
    }
};

export default errorCatcherMiddleware;
