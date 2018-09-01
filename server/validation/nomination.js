const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNomination(data) {
  if (!data)
    return {
      errors: { nodatafound: "No data found" },
      isEmpty: false
    };

  const fields = ["name", "description", "picture", "country", "province"];

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

  const { name, description, picture, country, province } = data;

  // ensure length
  if (!Validator.isLength(name, { min: 2, max: 45 }) && !errors.name)
    errors.name = "name must be between 2 and 45 characters";
  if (
    !Validator.isLength(description, { min: 10, max: 400 }) &&
    !errors.description
  )
    errors.description = "description must be between 10 and 400 characters";

  // ensure url
  if (!Validator.isURL(picture) && !errors.picture)
    errors.picture = "picture must be valid url";

  // TODO: Add country and province verification

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
