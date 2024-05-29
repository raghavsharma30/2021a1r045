const express = require('express');
const cors = require('cors'); 
const axios = require('axios');

const app = express();
const port = 9876;

app.use(cors()); 

const windowSize = 10;
let numberWindow = [];

const fetchNumbers = async (type) => {
    const apiMap = {
        'p': 'http://20.244.56.144/test/primes',
        'f': 'http://20.244.56.144/test/fibo',
        'e': 'http://20.244.56.144/test/even',
        'r': 'http://20.244.56.144/test/rand'
    };
    try {
        const response = await axios.get(apiMap[type], { timeout: 500 });
        return response.data.numbers;
    } catch (error) {
        console.error('Error fetching numbers:', error);
        return [];
    }
};

const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
};

app.get('/numbers/:type', async (req, res) => {
    const { type } = req.params;
    if (!['p', 'f', 'e', 'r'].includes(type)) {
        return res.status(400).json({ error: 'Invalid number type' });
    }

    const windowPrevState = [...numberWindow];
    const newNumbers = await fetchNumbers(type);

    if (new Set(numberWindow).size + newNumbers.length <= windowSize) {
        numberWindow = [...new Set([...numberWindow, ...newNumbers])];
    } else {
        const numbersToAdd = new Set(newNumbers).size;
        numberWindow = [...new Set([...numberWindow.slice(numbersToAdd), ...newNumbers])];
    }

    const windowCurrState = [...numberWindow];
    const average = calculateAverage(numberWindow);

    res.json({
        windowPrevState,
        windowCurrState,
        numbers: newNumbers,
        avg: average
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
