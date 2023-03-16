import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { data: response } = await axios.post(
        "http://localhost:3000/shorten",
        {
          url: url,
        }
      );

      if (!response.hash) {
        throw new Error(
          "Something went wrong, no response found. Please try again."
        );
      }

      setUrl(`http://localhost:3000/${response.hash}`);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
    </div>
  );
}

export default App;
