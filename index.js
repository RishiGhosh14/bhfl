const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid data format. 'data' should be an array."
            });
        }

        let numbers = [];
        let alphabets = [];
        let max_lowercase = '';

        const user_id = `${process.env.FULL_NAME.replace(' ', '_').toLowerCase()}_${process.env.DOB}`;

        data.forEach(item => {
            if (/^\d+$/.test(item)) {
                numbers.push(item);
            } else if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
                // Check for the highest lowercase alphabet
                if (item === item.toLowerCase() && item > max_lowercase) {
                    max_lowercase = item;
                }
            }
        });

        res.json({
            is_success: true,
            user_id,
            email: process.env.EMAIL_ID,
            roll_number: process.env.COLLEGE_ROLL_NUMBER,
            numbers,
            alphabets,
            highest_lowercase_alphabet: max_lowercase ? [max_lowercase] : []
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ is_success: false, message: 'Internal Server Error' });
    }
});


app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
