import React from "react";

interface UrlHistoryItemProps {
  link: {
    origin: string;
    shortened: string;
  };
}

const UrlHistoryItem = ({ link }: UrlHistoryItemProps) => {
  return (
    <tr key={link.origin} className="url-history-item">
      <td>
        <a className="history-origin-link" href={link.origin} target="_blank">
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
  );
};

export default UrlHistoryItem;
