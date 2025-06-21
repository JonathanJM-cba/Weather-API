const { param } = require("express-validator");
const validatorResults = require("../utils/handleValidator");

const weatherValidator = [
  param("startDate")
    .isISO8601()
    .withMessage("La fecha de inicio debe ser en formato YYYY-MM-DD"),
  param("endDate")
    .isISO8601()
    .withMessage("La fecha de fin debe ser en formato YYYY-MM-DD"),
  (req, res, next) => {
    return validatorResults(req, res, next);
  },
];

module.exports = weatherValidator;
