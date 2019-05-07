const express = require("express");
const configureMiddleware = require("./middleware.js");
const forms = require("../forms/forms-routes.js");
const users = require("../user/user-routes.js");
const departments = require("../departments/departments-routes.js");
const defaultRules = require("../form_rules/rules-default-routes.js");
const rules = require("../form_rules/rules-routes.js");
const fields = require("../form_fields/form-fields-routes");

const server = express();

configureMiddleware(server);

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Hello Earthling");
});

server.use("/api/users", users);
server.use("/api/forms", forms);
server.use("/api/fields", fields);
server.use("/api/departments", departments);
server.use("/api/rules", defaultRules, rules);

module.exports = server;
