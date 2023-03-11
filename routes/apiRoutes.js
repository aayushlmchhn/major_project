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
    deletePhrases,
    addBook,
    addChapter
} = require("../controllers/controlLogic");


////////////////////////////////////////////////

router.route("/result").get(getResult);

// add question here in the JSON format
router.route("/result").post(addResult);

router.route("/result/:id").get(getOneResult);

//limited use or scope within the program
router.route("/result/:id").put(updateResult);

router.route("/result/:id").delete(deleteResult);



/////////////////////////////////////////////////
router.route("/customize").get(getPhrases);

//limited to no use within the program
router.route("/customize/:id").put(updatePhrases);

router.route("/customize/:id").delete(deletePhrases);

//////////////////////////////////////////////////////

router.route("/reference/book").post(addBook);

router.route("/reference/chapter").post(addChapter);

/////////////////////////////////////////////////////


module.exports = router; 