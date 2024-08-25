import express from 'express'
import cors from 'cors'
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: '*', // Allow only your frontend domain
    methods: ['GET', 'POST'], // Allow only GET and POST requests
  }));
  
// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const fullName = "vishal_16062002";
    const dob = "16062002"; 
    const email = "vishal.2021b@vitstudent.ac.in";
    const rollNumber = "21BCI0246";

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid input data' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));

    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
        ? [lowercaseAlphabets.sort().reverse()[0]] 
        : [];

    res.json({
        is_success: true,
        user_id: `${fullName}_${dob}`,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});