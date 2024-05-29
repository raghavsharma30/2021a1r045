import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [numberType, setNumberType] = useState('e');
    const [response, setResponse] = useState(null);

    const fetchNumbers = async () => {
        try {
            const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE2OTY0MDk3LCJpYXQiOjE3MTY5NjM3OTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImIxNDE1NjVlLTM1OWQtNDQ5Yi04YjNlLTU3MjU1ZmQwOGJiZSIsInN1YiI6InJhZ2hhdnNoYXJtYTMwMTEwM0BnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJyYWdoYXZzaGFybWEiLCJjbGllbnRJRCI6ImIxNDE1NjVlLTM1OWQtNDQ5Yi04YjNlLTU3MjU1ZmQwOGJiZSIsImNsaWVudFNlY3JldCI6IkZ1bEdHZ29VeUlvaHNTYU8iLCJvd25lck5hbWUiOiJSYWdoYXYiLCJvd25lckVtYWlsIjoicmFnaGF2c2hhcm1hMzAxMTAzQGdtYWlsLmNvbSIsInJvbGxObyI6IjIwMjFhMXIwNDUifQ.eaDfmkEndSIs6Y95gwnTBkN4UDW5j93QjgF-hFBkofA";
            const res = await axios.get(`http://localhost:9876/numbers/${numberType}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                timeout: 5000
            });
            setResponse(res.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
               
                console.error('Axios Error:', error.response.data);
            } else {
               
                console.error('Error fetching numbers:', error);
            }
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Average Calculator</h1>
                <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
                    <option value="p">Prime</option>
                    <option value="f">Fibonacci</option>
                    <option value="e">Even</option>
                    <option value="r">Random</option>
                </select>
                <button onClick={fetchNumbers}>Fetch Numbers</button>
                {response && (
                    <div>
                        <h2>Previous State: {JSON.stringify(response.windowPrevState)}</h2>
                        <h2>Current State: {JSON.stringify(response.windowCurrState)}</h2>
                        <h2>Numbers: {JSON.stringify(response.numbers)}</h2>
                        <h2>Average: {response.avg}</h2>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
