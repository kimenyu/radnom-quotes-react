import { useState, useEffect } from "react";

const Home = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setQuotes(result);

        // Select a random quote initially
        setRandomQuote(result[Math.floor(Math.random() * result.length)]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateQuote = () => {
    // Check if the quotes array is not empty
    if (quotes.length > 0) {
      // Select a new random quote when the button is clicked
      setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  };

  return (
    <div className="content">
      <h1>Quotes app</h1>
      <p>Discover and share most inspiring Quotes with the world</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Display the random quote if it exists */}
          {randomQuote && (
            <p>
              {randomQuote.text} by {randomQuote.author}
            </p>
          )}
        </div>
      )}

      <button className="button" onClick={handleGenerateQuote}>
        Generate a quote
      </button>
    </div>
  );
};

export default Home;
