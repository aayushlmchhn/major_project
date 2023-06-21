<<<<<<< HEAD
const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("database connection is established: ",
            connect.connection.host,
            connect.connection.name);

    } catch (err) {
        console.log(err);
        process.exit(1);

    }
}
=======
const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("database connection is established: ",
            connect.connection.host,
            connect.connection.name);

    } catch (err) {
        console.log(err);
        process.exit(1);

    }
}
>>>>>>> 71aa97ed79156131b0800154b274726e857d9567
module.exports = connectDb;