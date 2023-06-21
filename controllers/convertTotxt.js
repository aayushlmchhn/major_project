<<<<<<< HEAD
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth'); // for converting docx to txt
const pdfjs = require('pdfjs-dist/build/pdf.js'); // for converting pdf to txt

async function convertFiles(sourceDir, destDir) {
    // create destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir);
    }

    // read files in source directory
    const files = fs.readdirSync(sourceDir);

    // loop through files
    for (const file of files) {
        const extname = path.extname(file).toLowerCase();
        const basename = path.basename(file, extname);

        // check if file is one of the supported formats
        if (extname === '.pdf') {
            // convert pdf to txt
            const pdfData = new Uint8Array(fs.readFileSync(path.join(sourceDir, file)));
            const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
            const txt = await Promise.all(Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1).then(page => page.getTextContent())).map(content => content.then(text => text.items.map(item => item.str).join(' ')))).then(pages => pages.join('\n'));

            // write txt to destination directory
            fs.writeFileSync(path.join(destDir, `${basename}.txt`), txt);
        } else if (extname === '.odt' || extname === '.docx' || extname === '.txt') {
            // convert odt, docx, or txt to txt
            let txt;
            if (extname === '.odt') {
                const result = await mammoth.convertToHtml({ path: path.join(sourceDir, file) });
                txt = result.value.replace(/<\/?[a-z][^>]*>/gi, '');
            } else if (extname === '.docx') {
                const result = await mammoth.extractRawText({ path: path.join(sourceDir, file) });
                txt = result.value.replace(/\r\n/g, '\n');
            } else {
                txt = fs.readFileSync(path.join(sourceDir, file), 'utf-8');
            }

            // write txt to destination directory
            fs.writeFileSync(path.join(destDir, `${basename}.txt`), txt);
        }
    }
}

module.exports = convertFiles;
=======
//this section will convert any type of file received into .txt format
//here i have written it for converting file received as .pdf.doc and .odt format into .txt format

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { exec } = require('child_process');

const docxFilePath = '/path/to/your/file.docx';
const txtFilePath = '/path/to/your/file.txt';

// Check if the input file exists
if (!fs.existsSync(docxFilePath)) {
    console.error('Input file does not exist');
    process.exit(1);
}

// Convert the .docx file to .txt using Mammoth library
mammoth.convertToHtml({ path: docxFilePath })
    .then((result) => {
        const text = result.value.replace(/<\/?[^>]+(>|$)/g, ''); // Remove HTML tags
        fs.writeFileSync(txtFilePath, text);
        console.log('File converted successfully');
    })
    .catch((error) => {
        console.error(`Error converting file: ${error}`);
        process.exit(1);
    });


/////////////////////////////////////////////////////////////////////////////////////
///// program to convert the file from .pdf format into the .txt format and store into the disk location



const pdfFilePath = '/path/to/your/file.pdf';// gotta change these to accomodate the database
//const txtFilePath = '/path/to/your/file.txt';

// Check if the input file exists
if (!fs.existsSync(pdfFilePath)) {
    console.error('Input file does not exist');
    process.exit(1);
}


// Convert the .pdf file to .txt using pdftotext command-line tool
/////////////////////////////////////////////////////////////////

exec(`pdftotext "${pdfFilePath}" "${txtFilePath}"`, (error) => {
    if (error) {
        console.error(`Error converting file: ${error}`);
        process.exit(1);
    }

    // Check if the output file exists
    if (!fs.existsSync(txtFilePath)) {
        console.error('Output file does not exist');
        process.exit(1);
    }

    console.log('File converted successfully');
});

//// program to convert the file from .odt format into the .txt format
////////////////////////////////////////////////////////////////////////////////////


const odtFilePath = 'C:\Users\Administrator\Desktop\SE_project-main\file.odt';
//const txtFilePath = 'C:\Users\Administrator\Desktop\SE_project-main\file.txt';

// Check if the input file exists
if (!fs.existsSync(odtFilePath)) {
    console.error('Input file does not exist');
    process.exit(1);
}

// Convert the .odt file to .txt using LibreOffice
exec(`soffice --headless --convert-to txt "${odtFilePath}" --outdir "${path.dirname(txtFilePath)}"`, (error) => {
    if (error) {
        console.error(`Error converting file: ${error}`);
        process.exit(1);
    }

    // Check if the output file exists
    if (!fs.existsSync(txtFilePath)) {
        console.error('Output file does not exist');
        process.exit(1);
    }

    console.log('File converted successfully');
});
>>>>>>> 71aa97ed79156131b0800154b274726e857d9567
