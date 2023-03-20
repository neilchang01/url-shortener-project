import React from "react";

interface FormProps {
  url: string;
  isCopy: boolean;
  isCopied: boolean;
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form = ({
  url,
  isCopy,
  isCopied,
  setIsCopied,
  handleSubmit,
  handleChange,
}: FormProps) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="url"
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
        <button type="submit" className="form-btn" data-testid="submit-button">
          Shorten
        </button>
      )}
    </form>
  );
};

export default Form;
