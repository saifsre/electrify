var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema(
    {
        address1: String,
        address2: String,
        zip: String,
        city: String,
        state: String
    }
);

module.exports = mongoose.model("Address", AddressSchema);
