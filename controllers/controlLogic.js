
const asyncHandler = require("express-async-handler");
const fs = require("fs");
//@description: get all results
//@route GET /api/result
//@access public

const getResult = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "get all the generated results" })
});

//@description: add to the results
//@route POST /api/result
//@access public

const addResult = asyncHandler(async (req, res) => {

    res.status(201).json({ message: "add to the result" })
});

//@description: get one result
//@route GET /api/result/:id
//@access public

const getOneResult = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `get ${req.params.id} from the result ` })
});

//@description: update one result
//@route PUT /api/result/:id
//@access public
const updateResult = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update the result for  ${req.params.id}` })
});

//@description: delete one result
//@route DELETE /api/result/:id
//@access public
const deleteResult = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete the result for  ${req.params.id}` })
});

//@description: get all key phrases
//@route GET /api/customize
//@access public

const getPhrases = asyncHandler(async (req, res) => {
    // console.log(__dirname);
    res.sendFile(__dirname + '/customizationPage.html');
});

//@description: update key phrase
//@route PUT /api/customize/:id
//@access public

const updatePhrases = asyncHandler(async (req, res) => {
    const data = req.body;

    // Write the data to a JSON file "C:/Users/Administrator/Documents/project/project_backend/files"
    fs.writeFile('C:/Users/Administrator/Documents/project/project_backend/files' + '/data.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to JSON file');
        } else {
            res.status(200).send('Data successfully saved to JSON file');
        }
    });
});


//@description: delete key phrase
//@route DELETE /api/customize/:id
//@access public

// const deletePhrases = asyncHandler(async (req, res) => {
//     res.status(200).json({ message: `delete the key phrase for  ${req.params.id}` })
// });


//@description: add input to the database
//@route POST /api/reference/books
//@access public

const addBook = asyncHandler(async (req, res) => {
    console.log("the request body is:", req.body)
    const { inputFilename, path, size, created_at } = req.body
    if (!inputFilename) {
        res.status(400);
        throw new Error("input file is mandatory");
    }
    res.status(200).json({ message: "input is provided " })
});

//@description: add input to the database
//@route POST /api/reference/books
//@access public

const addChapter = asyncHandler(async (req, res) => {
    console.log("the request body is:", req.body)
    const { id, file, created_at } = req.body
    if (!id || !file || !created_at) {
        res.status(400);
        throw new Error("all fields are mandatory!");
    }
    res.status(200).json({ message: "add the chapter into the database" })
});


// update this part of the upload file 
// const uploadFiles = asyncHandler(async (req, res) => {
//     const files = req.files;
//     console.log(files);

//     Object.keys(files).forEach(key => {
//         const filepath = path.join("C:/Users/Administrator/Documents/project/project_backend/" + 'files', files[key].name)
//         files[key].mv(filepath, (err => {
//             if (err) return res.status(500).json({ status: "error", message: err })
//         }))
//     })

//     return res.json({ status: "success", message: Object.keys(files).toString() })
// });




module.exports = {
    getResult,
    addResult,
    getOneResult,
    updateResult,
    deleteResult,
    getPhrases,
    updatePhrases,
    //deletePhrases,
    addBook,
    addChapter,
    //uploadFiles// to be continued later
};