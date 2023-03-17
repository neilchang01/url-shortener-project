import React from "react";
import UrlHistoryItem from "./UrlHistoryItem";

interface UrlHistoryProps {
  urlHistory: {
    origin: string;
    shortened: string;
  }[];
}

const UrlHistory = ({ urlHistory }: UrlHistoryProps) => {
  return (
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
              <UrlHistoryItem key={link.origin} link={link} />
            ))}
          </tbody>
        </>
      )}
    </table>
  );
};

export default UrlHistory;
