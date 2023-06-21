const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


const { mongo } = mongoose;
// const util = require('util');


const convertFiles = require('./controllers/convertTotxt');
//////////////////////////////////////////////
const fileUpload = require("express-fileupload");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const filesPayloadExists = require("./middleware/filePayloadExists");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");



//connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
//app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

//cors mode shoould be disabled while working on dev mode
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin ,X-Requested_With, Content-type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
        return res.status(200).json({});
    }
    next();
});

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
// const convertFilesPromisified = util.promisify(convertFiles);

// 

//file(.txt, .pdf, .docx, .odt) uploads only


app.post("/upload",
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.pdf', '.odt', '.doc', '.docx', '.txt']),
    fileSizeLimiter,
    async (req, res) => {

        const files = req.files;
        Object.keys(files).forEach(key => {
            console.log(files[key].name);
        });

        try {
            // Move each file to the specified path
            await Promise.all(Object.keys(files).map(async key => {
                const filepath = path.join(__dirname, 'files/uploads', files[key].name);
                await files[key].mv(filepath);
            }));

            // Convert the files after they have been moved
            await convertFiles(
                path.join(__dirname, '/files/uploads'),
                path.join(__dirname, '/files/convertedUploads')
            );

            res.json({ status: "success", message: Object.keys(files).toString() });
        } catch (err) {
            res.status(500).json({ status: "error", message: err });
        }
    });


// const mammoth = require('mammoth'); // for converting docx to txt
// const pdfjs = require('pdfjs-dist/build/pdf.js'); // for converting pdf to txt

// app.post("/upload",
//     fileUpload({ createParentPath: true }),
//     filesPayloadExists,
//     fileExtLimiter(['.pdf', '.odt', '.doc', '.docx', '.txt']),
//     fileSizeLimiter,
//     async (req, res) => {
//         const files = req.files;
//         const destDir = path.join(__dirname, '/files/convertedUploads');

//         // loop through files
//         for (const file of Object.values(files)) {
//             const extname = path.extname(file.name).toLowerCase();
//             const basename = path.basename(file.name, extname);
//             const tempPath = file.tempFilePath;

//             // check if file is one of the supported formats
//             if (extname === '.pdf') {
//                 // convert pdf to txt
//                 const pdfData = new Uint8Array(fs.readFileSync(tempPath));
//                 const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
//                 const txt = await Promise.all(
//                     Array.from({ length: pdf.numPages }, (_, i) =>
//                         pdf.getPage(i + 1).then(page => page.getTextContent())
//                     )
//                 )
//                     .then(pages => pages.join('\n'));

//                 // write txt to destination directory
//                 fs.writeFileSync(path.join(destDir, `${basename}.txt`), txt);
//             } else if (extname === '.odt' || extname === '.docx' || extname === '.txt') {
//                 // convert odt, docx, or txt to txt
//                 let txt;
//                 if (extname === '.odt') {
//                     const result = await mammoth.convertToHtml({ path: tempPath });
//                     txt = result.value.replace(/<\/?[a-z][^>]*>/gi, '');
//                 } else if (extname === '.docx') {
//                     const result = await mammoth.extractRawText({ path: tempPath });
//                     txt = result.value.replace(/\r\n/g, '\n');
//                 } else {
//                     txt = fs.readFileSync(tempPath, 'utf-8');
//                 }

//                 // write txt to destination directory
//                 fs.writeFileSync(path.join(destDir, `${basename}.txt`), txt);
//             }

//             // move the uploaded file to upload directory
//             const uploadDir = path.join(__dirname, '/files/uploads');
//             const uploadFilePath = path.join(uploadDir, file.name);
//             await file.mv(uploadFilePath);
//         }

//         res.json({ status: "success", message: Object.keys(files).toString() })
//     }
// );
