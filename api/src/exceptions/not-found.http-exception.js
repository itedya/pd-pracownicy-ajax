import HttpException from "./http-exception.js";

class NotFoundHttpException extends HttpException {
    constructor() {
        super("Not found", 404);
    }
}

export default NotFoundHttpException;
