<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const {
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
    //uploadFiles,
    initialPage
} = require("../controllers/controlLogic");


////////////////////////////////////////////////

router.route("/result").get(getResult);// https://localhost:5001/api/result 

// add question here in the JSON format
router.route("/result").post(addResult);

router.route("/updatedresult").get(updatedResult);

// router.route("/result/:id").get(getOneResult);

// //limited use or scope within the program
// router.route("/result/:id").put(updateResult);

// router.route("/result/:id").delete(deleteResult);



/////////////////////////////////////////////////
router.route("/customize").get(getPhrases);

// //limited to no use within the program
router.route("/customize").post(updatePhrases);



//router.route("/customize/:id").delete(deletePhrases);

//////////////////////////////////////////////////////

router.route("/reference/book").post(addBook);

router.route("/reference/chapter").post(addChapter);

/////////////////////////////////////////////////////
///http://localhost:5001/api/upload
router.route("/upload").get(initialPage);

//router.route("/upload").post(uploadFiles);

// router.route("/upload".post(uploadFiles))


=======
const express = require("express");
const router = express.Router();
const {
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
    //uploadFiles
} = require("../controllers/controlLogic");


////////////////////////////////////////////////

router.route("/result").get(getResult);// https://localhost:5001/api/result 

// add question here in the JSON format
router.route("/result").post(addResult);

router.route("/result/:id").get(getOneResult);

//limited use or scope within the program
router.route("/result/:id").put(updateResult);

router.route("/result/:id").delete(deleteResult);



/////////////////////////////////////////////////
router.route("/customize").get(getPhrases);

//limited to no use within the program
router.route("/customize").post(updatePhrases);



//router.route("/customize/:id").delete(deletePhrases);

//////////////////////////////////////////////////////

router.route("/reference/book").post(addBook);

router.route("/reference/chapter").post(addChapter);

/////////////////////////////////////////////////////
// router.route("/").get((req, res) => {
//     res.sendFile(path.join("C:/Users/Administrator/Documents/project/project_backend/" + "index.html"))
// });

// router.route("/upload".post(uploadFiles))


>>>>>>> 71aa97ed79156131b0800154b274726e857d9567
module.exports = router; 