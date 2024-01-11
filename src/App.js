import React, { useState } from "react";
import "./App.css"; // Import your CSS file

const App = () => {
  const [jsonData, setJsonData] = useState("");
  const [userStories, setUserStories] = useState([]);
  const [outputText, setOutputText] = useState([]);

  const getDate = (dateString) => {
    const milliseconds = parseInt(dateString.match(/\d+/)[0]);
    const date = new Date(milliseconds);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = `${day}${month}${year}`;

    return formattedDate;
  };

  const changeSetDate = (userStory) => {
    const userStoryData = jsonData.find((a) => a.title.includes(userStory));

    if (userStoryData) {
      const temp = `
        <div>
          <a href="https://ppdtfsas001.jtax.com/tfs/JHGIT/DevOps/_git/TaxResolution/pullrequest/${
            userStoryData.pullRequestId
          }">
            Changeset ${userStoryData.pullRequestId}
          </a>
          - ${getDate(userStoryData.closedDate)} - ${userStoryData.title}
        </div>`;
      return temp;
    } else {
      return null;
    }
  };

  const handleGenerateOutput = () => {
    var res = userStories.map(changeSetDate).filter(Boolean);
    setOutputText(res);
  };

  return (
    <div className="app-container">
      <div className="title">Changeset Generator</div>
      <label>
        JSON Data:
        <textarea
          rows="10"
          value={jsonData}
          onChange={(e) => setJsonData(JSON.parse(e.target.value))}
        />
      </label>
      <br />
      <label>
        User Stories <span className="red-color-text">(comma-separated)</span>:
        <input
          type="text"
          value={userStories}
          onChange={(e) =>
            setUserStories(
              e.target.value.replace(/\s/g, "").toUpperCase().split(",")
            )
          }
        />
      </label>
      <br />
      <button onClick={handleGenerateOutput}>Generate Output</button>
      <br />
      <div>
        <strong>Output:</strong>

        <div className="output-container">
          {outputText.map((item, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
