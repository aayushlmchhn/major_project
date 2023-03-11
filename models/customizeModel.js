const mongoose = require("mongoose");

const customizeScheme = mongoose.Schema({
    noOfQuestions: {
        type: Number,
    },
    allowAnswer: {
        type: Boolean,
        default: true
    },
    questionType: {
        type: String,
        required: [true, "type of question shoould be mentioned"],
        default: "mixed"

    },
    validateQuestion: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("customize", customizeSchema)