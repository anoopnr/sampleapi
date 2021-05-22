/**
 * validation module for seperate validations for each route
 * gettokenValidate for the initial gettoken call
 * getProductsValidate for checking the request has a valid Authorization token
 */
const { check, validationResult } = require('express-validator');
const isBase64=require('is-base64')

const gettokenValidate = () => {
  return [
    check('username')
    .notEmpty()
    .withMessage('username is required'),
    check('password')
    .notEmpty()
    .withMessage('password is required')
    .bail()
    .isLength({ min: 8 })
    .withMessage('password must be atleast 8 characters')
    ]
}

const getProductsValidate=()=>{
    return [
        check('Authorization')
        .notEmpty()
        .withMessage('Authorization is required')
        .bail()
        .custom(auth => {
            if(auth.substring(0,7)=="Bearer ")
                return true;
            else
                return false;
        })
        .withMessage('Value must prepend \'Bearer \'')
        .bail()
        .custom(auth => {
            var token=auth.substring(7);
            if(isBase64(token))
                return true;
            else
                return false;
        })
        .withMessage('Token be a Base 64 encoded string')
        ]
}

const postProductsValidate=()=>{
  return [
      check('Authorization')
      .notEmpty()
      .withMessage('Authorization is required')
      .bail()
      .custom(auth => {
          if(auth.substring(0,7)=="Bearer ")
              return true;
          else
              return false;
      })
      .withMessage('Value must prepend \'Bearer \'')
      .bail()
      .custom(auth => {
          var token=auth.substring(7);
          if(isBase64(token))
              return true;
          else
              return false;
      })
      .withMessage('Token be a Base 64 encoded string'),
      check('id')
      .notEmpty()
      .withMessage('id is required'),
      check('name')
      .notEmpty()
      .withMessage('name is required'),
      check('category')
      .notEmpty()
      .withMessage('category is required'),
      ]
}

const validateResult = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
    gettokenValidate,
    validateResult,
    getProductsValidate,
    postProductsValidate
}