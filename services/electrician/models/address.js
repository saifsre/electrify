var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema(
    {
        address1: String,
        address2: String,
        postalCode: String,
        city: String,
        country: String
    }
);

module.exports = mongoose.model("Address", AddressSchema);
