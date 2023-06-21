<<<<<<< HEAD
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const fs = require("fs");
const path = require("path");
const { mongo } = mongoose;


const convertFiles = require('./controllers/convertTotxt');
//////////////////////////////////////////////
const fileUpload = require("express-fileupload");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const filesPayloadExists = require("./middleware/filePayloadExists");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");



connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
//app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", require("./routes/apiRoutes"));
app.use(errorHandler);

// //initialize gridfs
// const conn = mongoose.connection;
// let gfs;

// conn.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

// // Function to upload all files in a directory to GridFS
// const uploadAllFilesInDirectory = (dirPath) => {
//     fs.readdir(dirPath, (err, files) => {
//         if (err) {
//             console.error(err);
//             return;
//         }

//         files.forEach((file) => {
//             const filePath = path.join(dirPath, file);
//             const readStream = fs.createReadStream(filePath);
//             const writeStream = gfs.createWriteStream({
//                 filename: file,
//                 mode: 'w',
//                 content_type: 'application/octet-stream'
//             });
//             readStream.pipe(writeStream);
//             writeStream.on('close', (file) => {
//                 console.log('File uploaded successfully:', file);
//             });
//         });
//     });
// };



//localhost:5001/
// app.get("/upload", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"))
// });

app.post("/upload",
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.pdf', '.odt', '.doc', '.docx', '.txt']),
    fileSizeLimiter,
    (req, res) => {
        //the file is obtained through req and saved in the files as in the code below
        const files = req.files;
        //to:do: save the file received from the req to the database
        console.log(files.name);

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files/uploads', files[key].name)
            files[key].mv(filepath, (err => {
                if (err) return res.status(500).json({ status: "error", message: err })
            }))
        })
        // Upload all files from the directory
        // uploadAllFilesInDirectory(path.join(__dirname + '/files/uploads'));
        convertFiles(
            path.join(__dirname, '/files/uploads'),
            path.join(__dirname, '/files/convertedUploads')
        );

        return res.json({ status: "success", message: Object.keys(files).toString() })
    });














=======
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const fs = require("fs");
const path = require("path");
const { mongo } = mongoose;


const convertFiles = require('./controllers/convertTotxt');
//////////////////////////////////////////////
const fileUpload = require("express-fileupload");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const filesPayloadExists = require("./middleware/filePayloadExists");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");



connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
//app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", require("./routes/apiRoutes"));
app.use(errorHandler);

// //initialize gridfs
// const conn = mongoose.connection;
// let gfs;

// conn.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

// // Function to upload all files in a directory to GridFS
// const uploadAllFilesInDirectory = (dirPath) => {
//     fs.readdir(dirPath, (err, files) => {
//         if (err) {
//             console.error(err);
//             return;
//         }

//         files.forEach((file) => {
//             const filePath = path.join(dirPath, file);
//             const readStream = fs.createReadStream(filePath);
//             const writeStream = gfs.createWriteStream({
//                 filename: file,
//                 mode: 'w',
//                 content_type: 'application/octet-stream'
//             });
//             readStream.pipe(writeStream);
//             writeStream.on('close', (file) => {
//                 console.log('File uploaded successfully:', file);
//             });
//         });
//     });
// };



//localhost:5001/
// app.get("/upload", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"))
// });

app.post("/upload",
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.pdf', '.odt', '.doc', '.docx', '.txt']),
    fileSizeLimiter,
    (req, res) => {
        //the file is obtained through req and saved in the files as in the code below
        const files = req.files;
        //to:do: save the file received from the req to the database
        console.log(files.name);

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files/uploads', files[key].name)
            files[key].mv(filepath, (err => {
                if (err) return res.status(500).json({ status: "error", message: err })
            }))
        })
        // Upload all files from the directory
        // uploadAllFilesInDirectory(path.join(__dirname + '/files/uploads'));
        convertFiles(
            path.join(__dirname, '/files/uploads'),
            path.join(__dirname, '/files/convertedUploads')
        );

        return res.json({ status: "success", message: Object.keys(files).toString() })
    });














>>>>>>> 71aa97ed79156131b0800154b274726e857d9567
