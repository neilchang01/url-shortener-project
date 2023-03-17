import { useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import ErrorMsg from "./components/ErrorMsg";
import Form from "./components/Form";
import UrlHistory from "./components/UrlHistory";

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
      <Header />
      {errorMessage && <ErrorMsg message={errorMessage} />}
      <Form
        url={url}
        isCopy={isCopy}
        isCopied={isCopied}
        setIsCopied={setIsCopied}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {urlHistory.length > 0 && <UrlHistory urlHistory={urlHistory} />}
    </div>
  );
}

export default App;
