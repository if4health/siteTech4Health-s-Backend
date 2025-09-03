const mongoose = require("mongoose");

const whiteListSchema = new mongoose.Schema({
  email: {
    type: String,
    default: undefined,
    required: true,
  },
});

module.exports = mongoose.model("whiteList", whiteListSchema);
