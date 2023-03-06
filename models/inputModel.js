const mongoose = require("mongoose");
// completely update this to store data in the format as required for our application
const inputSchema = mongoose.Schema({
    inputFilename: {
        type: String,
        required: [true, "input file is always required"],
    },
    file: {
        type: String,
        required: [true, "upload is mandatory"],
    },
    // path: {
    //     type: String,
    //     //required: [true, "file should have input"],
    // },
    size: {
        type: String,
        //required: [true, "dummy parameter"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}
);

module.exports = mongoose.model("input", inputSchema)