/* eslint-disable newline-per-chained-call */
/* eslint-disable import/no-extraneous-dependencies */
const { check } = require("express-validator");

const postValidationsRules = [
  check("title").trim().not().isEmpty().withMessage("Title must not be empty!"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email must not be empty!")
    .isEmail()
    .withMessage("Invalid email!")
    .normalizeEmail()
    .withMessage("Invalid email!"),
  check("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("Must be at least 6 chars and maximum 16 chars long"),
  check("content")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Content must not be empty!"),
];

module.exports = postValidationsRules;
