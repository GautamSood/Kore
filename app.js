const express = require("express");
const app = express();
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(morgan("dev"));
app.use(express.json());

//Imported Routes
const order = require("./routes/order_routes.routes");
const ErrorMiddleware = require("./middleware/error");

app.use("/api", order);
const swaggerDefinition = {
  info: {
    title: "Kore.ai API Documentation(2022)",
    version: "1.0.0",
    description: "Endpoints to test the all routes",
  },
  host: "localhost:8000",
  basePath: "/api",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "api_key",
      scheme: "bearer",
      in: "header",
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
    apis: ["./controller/*.js"]
  
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//error handled
app.use(ErrorMiddleware);

module.exports = app;
