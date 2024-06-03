import React, { useState } from 'react';
import Charts from './Charts';
import './index.css';

function App() {
    const [shortUrl, setShortUrl] = useState('');
    const [data, setData] = useState(null);

    const fetchAnalyticsData = async (shortUrl) => {
        try {
            const response = await fetch(`http://localhost:3000/getClicksByTarget/${shortUrl}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchAnalyticsData(shortUrl);
    };

    return (
        <div className="App">
            <header>
                <h1>TinyURL Analytics Dashboard</h1>
            </header>
            <main>
                <section>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="shortUrl">Enter Short URL:</label>
                        <input 
                            type="text" 
                            id="shortUrl" 
                            value={shortUrl}
                            onChange={(e) => setShortUrl(e.target.value)}
                            required 
                        />
                        <button type="submit">Get Analytics</button>
                    </form>
                </section>
                {data && <Charts data={data} />}
            </main>
            <footer>
                <p>&copy; 2024 TinyURL Analytics</p>
            </footer>
        </div>
    );
}

export default App;
