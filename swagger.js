const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contacts API",
        description: "API for managing contacts"
    },
    host: "localhost:8080",
    schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js", "./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);