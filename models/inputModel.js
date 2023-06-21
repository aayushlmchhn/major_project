<<<<<<< HEAD
const mongoose = require("mongoose");
// completely update this to store data in the format as required for our application
const inputSchema = mongoose.Schema({
    inputFilename: {
        type: String,
        required: [true, "input file should have a name"],
    },
    file: {
        type: string,
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

=======
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

>>>>>>> 71aa97ed79156131b0800154b274726e857d9567
module.exports = mongoose.model("input", inputSchema)