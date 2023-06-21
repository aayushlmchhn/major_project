// const express = require('express');
// const { spawn } = require('child_process');

// const app = express();

// app.get('/add', (req, res) => {
//     const a = 2;
//     const b = 3;

//     // spawn a new Python process
//     const py = spawn('python', ['my_function.py', 'add_numbers', a, b]);

//     // listen for data from the Python process
//     py.stdout.on('data', (data) => {
//         const sum = parseInt(data.toString());
//         res.send(`The sum of ${a} and ${b} is ${sum}`);
//     });

//     // listen for errors from the Python process
//     py.stderr.on('data', (data) => {
//         console.error(`Error from Python process: ${data}`);
//         res.status(500).send('Internal server error');
//     });
// });

// app.listen(3000, () => console.log('Express app listening on port 3000'));


// index.js

//this thing works real good if anything goes wrong comeback to this point

const express = require('express');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/predict', (req, res) => {
    const input_data = req.body;
    const pythonProcess = spawn('../myenv/Scripts/python', ['ai_model.py']);

    pythonProcess.stdin.write(JSON.stringify(input_data));
    pythonProcess.stdin.end();

    let output = '';

    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            return res.status(500).json({ error: `Python process exited with code ${code}` });
        }

        // console.log(output);

        const prediction = JSON.parse(output);
        res.json(prediction);
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
