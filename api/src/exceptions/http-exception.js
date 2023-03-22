class HttpException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }

    render(req, res) {
        res.status(this.statusCode).json({
            statusCode: this.statusCode,
            message: this.message,
        });
    }

    report(req, res) {
        console.log(`HttpException: ${this.message}`);
    }
}

export default HttpException;
