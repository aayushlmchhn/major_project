// const express = require("express");
// const connectDb = require("./config/dbConnection");
// const errorHandler = require("./middleware/errorHandler");
// const dotenv = require("dotenv").config();

// const fileUpload = require("express-fileupload");
// const path = require("path");
// const fileExtLimiter = require("./middleware/fileExtLimiter");
// const filesPayloadExists = require("./middleware/filePayloadExists");
// const fileSizeLimiter = require("./middleware/fileSizeLimiter");
// // const fs = require("fs");


// //connectDb();
// const app = express();

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//     console.log(`server running on port ${port}`);
// });

// //
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/api", require("./routes/apiRoutes"));
// app.use(errorHandler);



// // app.use("/api/result", require("./routes/apiRoutes"));
// // app.use("/api/result", require("./routes/apiRoutes"));
// // app.use("/api/result", require("./routes/apiRoutes"));
// // app.use("/api/result", require("./routes/apiRoutes"));
// // app.use("/api/result", require("./routes/apiRoutes"));


// // app.use("/api", require("./routes/apiRoutes"));
// // app.use("/api/customize", require("./routes/apiRoutes"));
// // app.use("/api/customize", require("./routes/apiRoutes"));



// // app.use("/api/reference/", require("./routes/apiRoutes"));
// // app.use("/api/reference/", require("./routes/apiRoutes"));
// // // app.use("/api/reference/", require("./routes/apiRoutes"));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"))
// });

// app.post("/upload",
//     fileUpload({ createParentPath: true }),
//     filesPayloadExists,
//     fileExtLimiter(['.pdf', '.odt', '.doc', '.docx', '.txt']),
//     fileSizeLimiter,
//     (req, res) => {
//         const files = req.files;
//         console.log(files);

//         Object.keys(files).forEach(key => {
//             const filepath = path.join(__dirname, 'files', files[key].name)
//             files[key].mv(filepath, (err => {
//                 if (err) return res.status(500).json({ status: "error", message: err })
//             }))
//         })

//         return res.json({ status: "success", message: Object.keys(files).toString() })
//     })

const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const pdfreader = require('pdfreader');
const mongoose = require('mongoose');

// Set up MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@databasecluster.9ukhkfh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

// Define schema for storing text data
const textSchema = new mongoose.Schema({
    filename: String,
    text: String
});

const Text = mongoose.model('Text', textSchema);

// Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route for file upload
app.post('/upload', upload.single('pdf'), (req, res) => {
    const filePath = `./uploads/${req.file.filename}`;
    const fileName = req.file.originalname.split('.').slice(0, -1).join('.');
    let text = '';

    // Read PDF file and convert to text
    new pdfreader.PdfReader().parseFileItems(filePath, function (err, item) {
        if (err) {
            res.status(500).send(err);
        } else if (!item) {
            // Save text data to MongoDB
            Text.create({ filename: fileName, text: text }, function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send('File uploaded successfully!');
                }
            });
        } else if (item.text) {
            text += item.text;
        }
    });

    // Delete uploaded PDF file
    fs.unlinkSync(filePath);
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
