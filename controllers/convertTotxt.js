const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth'); // for converting docx to txt
const pdfjs = require('pdfjs-dist/build/pdf.js'); // for converting pdf to txt

//asynchronous function 
//update this for the conversion of .odt files which is not working now.
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
            // fs.writeFileSync(path.join(destDir, 'uploadedPlainText.txt'), txt);
            // fs.writeFileSync(path.join(destDir, `${basename}.txt`), txt);
            // this will store as a seperate txt file with the basename similar to the name of the file that was intially uploaded
            fs.writeFileSync(path.join(destDir, 'uploadedPlainText.txt'), txt);

            // const pdftxt = fs.readFileSync(path.join(destDir, `${basename}.txt`));
            // fs.writeFileSync(path.join(destDir, 'uploadedPlainText.txt'), pdftxt);
            // fs.unlinkSync(path.join(destDir, `${basename}.txt`));


            ////////////////////////////////////////////////////////////////

        } else if (extname === '.odt' || extname === '.docx' || extname === '.txt') {
            // convert odt, docx, or txt to txt
            let txt;
            //conversion of .odt file to .txt doesnot work at all so update it accordingly
            if (extname === '.odt') {
                const result = await mammoth.convertToHtml({ path: path.join(sourceDir, file) });
                txt = result.value.replace(/<\/?[a-z][^>]*>/gi, '');

                // // specify the input and output file paths
                // const inputFile = path.join(sourceDir, file);
                // const outputFile = path.join(destDir, `${basename}.txt`);

                // // convert the file to txt using the appropriate library
                // if (extname === '.odt') {
                //     odt2txt.convert(fs.readFileSync(inputFile), (err, data) => {
                //         if (err) {
                //             console.error('Error: ', err);
                //         } else {
                //             // write the txt data to the output file
                //             fs.writeFileSync(outputFile, data);
                //             //console.log('ODT file converted to TXT successfully!');
                //         }
                //     });


            } else if (extname === '.docx') {
                const result = await mammoth.extractRawText({ path: path.join(sourceDir, file) });
                txt = result.value.replace(/\r\n/g, '\n');
            } else {
                txt = fs.readFileSync(path.join(sourceDir, file), 'utf-8');
            }

            // write txt to destination directory
            // fs.writeFileSync(path.join(destDir, `${basename}.txt`), txt);
            fs.writeFileSync(path.join(destDir, 'uploadedPlainText.txt'), txt);


            // this will store as a seperate txt file with the basename similar to the name of the file that was intially uploaded
            // fs.writeFileSync(path.join(destDir, 'uploadedPlainText.txt'), txt);
        }
    }
}


// //updated synchronous version of the same function
// function convertFiles(sourceDir, destDir) {
//     // create destination directory if it doesn't exist
//     if (!fs.existsSync(destDir)) {
//         fs.mkdirSync(destDir);
//     }

//     // read files in source directory
//     const files = fs.readdirSync(sourceDir);

//     // loop through files
//     for (const file of files) {
//         const extname = path.extname(file).toLowerCase();
//         const basename = path.basename(file, extname);

//         // check if file is one of the supported formats
//         if (extname === '.pdf') {
//             // convert pdf to txt
//             const pdfData = new Uint8Array(fs.readFileSync(path.join(sourceDir, file)));
//             const pdf = pdfjs.getDocument({ data: pdfData }).promiseSync();
//             const txt = Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1).getTextContentSync()).map(content => content.items.map(item => item.str).join(' ')).join('\n');

//             // write txt to destination directory
//             fs.writeFileSync(path.join(destDir, `${basename}.txt`), txt);
//         } else if (extname === '.odt' || extname === '.docx' || extname === '.txt') {
//             // convert odt, docx, or txt to txt
//             let txt;
//             if (extname === '.odt') {
// const result = mammoth.convertToHtmlSync({ path: path.join(sourceDir, file) });
// txt = result.value.replace(/<\/?[a-z][^>]*>/gi, '');
//             } else if (extname === '.docx') {
//                 const result = mammoth.extractRawTextSync({ path: path.join(sourceDir, file) });
//                 txt = result.value.replace(/\r\n/g, '\n');
//             } else {
//                 txt = fs.readFileSync(path.join(sourceDir, file), 'utf-8');
//             }

//             // write txt to destination directory
//             fs.writeFileSync(path.join(destDir, `${basename}.txt`), txt);
//         }
//     }
// }

module.exports = convertFiles;
