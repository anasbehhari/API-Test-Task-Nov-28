const mongoose = require("mongoose");
const SectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Sector = mongoose.model("sector", SectorSchema);

module.exports = Sector;