import 'dotenv/config';
import createApp from "./app.js";

createApp().then((res) => {
    res.listen(3000, () => {
        console.log("Listening on port 3000.");
    });
});
