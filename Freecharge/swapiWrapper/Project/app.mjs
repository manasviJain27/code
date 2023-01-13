import express from "express";
import SERVER_CONFIG from "./config/SERVER_CONFIG.mjs";
import router from "./api/routes.mjs";

let app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.bodyParser());
app.use("/", router);
// let PORT = SERVER_CONFIG.PORT;

const { PORT } = SERVER_CONFIG;
const startServer = async () => {
  await app.listen(PORT);
  console.log("Server started successfully and listening to port ", PORT);
};

startServer();

// export { app };
