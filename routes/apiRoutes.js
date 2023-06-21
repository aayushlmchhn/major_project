const express = require("express");
const router = express.Router();
const {
    getResult,
    addResult,
    generateResult,
    getIOEQuestions,
    generateQuestions,
    getOneResult,
    updateResult,
    updateQuestions,
    deleteResult,
    getPhrases,
    updatePhrases,
    //deletePhrases,
    addBook,
    addChapter,
    //uploadFiles,
    initialPage,
    ioeSubjects,
    textUpload,
    initialResponse,
    displayResponse,
    recordResponse,
    resultDownload,
    questionsDownload
} = require("../controllers/controlLogic");



/////////////////////////////////////////////////////
///http://localhost:5001/api/upload
router.route("/upload").get(initialPage);
router.route("/initialresponse").post(initialResponse);
router.route("/response").get(displayResponse);//localhost:5001/api/response
router.route("/response").post(recordResponse);//localhost:5001/api/response
router.route("/subjects").post(ioeSubjects);//this needs to be removed
router.route("/textupload").post(textUpload); //localhost:5001/api/textupload

/////////////////////////////////////////////////
router.route("/customize").get(getPhrases);//no use as api endpoint
// //limited to no use within the program
router.route("/customize").post(updatePhrases);



//router.route("/customize/:id").delete(deletePhrases);

//////////////////////////////////////////////////////

router.route("/reference/book").post(addBook);//kam chaina now

router.route("/reference/chapter").post(addChapter);//kam chaina now

////////////////////////////////////////////////

router.route("/result").get(getResult);// http://localhost:5001/api/result 

router.route('/updateresult').post(updateResult);//http://localhost:5001/api/updateresult

router.route("/generateresult").get(generateResult);//http://localhost:5001/api/generateresult

// router.route("/result/:id").get(getOneResult);
router.route("/ioequestions").get(getIOEQuestions);//http://localhost:5001/api/ioequestions
router.route("/ioequestions").post(updateQuestions);//http://localhost:5001/api/ioequestions
// add question here in the JSON format
router.route("/result").post(addResult);
router.route("/generateioequestions").get(generateQuestions);
router.route("/resultdownload").get(resultDownload)//http://localhost:5001/api/resultdownload
router.route("/ioequestionsdownload").get(questionsDownload)//http://localhost:5001/api/ioequestionsdownload
// //limited use or scope within the program
// router.route("/result/:id").put(updateResult);

// router.route("/result/:id").delete(deleteResult);


//router.route("/upload").post(uploadFiles);

// router.route("/upload".post(uploadFiles))




module.exports = router; 