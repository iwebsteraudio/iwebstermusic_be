const path = require("path");
const envPath = path.resolve(__dirname, `./.env.${process.env.NODE_ENV || "development"}`);
console.log("Loading environment variables from:", envPath);
require("dotenv").config({ path: envPath });

console.log("PGDATABASE:", process.env.PGDATABASE);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
