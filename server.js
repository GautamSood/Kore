const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");



dotenv.config({ path: "./config/config.env" });

//uncaughtException
process.on("uncaughtException", (err) => {
  console.log("error : " + err.message);
  console.log("shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
//connecting database 
connectDatabase();

// starting server
const server = app.listen(process.env.PORT, () => {
  console.log("server is running on " + process.env.PORT);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("error : " + err.message);
  console.log("shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
