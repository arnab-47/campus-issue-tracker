const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Plumbing",
        "Electrical",
        "Internet",
        "Food",
        "Other"
      ]
    },

    description: {
      type: String,
      required: true,
      minlength: 15
    },

    status: {
      type: String,
      enum: [
        "Open",
        "In Progress",
        "Resolved"
      ],
      default: "Open"
    },

    votes: {
      type: Number,
      default: 0
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Issue", issueSchema);