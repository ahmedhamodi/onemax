const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNomination(data) {
  if (!data)
    return {
      errors: { nodatafound: "No data found" },
      isEmpty: false
    };

  const fields = ["comment"];

  const errors = {};

  // ensure required params
  fields.forEach(field => {
    let dataField = data[field];

    if (!dataField) {
      data[field] = "";
      dataField = data[field];
    }

    if (isEmpty(dataField) || Validator.isEmpty(dataField))
      errors[field] = `${field} field is required`;
  });

  const { comment } = data;

  // ensure length
  if (!Validator.isLength(comment, { min: 4, max: 100 }) && !errors.comment)
    errors.comment = "comment must be between 4 and 100 characters";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
