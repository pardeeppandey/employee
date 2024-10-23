const mongoose = require('mongoose');

const OfficeSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Office', OfficeSchema);