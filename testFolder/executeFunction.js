// const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const fs = require('fs');
// const path = require('path');

// 

const executeFunction = (inputFilePath, pathToPython, pythonScript) => {
    const inputData = JSON.parse(fs.readFileSync(inputFilePath));

    const pythonProcess = spawn(pathToPython, [pythonScript]);
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    let stdoutData = '';
    let stderrData = '';

    pythonProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
    });

    return new Promise((resolve, reject) => {
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                const outputData = JSON.parse(stdoutData);
                // console.log(outputData);
                resolve(outputData);
            } else {
                reject(new Error(`Python process exited with code ${code}: ${stderrData}`));
            }
        });
    });
};



module.exports = executeFunction;