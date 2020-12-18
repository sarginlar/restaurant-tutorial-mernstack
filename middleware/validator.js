const { check, validationResult } = require("express-validator");

exports.signupValidator = [
  check("username").not().isEmpty().trim().withMessage("All fields required"),
  check("email").isEmail().normalizeEmail().withMessage("Invailid email"),
  check("password").isLength({ min: 6 }).withMessage("password must be at least 6 charecters long"),
];

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    const firstErrors = result.array()[0].msg;
    return res.status(400).json({
      errorMessage: firstError,
    });
    console.log("hasErrors:", hasErrors);
    console.log("result", result);
  }
  next();
};
