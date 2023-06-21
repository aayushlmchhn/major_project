//const {json}= require('express');

const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

// const downloadPdf = require('./downloadPdf');
const jsonObject = require('../files/outputRevised.json')
const respObject = require('../files/data.json');
const { type } = require("os");
const { json } = require("body-parser");
const combineFiles = require("./combineFile");

const { promises: fsPromises } = require('fs');
const executeFunction = require('./executeFunction');

const { intoPDF,
    questionIntoPDF } = require('./downloadPdf')

//@description: get all IOE subject results
//@route GET /api/ioequestions
//@access public
const getIOEQuestions = asyncHandler(async (req, res) => {

    try {
        //update this part for new environment
        const inputFilepath = path.join(__dirname, '..', '/files/subjectInput.json')
        const pathToPython = path.join(__dirname, '..', '..', '..', './Major-main/Major-main/venv/Scripts/python')
        const pythonScript = path.join(__dirname, '..', '..', '..', './Major-main/Major-main/subjectwiseQuestionGeneration.py')

        const questionData = await executeFunction(inputFilepath, pathToPython, pythonScript);
        // res.json({ "output": questionData });
        res.json(questionData);
        ////change this as 
        // res.json( quizData );
    } catch (err) {
        console.error(err);
        res.status(500).send('Error executing function');
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///thapatechnical has the same solution for a given json stored in a database
    // res.status(200).json({ message: "get all the generated results" })
    // fs.readFile('./files/ioeSubjectsQuestions.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Error reading data file');
    //         // return;
    //     }
    //     try {
    //         const questionsData = JSON.parse(data);
    //         // res.json({ 'output': questionsData });
    //         res.json(questionsData);
    //         ////change this as 
    //         // res.json( quizData );
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Error parsing data file');
    //     }
    // });
    ///////////////////////////////////////////////////////////////////////////////////

});

//latest one that might also actually work
const getResult = asyncHandler(async (req, res) => {
    try {
        //update this part for new environment
        const inputFilepath = path.join(__dirname, '..', '/files/combinedInput.json')
        const pathToPython = path.join(__dirname, '..', '..', '..', './Major-main/Major-main/venv/Scripts/python')
        const pythonScript = path.join(__dirname, '..', '..', '..', './Major-main/Major-main/main.py')

        const quizData = await executeFunction(inputFilepath, pathToPython, pythonScript);
        res.json({ "output": quizData });
        // res.json(quizData);
        ////change this as 
        // res.json( quizData );
    } catch (err) {
        console.error(err);
        res.status(500).send('Error executing function');
    }
});



//@description: add to the results
//@route POST /api/result
//@access public
const generateResult = async (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'files/data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading settings file');
            // return;
        }

        const settings = JSON.parse(data);


        fs.readFile(path.join(__dirname, '..', 'files/1strevisedOutput.json'), 'utf8', (err, outputData) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading data file');
                return;
            }
            // console.log('data:', __dirname);

            // let quizData = JSON.parse(data).output;
            let quizData;
            try {
                quizData = JSON.parse(outputData).output.output.filter((question) => question.show === true);
            } catch (error) {
                console.log(error);
            }


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
            res.json(quizData);
            //call a function that generates a pdf file based on the json that is generated after all specification
            // downloadPdf(quizData);
            intoPDF(quizData);

        })
    })
};

const generateQuestions = async (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'files/revisedQuestionOutput.json'), 'utf8', (err, outputData) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data file');
            // return;
        }
        let quizData;
        try {
            //one doubtful line
            quizData = JSON.parse(outputData).questions.filter((question) => question.show === true);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error parsing output data');
            return;
        }

        // const totalMarks = quizData.reduce((total, question) => total + question.marks, 0);
        const totalMarks = quizData.reduce((total, question) => total + parseInt(question.marks), 0);


        res.json({
            quizData: quizData.map((question) => ({ question: question.question, marks: question.marks })),
            totalMarks,
        });



        //call a function that generates a pdf file based on the json that is generated after all specification
        // downloadPdf(quizData);

        questionIntoPDF(quizData, totalMarks);
        // questionIntoPDF(questions);
    }
    )
}


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

//@description: update results
//@route POST /api/result
//@access public
const updateResult = asyncHandler(async (req, res) => {
    const updatedData = req.body;
    //add to this part for 
    try {
        const jsonData = JSON.stringify(updatedData, null, 2);
        fs.writeFile('./files/1strevisedOutput.json', jsonData, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing data to file');
                return;
            }
            res.status(200).send('Data updated successfully');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error converting data to JSON');
    }
});


