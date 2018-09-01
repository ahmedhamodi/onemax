const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NominationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  tags: [
    {
      tag: {
        type: String
      }
    }
  ],
  approved: {
    type: Boolean,
    default: false
  },
  comments: [
    {
      comment: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("nomination", NominationSchema);
