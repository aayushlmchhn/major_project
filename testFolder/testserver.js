const express = require('express');//
const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const fs = require('fs');
const path = require('path');
const executeFunction = require('./executeFunction');

const app = express();//
app.use(bodyParser.json());

app.get('/predict', async (req, res) => {

    try {
        const inputFilepath = path.join(__dirname, '..', '/files/combinedInput.json')
        // const outputFilename = `result_${Date.now()}.json`; // create unique filename for result
        const outputFilename = 'outputRevisedTesting.json';
        const outputFilepath = path.join(__dirname, '..', '/files/outputRevisedTesting.json');
        const pathToPython = '../myenv/Scripts/python';
        const pythonScript = 'ai_model.py';
        //to the execute function
        // const outputData = await predict(inputFilepath, outputFilepath, pathToPython, pythonScript);
        const outputData = await executeFunction(inputFilepath, pathToPython, pythonScript);
        res.send(outputData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error running Python model' });

    }
    // // read input JSON file
    // const inputData = JSON.parse(fs.readFileSync(inputFilepath));

    // // call Python AI model with input data as argument
    // // console.log(inputData)
    // const pythonProcess = spawn('../myenv/Scripts/python', ['ai_model.py']);
    // pythonProcess.stdin.write(JSON.stringify(inputData))
    // pythonProcess.stdin.end();

    // // console.log(JSON.stringify(inputData))
    // // capture stdout and stderr streams from Python process
    // let stdoutData = '';
    // let stderrData = '';
    // // console.log(stdoutData);
    // pythonProcess.stdout.on('data', (data) => {
    //     stdoutData += data.toString();
    // });
    // console.log(stdoutData);
    // pythonProcess.stderr.on('data', (data) => {
    //     console.error(data.toString());
    // });

    // // save result JSON file and send response to frontend
    // pythonProcess.on('close', (code) => {
    //     if (code === 0) {

    //         const outputData = JSON.parse(stdoutData);

    //         // write the result to a file
    //         fs.writeFileSync(outputFilepath, JSON.stringify(outputData));

    //         res.send(outputData);

    //     } else {
    //         console.error(`Python process exited with code ${code}: ${stderrData}`);
    //         res.status(500).send({ error: 'Error running Python model' });
    //     }
    // });


});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