//@description: delete one result
//@route DELETE /api/result/:id
//@access public
const updateQuestions = asyncHandler(async (req, res) => {
    const updatedData = req.body;
    //add to this part for 
    // Calculate the new total marks
    // const totalMarks = updatedData.output.reduce((acc, q) => acc + q.marks, 0);
    const totalMarks = updatedData.questions.reduce((acc, q) => acc + q.marks, 0);
    updatedData.total = totalMarks;
    // console.log(updatedData);
    res.json(updatedData)
    try {
        ////////////////////////////////////////////////////////////////
        const jsonData = JSON.stringify(updatedData, null, 2);
        // console.log(jsonData);
        // console.log(updatedData);
        fs.writeFile('./files/revisedQuestionOutput.json', jsonData, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing data to file');
                // return;
            }
            res.status(200).send('Data updated successfully');
        });
        ///////////////////////////////////////////////////////////////
        // const jsonData = JSON.stringify(updatedData, null, 2);
        // await fsPromises.writeFile('./files/revisedQuestionOutput.json', jsonData);
        // res.status(200).send('Data updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error converting data to JSON');
    }

    // res.status(200).json({ message: 'working till now ' })
});

//@description: get all key phrases
//@route GET /api/customize
//@access public
const getPhrases = asyncHandler(async (req, res) => {
    // console.log(__dirname);
    res.sendFile(path.join(__dirname, '..', '/views/customizationPage.html'));
});

//@description: update key phrase
//@route PUT /api/customize/:id
//@access public
// const updatePhrases = asyncHandler(async (req, res) => {
//     const data = req.body;

//     // Write the data to a JSON file "C:/Users/Administrator/Documents/project/project_backend/files"
//     fs.writeFile('./files/data.json', JSON.stringify(data), (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error writing to JSON file');
//         } else {
//             const txtFilePath = path.join(__dirname, '..', '/files/convertedUploads/uploadedPlainText.txt');
//             const jsonFilePath = path.join(__dirname, '..', '/files/data.json');
//             const outputFilePath = path.join(__dirname, '..', '/files/combinedInput.json');
//             combineFiles(txtFilePath, jsonFilePath, outputFilePath)
//             res.status(200).send('Data successfully saved to JSON file');
//         }
//     });


//now combine the updated response with the uploaded text document:
//call combine function but asynchronous operations:


////////////////////////////////////////

// });

const updatePhrases = asyncHandler(async (req, res) => {
    const data = req.body;

    try {
        // Write the data to a JSON file "C:/Users/Administrator/Documents/project/project_backend/files"
        await fsPromises.writeFile('./files/data.json', JSON.stringify(data));
        const txtFilePath = path.join(__dirname, '..', '/files/convertedUploads/uploadedPlainText.txt');
        const jsonFilePath = path.join(__dirname, '..', '/files/data.json');
        const outputFilePath = path.join(__dirname, '..', '/files/combinedInput.json');
        await combineFiles(txtFilePath, jsonFilePath, outputFilePath)
        res.status(200).send('Data successfully saved to JSON file');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error writing to JSON file');
    }
});


//@description: delete key phrase
//@route DELETE /api/customize/:id
//@access public

// const deletePhrases = asyncHandler(async (req, res) => {
//     res.status(200).json({ message: `delete the key phrase for  ${req.params.id}` })
// });

;
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
//description: choose for the selection of subject
//route: POST /api/subjects
//access public
const ioeSubjects = asyncHandler(async (req, res) => {

    const { subject, chapter } = req.body;
    if (!subject || !chapter) {
        return res.status(400).send('Missing required fields');
    }
    const data = { subject, chapter }

    // Write the data to a JSON file "C:/Users/Administrator/Documents/project/project_backend/files"
    fs.writeFile('./files/subjectselection.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to JSON file');
        } else {
            res.status(200).send('Data successfully saved to JSON file');
        }
    });
});
//work that remains here is to select the sample txt from the directory and load it into the uploads directory
//or to run the questiongeneration.py from the folder project-main




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
    res.status(200).sendFile(path.join(__dirname, '..', '/views/index.html'));
    // res.status(200).sendFile('c:/Users/Administrator/Documents/project/project_backend/index.html')// change __dirname to make the path accessible
    // try {
    //     res.status(200).sendFile(path.join(__dirname + 'index.html'));
    // } catch (error) {
    //     res.send(error.message);

    // }
});

