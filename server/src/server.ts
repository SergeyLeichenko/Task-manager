import { app } from "./app";
import { env } from "./config/env";
import { pool } from "./database/pool";

pool
  .query("SELECT 1")
  .then(() =>
    app.listen(env.PORT, () => console.log(`API listening on ${env.PORT}`)),
  )
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
