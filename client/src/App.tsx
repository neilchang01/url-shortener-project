import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [isCopy, setIsCopy] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [urlHistory, setUrlHistory] = useState<
    {
      origin: string;
      shortened: string;
    }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");

  if (urlHistory.length > 5) {
    let newUrlHistory = [...urlHistory];
    newUrlHistory.splice(0, 1);
    setUrlHistory(newUrlHistory);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        throw new Error(
          "Invalid input. Please provide a valid URL. Example: 'https://example.com'."
        );
      }

      const { data: response } = await axios.post(
        "http://localhost:3000/shorten",
        {
          url: url,
        }
      );

      if (!response.hash && response.error) {
        throw new Error(response.error);
      }

      setUrlHistory([
        ...urlHistory,
        { origin: url, shortened: `http://localhost:3000/${response.hash}` },
      ]);

      setUrl(`http://localhost:3000/${response.hash}`);
      setIsCopy(true);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setIsCopy(false);
    setIsCopied(false);
  };

  return (
    <div className="App">
      <img src="/images/undraw-link.svg" className="hero-image" />
      <h1>URL Shortener</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter URL here"
          value={url}
          className="form-input"
          required
          onChange={handleChange}
        />
        {isCopy ? (
          <button
            className="form-btn"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(url);
              setIsCopied(true);
            }}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        ) : (
          <button type="submit" className="form-btn">
            Shorten
          </button>
        )}
      </form>
      <table className="url-history">
        {urlHistory.length > 0 && (
          <>
            <thead>
              <tr>
                <th>Origin</th>
                <th>Shortened</th>
              </tr>
            </thead>
            <tbody>
              {urlHistory.map((link) => (
                <tr key={link.origin} className="url-history-item">
                  <td>
                    <a
                      className="history-origin-link"
                      href={link.origin}
                      target="_blank"
                    >
                      {link.origin}
                    </a>
                  </td>
                  <td>
                    <a
                      className="history-shortened-link"
                      href={link.shortened}
                      target="_blank"
                    >
                      {link.shortened}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}

export default App;
