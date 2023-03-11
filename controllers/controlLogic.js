//const {json}= require('express');

const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const jsonObject = require('../files/outputRevised.json')
const respObject = require('../files/data.json');
const { type } = require("os");
const { json } = require("body-parser");

//@description: get all results
//@route GET /api/result
//@access public
const getResult = asyncHandler(async (req, res) => {
    ///thapatechnical has the same solution for a given json stored in a database
    // res.status(200).json({ message: "get all the generated results" })
    fs.readFile('./files/outputRevised.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data file');
            return;
        }

        try {
            const quizData = JSON.parse(data);
            res.json({ output: quizData });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error parsing data file');
        }
    });

});


//@description: add to the results
//@route POST /api/result
//@access public
const updatedResult = async (req, res) => {
    fs.readFile('./files/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading settings file');
            return;
        }

        const settings = JSON.parse(data);

        fs.readFile('./files/outputRevised.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading data file');
                return;
            }

            let quizData = JSON.parse(data).output;

            if (settings.question_type === 'objective') {
                quizData = quizData.filter((question) => question.questionType === 0);
            } else if (settings.question_type === 'subjective') {
                quizData = quizData.filter((question) => question.questionType === 1);
            }

            if (settings.allow_answer === false) {
                quizData.forEach((question) => {
                    if (question.questionType === 0) {
                        delete question.isCorrect;
                    } else {
                        delete question.answers;
                    }
                });
            }

            if (settings.no_of_questions) {
                quizData = quizData.slice(0, settings.no_of_questions);
            }


            //   if (settings.validate_question) {
            //     validate(quizData);
            //   }

            res.json({ output: quizData });
        })

    })
};

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
    fs.writeFile('./files/data.json', JSON.stringify(data), (err) => {
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


// update this part of the upload
// const uploadFiles = asyncHandler(async (req, res) => {
//     const files = req.files;
//     console.log(files);

//     Object.keys(files).forEach(key => {
//         const filepath = path.join("C:/Users/Administrator/Documents/project/project_backend/" + 'files/uploads', files[key].name)
//         files[key].mv(filepath, (err => {
//             if (err) return res.status(500).json({ status: "error", message: err })
//         }))
//     })

//     return res.json({ status: "success", message: Object.keys(files).toString() })
// });


const initialPage = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: `${__dirname}` })
    res.status(200).sendFile('index.html', { root: __dirname });
    // res.status(200).sendFile('c:/Users/Administrator/Documents/project/project_backend/index.html')// change __dirname to make the path accessible
    // try {
    //     res.status(200).sendFile(path.join(__dirname + 'index.html'));
    // } catch (error) {
    //     res.send(error.message);

    // }
});


module.exports = {
    getResult,
    addResult,
    updatedResult,
    getOneResult,
    updateResult,
    deleteResult,
    getPhrases,
    updatePhrases,
    //deletePhrases,
    addBook,
    addChapter,
    initialPage,
    //uploadFiles// to be continued later
};