const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// const data = require('./data.json'); // Load the JSON data from file
const outputPath = path.join(__dirname, '..', 'files/output.pdf')

function intoPDF(data) {
    fs.readFile('./files/data.json', 'utf8', (err, jsonData) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading settings file');
            return;
        }

        const settings = JSON.parse(jsonData);
        if (settings.allow_answer == true) {
            const doc = new PDFDocument(); // Create a new PDF document

            doc.pipe(fs.createWriteStream(outputPath)); // Pipe the output to a file stream

            doc.fontSize(18).text('Question and Answer', { align: 'center' });

            data.forEach((item, index) => {
                doc.moveDown();//like pressing enter
                doc.fontSize(14).text(`Q${index + 1}. ${item.question}`);
                if (typeof item.answers === 'object') {
                    for (let answer in item.answers) {
                        doc.fontSize(12).text(`${answer}: ${item.answers[answer]}`);
                    }
                    doc.moveDown();
                    doc.fontSize(12).text(`Answer: ${item.isCorrect}`);
                }
                else {
                    doc.fontSize(12).text(`Answer: ${item.answers}`);
                }

            });

            doc.end(); // Finalize the PDF document
        } else {
            const doc = new PDFDocument(); // Create a new PDF document

            doc.pipe(fs.createWriteStream(outputPath)); // Pipe the output to a file stream

            doc.fontSize(18).text('Question and Answer', { align: 'center' });

            data.forEach((item, index) => {
                doc.moveDown();//like pressing enter
                doc.fontSize(14).text(`Q${index + 1}. ${item.question}`);
                if (typeof item.answers === 'object') {
                    for (let answer in item.answers) {
                        doc.fontSize(12).text(`${answer}: ${item.answers[answer]}`);
                    }
                    doc.moveDown();
                    // doc.fontSize(12).text(`Answer: ${item.isCorrect}`);
                }
                else {
                    // doc.fontSize(12).text(`Answer: ${item.answers}`);
                    doc.moveDown();
                    doc.moveDown();
                }

            });

            doc.end(); // Finalize the PDF document

        }
    })
}

function questionIntoPDF(data, total) {
    const doc = new PDFDocument();
    const questionOutputPath = path.join(__dirname, '..', 'files/questionOutput.pdf')
    // console.log(data);

    doc.pipe(fs.createWriteStream(questionOutputPath));

    doc.fontSize(18).text(`Total marks: ${total}`, { align: 'right' })

    data.forEach((item, index) => {
        doc.moveDown();
        doc.fontSize(13).text(`${index + 1}. ${item.question}`);
    });

    doc.end();
}

module.exports = {
    intoPDF,
    questionIntoPDF
}