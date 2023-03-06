const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const fileUpload = require("express-fileupload");
const path = require("path");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const filesPayloadExists = require("./middleware/filePayloadExists");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");
// const fs = require("fs");


//connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", require("./routes/apiRoutes"));
app.use(errorHandler);



// app.use("/api/result", require("./routes/apiRoutes"));
// app.use("/api/result", require("./routes/apiRoutes"));
// app.use("/api/result", require("./routes/apiRoutes"));
// app.use("/api/result", require("./routes/apiRoutes"));
// app.use("/api/result", require("./routes/apiRoutes"));


// app.use("/api", require("./routes/apiRoutes"));
// app.use("/api/customize", require("./routes/apiRoutes"));
// app.use("/api/customize", require("./routes/apiRoutes"));



// app.use("/api/reference/", require("./routes/apiRoutes"));
// app.use("/api/reference/", require("./routes/apiRoutes"));
// // app.use("/api/reference/", require("./routes/apiRoutes"));


//localhost:5001/
app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.post("/upload",
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.pdf', '.odt', '.doc', '.docx', '.txt']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files;
        console.log(files);

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name)
            files[key].mv(filepath, (err => {
                if (err) return res.status(500).json({ status: "error", message: err })
            }))
        })

        return res.json({ status: "success", message: Object.keys(files).toString() })
    })

