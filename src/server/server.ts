import dotenv from "dotenv";
import { app } from "../app/app";
import { db } from "../utils/dataBaseUtil";

dotenv.config();
db;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`### Server Up and Running @ port #${PORT}# ###`);
});
