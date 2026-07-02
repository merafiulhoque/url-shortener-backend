import app from "./app.ts";
import { AppConfig } from "./AppConfig.ts";

app.listen(AppConfig.PORT, () => {
  console.info(`SERVER: http://localhost:${AppConfig.PORT}`);
});