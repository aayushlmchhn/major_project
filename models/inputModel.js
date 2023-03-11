const mongoose = require("mongoose");
// completely update this to store data in the format as required for our application
const inputSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, "id is always required"],
    },
    file: {
        type: String,
        required: [true, "file should have input"],
    },
    created_at: {
        type: String,
        required: [true, "dummy parameter"]
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("input", inputSchema)