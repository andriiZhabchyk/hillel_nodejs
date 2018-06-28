'use strict';

const { celebrate } = require('celebrate');

module.exports.validate = (schema) => {
    return celebrate(schema);
};