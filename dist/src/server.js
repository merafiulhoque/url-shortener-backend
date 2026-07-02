import app from "./app.js";
import { AppConfig } from "./AppConfig.js";
app.listen(AppConfig.PORT, () => {
    console.info(`SERVER: http://localhost:${AppConfig.PORT}`);
});
