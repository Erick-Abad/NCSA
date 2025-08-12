import express from "express";
import serverless from "serverless-http";
import routes from "../src/routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// API
app.use("/api", routes);

// (solo útil en local: servir /public)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(path.join(__dirname, "..", "public")));

export default serverless(app);

// Local (opcional para pruebas)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Dev server http://localhost:" + port));
}
