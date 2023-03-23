import HttpException from "./http-exception.js";

class InternalServerErrorHttpException extends HttpException {
    constructor(err) {
        super("Internal server error", 500);

        if (err instanceof Error) {
            this.err = err;
        } else if (typeof err === "string") {
            this.err = new Error(err);
        } else {
            throw new Error(
                "Argument err must be a string or error class instance!"
            );
        }
    }

    report(req, res) {
        console.log(`Internal server error: ${this.err.message}`);
    }
}

export default InternalServerErrorHttpException;