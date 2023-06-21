// const fs = require('fs');

// function combineFiles(txtFilePath, jsonFilePath, outputFilePath) {
//   // Read in the text file
//   const txtFileContents = fs.readFileSync(txtFilePath, 'utf8');

//   // Read in the JSON file
//   const jsonFileContents = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

//   // Combine the contents of the files into a new object
//   const combinedData = {
//     text: txtFileContents,
//     json: jsonFileContents,
//   };

//   // Write the combined data to a new JSON file
//   fs.writeFileSync(outputFilePath, JSON.stringify(combinedData));
// }

// // Usage example
// const txtFilePath = 'mytextfile.txt';
// const jsonFilePath = 'myjsonfile.json';
// const outputFilePath = 'combined.json';

// if (fs.existsSync(outputFilePath)) {
//   console.log(`Warning: ${outputFilePath} already exists and will be overwritten.`);
// }

// combineFiles(txtFilePath, jsonFilePath, outputFilePath);

const fs = require('fs');
const path = require('path')

function combineFiles(txtFilePath, jsonFilePath, outputFilePath) {
    // Read in the text file
    const txtFileContents = fs.readFileSync(txtFilePath, 'utf8');

    // Read in the JSON file
    const jsonFileContents = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    // const jsonFileContents = fs.readFileSync(jsonFilePath, 'utf8');

    // Combine the contents of the files into a new object
    const combinedData = {
        text: txtFileContents,
        json: jsonFileContents,
    };

    // Write the combined data to a new JSON file
    fs.writeFileSync(outputFilePath, JSON.stringify(combinedData));
}

// Usage example
///////////////////////////////////////////////////////////////////////////


// const txtFilePath = path.join(__dirname, '..', '/files/convertedUploads/uploadedPlainText.txt');
// const jsonFilePath = path.join(__dirname, '..', '/files/data.json');
// const outputFilePath = 'combined.json';

// if (fs.existsSync(outputFilePath)) {
//     console.log(`Warning: ${outputFilePath} already exists and will be overwritten.`);
// }

// combineFiles(txtFilePath, jsonFilePath, outputFilePath);




module.exports = combineFiles


//add to this section accordingly to the location where combination is required for input and data.json
// const combineFiles = require('./controllers/combineFile');

// const txtFilePath = path.join(__dirname, '/files/convertedUploads/uploadedPlainText.txt');
// const jsonFilePath = path.join(__dirname, '/files/data.json');
// const outputFilePath = 'combined.json';
// combineFiles(txtFilePath, jsonFilePath, outputFilePath);