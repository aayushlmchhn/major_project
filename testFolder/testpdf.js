const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'files/output.pdf');

function intoPDF(data) {
    fs.readFile('./files/data.json', 'utf8', (err, jsonData) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading settings file');
            return;
        }

        const settings = JSON.parse(jsonData);
        const totalMarks = data.reduce((acc, item) => acc + item.marks, 0);

        const doc = new PDFDocument(); // Create a new PDF document
        doc.pipe(fs.createWriteStream(outputPath)); // Pipe the output to a file stream

        doc.fontSize(18).text('Question and Answer', { align: 'center' });

        doc.moveDown();

        doc.fontSize(14).text(`Total Marks: ${totalMarks}`);

        data.forEach((item, index) => {
            doc.moveDown(); // like pressing enter
            doc.fontSize(14).text(`Q${index + 1}. ${item.question} (${item.marks} marks)`);

            if (typeof item.answers === 'object') {
                for (let answer in item.answers) {
                    doc.fontSize(12).text(`${answer}: ${item.answers[answer]}`);
                }
                doc.moveDown();
                doc.fontSize(12).text(`Answer: ${item.isCorrect}`);
            } else {
                doc.fontSize(12).text(`Answer: ${item.answers}`);
            }
        });

        doc.end(); // Finalize the PDF document
    });
}


