<<<<<<< HEAD
const { json } = require("express");
const jsonObject = require("./output.json");
const respObject = require("./data.json");

let count;
if (respObject.no_of_question > jsonObject.output.length) { count = jsonObject.output.length; }
else { count = respObject.no_of_question; }

let showAnswer = false;
if (respObject.allow_answer == true) { showAnswer = true; }

let objectiveOnly, subjectiveOnly;
if (respObject.question_type == "mcq") { objectiveOnly = true }
if (respObject.question_type == "sentence") { subjectiveOnly = true }
if (respObject.question_type == "mixed") {
    objectiveOnly = false;
    subjectiveOnly = false;
}

// let objCount = 0;
// let subjCount = 0;

if (showAnswer == true) {
    for (let i = 0; i < count; i++) {
        let selected = jsonObject.output[i];
        let typeofQuestion = selected.questionType;
        let objectiveCount = 1;
        let subjectiveCount = 1;

        if (objectiveOnly == true) {

            if (typeofQuestion == 0) {
                console.log(`${objectiveCount})`, selected.question);
                objectiveCount++;
                for (let j = 0; j < selected.answers.length; j++) {
                    console.log(`\t${j + 1})`, selected.answers[j])
                }
                console.log(selected.isCorrect)
            }
        }
        if (subjectiveOnly == true) {

            if (typeofQuestion == 1) {
                console.log(`${subjectiveCount})`, selected.question);
                subjectiveCount++;
                for (let j = 0; j < selected.answers.length; j++) {
                    console.log("\t", selected.answers[j])
                }
            }
        }

        if (!subjectiveOnly && !objectiveOnly) {

            console.log(`${i + 1})`, selected.question);

            for (let j = 0; j < selected.answers.length; j++) {
                console.log("\t", selected.answers[j])
            }
            if (typeofQuestion == 0) {
                console.log("correct answer:", selected.isCorrect)
            }

        }

    }
}
else {
    for (let i = 0; i < count; i++) {
        let selected = jsonObject.output[i];
        let typeofQuestion = selected.questionType;
        let objectiveCount = 1;
        let subjectiveCount = 1;

        if (objectiveOnly == true) {

            if (typeofQuestion == 0) {
                console.log(`${objectiveCount})`, selected.question);
                objectiveCount++;
                for (let j = 0; j < selected.answers.length; j++) {
                    console.log(`\t${j + 1})`, selected.answers[j])
                }
                //console.log(selected.isCorrect)
            }
        }
        if (subjectiveOnly == true) {

            if (typeofQuestion == 1) {
                console.log(`${subjectiveCount})`, selected.question);
                subjectiveCount++;
                // for (let j = 0; j < selected.answers.length; j++) {
                //     console.log("\t", selected.answers[j])
                // }
            }
        }

        if (!subjectiveOnly && !objectiveOnly) {

            console.log(`${i + 1})`, selected.question);

            if (typeofQuestion == 0) {
                for (let j = 0; j < selected.answers.length; j++) {
                    console.log("\t", selected.answers[j]);
                }
            }

            // if (typeofQuestion == 0) {
            //     console.log("correct answer:", selected.isCorrect)
            // }

        }

    }

}



=======
const { json } = require("express");
const jsonObject = require("./output.json");
const respObject = require("./data.json");

let count;
if (respObject.no_of_question > jsonObject.output.length) { count = jsonObject.output.length; }
else { count = respObject.no_of_question; }

let showAnswer = false;
if (respObject.allow_answer == true) { showAnswer = true; }

let objectiveOnly, subjectiveOnly;
if (respObject.question_type == "mcq") { objectiveOnly = true }
if (respObject.question_type == "sentence") { subjectiveOnly = true }
if (respObject.question_type == "mixed") {
    objectiveOnly = false;
    subjectiveOnly = false;
}

// let objCount = 0;
// let subjCount = 0;

if (showAnswer == true) {
    for (let i = 0; i < count; i++) {
        let selected = jsonObject.output[i];
        let typeofQuestion = selected.questionType;
        let objectiveCount = 1;
        let subjectiveCount = 1;

        if (objectiveOnly == true) {

            if (typeofQuestion == 0) {
                console.log(`${objectiveCount})`, selected.question);
                objectiveCount++;
                for (let j = 0; j < selected.answers.length; j++) {
                    console.log(`\t${j + 1})`, selected.answers[j])
                }
                console.log(selected.isCorrect)
            }
        }
        if (subjectiveOnly == true) {

            if (typeofQuestion == 1) {
                console.log(`${subjectiveCount})`, selected.question);
                subjectiveCount++;
                for (let j = 0; j < selected.answers.length; j++) {
                    console.log("\t", selected.answers[j])
                }
            }
        }

        if (!subjectiveOnly && !objectiveOnly) {

            console.log(`${i + 1})`, selected.question);

            for (let j = 0; j < selected.answers.length; j++) {
                console.log("\t", selected.answers[j])
            }
            if (typeofQuestion == 0) {
                console.log("correct answer:", selected.isCorrect)
            }

        }

    }
}
else {
    for (let i = 0; i < count; i++) {
        let selected = jsonObject.output[i];
        let typeofQuestion = selected.questionType;
        let objectiveCount = 1;
        let subjectiveCount = 1;

        if (objectiveOnly == true) {

            if (typeofQuestion == 0) {
                console.log(`${objectiveCount})`, selected.question);
                objectiveCount++;
                for (let j = 0; j < selected.answers.length; j++) {
                    console.log(`\t${j + 1})`, selected.answers[j])
                }
                //console.log(selected.isCorrect)
            }
        }
        if (subjectiveOnly == true) {

            if (typeofQuestion == 1) {
                console.log(`${subjectiveCount})`, selected.question);
                subjectiveCount++;
                // for (let j = 0; j < selected.answers.length; j++) {
                //     console.log("\t", selected.answers[j])
                // }
            }
        }

        if (!subjectiveOnly && !objectiveOnly) {

            console.log(`${i + 1})`, selected.question);

            if (typeofQuestion == 0) {
                for (let j = 0; j < selected.answers.length; j++) {
                    console.log("\t", selected.answers[j]);
                }
            }

            // if (typeofQuestion == 0) {
            //     console.log("correct answer:", selected.isCorrect)
            // }

        }

    }

}



>>>>>>> 71aa97ed79156131b0800154b274726e857d9567
