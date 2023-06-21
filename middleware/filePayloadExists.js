<<<<<<< HEAD
const filesPayloadExists = (req, res, next) => {
    if (!req.files) return res.status(400).json({ status: "error", message: "Missing files" })

    next()
}

=======
const filesPayloadExists = (req, res, next) => {
    if (!req.files) return res.status(400).json({ status: "error", message: "Missing files" })

    next()
}

>>>>>>> 71aa97ed79156131b0800154b274726e857d9567
module.exports = filesPayloadExists