const textUpload = async (req, res) => {
    try {
        //console.log(req.body); // Debugging code
        const text = req.body;
        if (!text) {
            throw new Error('No text provided');
        }
        const directoryPath = path.join(__dirname, '..', 'files/convertedUploads'); // Replace with your directory path
        // const directoryPath = '../files/convertedUploads';
        // const directoryPath = 'c:/Users/Administrator/Documents/project/project_backend/files/convertedUploads';

        // Create the directory if it doesn't exist
        if (!fs.existsSync(directoryPath)) {
            // fs.mkdirSync(directoryPath, { recursive: true });
            res.send.json({ message: "error locating directory" });
        }

        // Generate a unique filename
        // const filename = `${Date.now()}.txt`;
        const filename = 'uploadedPlainText.txt';

        // Write the text to the file
        const filepath = path.join(directoryPath, filename);
        fs.writeFile(filepath, text, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving file');
            } else {
                res.send('File saved successfully');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('server error');

    }
};

//description: initial response that is sent from the frontend
//route: POST /api/response
//access public
const initialResponse = asyncHandler(async (req, res) => {
    const { response, subject } = req.body;
    if (!response) {
        return res.status(400).send('response is mandatory');
    }
    if (response === 'ioesubjects') {
        if (!subject) {
            return res.status(400).send('Subject selection is mandatory for response: ioesubjects');
        }
    }
    if (response === 'books') {
        if (subject) {
            return res.status(400).send('Subject selection is not required for response: books');
        }
    }
    const data = { response, subject }

    // Write the data to a JSON file "C:/Users/Administrator/Documents/project/project_backend/files"
    fs.writeFile('./files/response.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to JSON file');
        } else {
            res.status(200).send('Data successfully saved to JSON file');
        }
    });
})

const displayResponse = asyncHandler(async (req, res) => {
    const responseFilepath = path.join(__dirname, '..', 'files/response.json');
    const filepath = path.join(__dirname, '..', 'files/ioeSubjects.json');

    fs.readFile(responseFilepath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading response file');
            return;
        }

        const response = JSON.parse(data);

        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading subjects file');
                return;
            }

            const subjects = JSON.parse(data).subjects;

            const matchingSubject = subjects.find((subject) => subject.name === response.subject);

            if (!matchingSubject) {
                res.status(404).send('Subject not found');
                return;
            }

            const result = {
                name: matchingSubject.name,
                fullMarks: matchingSubject.fullMarks,
                marksDistribution: matchingSubject.marksDistribution,
                // marksDistributionAlternate: matchingSubject.marksDistributionAlternate
            };

            if (matchingSubject.marksDistributionAlternate.length) {
                result.marksDistributionAlternate = matchingSubject.marksDistributionAlternate
            };

            res.json(result);
        });
    });
});

const recordResponse = asyncHandler(async (req, res) => {
    const { name, fullMarks, marksDistribution } = req.body;
    // console.log(subject);//debugger code

    // Load the ioesubjects.json file
    const ioesubjectsPath = path.join(__dirname, '..', 'files', 'ioeSubjects.json');//this line is causing trouble??
    fs.readFile(ioesubjectsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading ioesubjects file');
            return;
        }

        const ioesubjects = JSON.parse(data);
        // Find the subject in ioesubjects
        const subjectData = ioesubjects.subjects.find((s) => s.name === name);//this function is creating some trouble here

        if (!subjectData) {
            res.status(404).send(`Subject "${subject}" not found`);
            return;
        }

        // Check if the marksDistribution exists in ioesubjects, otherwise validate the user-entered marks
        let validatedMarksDistribution = marksDistribution;
        if (!subjectData.marksDistribution.includes(marksDistribution)) {
            const totalMarks = marksDistribution.reduce((acc, m) => acc + m, 0);
            if (totalMarks === fullMarks) {
                validatedMarksDistribution = marksDistribution;
            } else {
                res.status(400).send('Invalid marks distribution');
                return;
            }
        }

        // Create a new result object
        const result = {
            name,
            fullMarks,
            marksDistribution: validatedMarksDistribution,
        };

        // Write the result object to a new file in the results directory
        // const resultFilename = `${subject}-${new Date().toISOString()}.json`;
        const resultFilename = 'subjectInput.json'
        const resultFilepath = path.join(__dirname, '..', 'files', resultFilename);
        fs.writeFile(resultFilepath, JSON.stringify(result), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving result file');
                return;
            }

            console.log(`Result saved to ${resultFilepath}`);
            res.status(200).send('Result saved successfully');
        });
    });

    // res.json({ message: "working... " });
});

const resultDownload = asyncHandler(async (req, res) => {
    const file = path.join(__dirname, '..', '/files/output.pdf');//change this

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

    const stream = fs.createReadStream(file);
    stream.pipe(res);

});

const questionsDownload = asyncHandler(async (req, res) => {
    const file = path.join(__dirname, '..', '/files/questionOutput.pdf');//change this

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

    const stream = fs.createReadStream(file);
    stream.pipe(res);

})

module.exports = {
    getResult,
    getIOEQuestions,
    generateQuestions,
    addResult,
    generateResult,
    getOneResult,
    updateResult,
    updateQuestions,
    // deleteResult,
    getPhrases,
    updatePhrases,
    //deletePhrases,
    addBook,
    addChapter,
    initialPage,
    ioeSubjects,
    textUpload,
    initialResponse,
    displayResponse,
    recordResponse,
    resultDownload,
    questionsDownload
    //uploadFiles// to be continued later
};


