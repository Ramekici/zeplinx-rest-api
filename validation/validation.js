const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateProductsInput = (data) => {

    let errors = {};
    data.ProductName = !isEmpty(data.ProductName) ? data.ProductName : '';
    data.ProductDescription = !isEmpty(data.ProductDescription) ? data.ProductDescription : '';

    console.log(data);
    if (Validator.isEmpty(data.ProductName)) {
        errors.name = 'Urun alanı boş bırakılmamalıdır'
    }
    if (Validator.isEmpty(data.ProductDescription)) {
        errors.description = 'Açıklama alanı alanı boş bırakılmamalıdır'
    }

    if (!Validator.isLength(data.ProductDescription, { min: 10, max: 1000 })) {
        errors.description = 'Açıklama alanı 10 ile 1000 karakter arası sınırlandırılmıştır.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
