<<<<<<< HEAD
const path = require("path")

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files

        const fileExtensions = []
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
        })

        // Are the file extension allowed? 
        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

        if (!allowed) {
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

            return res.status(422).json({ status: "error", message });
        }

        next()
    }
}

=======
const path = require("path")

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files

        const fileExtensions = []
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
        })

        // Are the file extension allowed? 
        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

        if (!allowed) {
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

            return res.status(422).json({ status: "error", message });
        }

        next()
    }
}

>>>>>>> 71aa97ed79156131b0800154b274726e857d9567
module.exports = fileExtLimiter