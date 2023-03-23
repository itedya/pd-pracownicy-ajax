import HttpException from "./http-exception.js";

class ValidationHttpException extends HttpException {
    constructor(errors) {
        super("Validation exception", 422);
        this.data = errors;
    }

    render(req, res) {
        res.status(422).json({
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        });
    }
}

export default ValidationHttpException;