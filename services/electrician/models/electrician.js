var mongoose = require('mongoose');

var ElectricianSchema = new mongoose.Schema(
    {
        name: String,
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }
    }
);

module.exports = mongoose.model("Electrician", ElectricianSchema);
