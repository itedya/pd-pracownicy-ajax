import NotFoundHttpException from "../exceptions/not-found.http-exception.js";
import errorCatcherMiddleware from "../middleware/error-catcher.middleware.js";

const notFound = errorCatcherMiddleware(async () => {
    throw new NotFoundHttpException();
});

const errorController = { notFound };

export default errorController;
