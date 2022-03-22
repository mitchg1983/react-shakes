import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";

const playCodes = {
  AWW: "All's Well That Ends Well",
  Ant: "Antony and Cleopatra",
  AYL: "As You Like It",
  Err: "The Comedy of Errors",
  Cor: "Coriolanus",
  Cym: "Cymbeline",
  Ham: "Hamlet",
  "1H4": "Henry IV, Part 1",
  "2H4": "Henry IV, Part 2",
  H5: "Henry V",
  "1H6": "Henry VI, Part 1",
  "2H6": "Henry VI, Part 2",
  "3H6": "Henry VI, Part 3",
  H8: "Henry VIII",
  JC: "Julius Caesar",
  Jn: "King John",
  Lr: "King Lear",
  LLL: "Love's Labor's Lost",
  Mac: "Macbeth",
  MM: "Measure for Measure",
  MV: "The Merchant of Venice",
  Wiv: "The Merry Wives of Windsor",
  MND: "A Midsummer Night's Dream",
  Ado: "Much Ado About Nothing",
  Oth: "Othello",
  Per: "Pericles",
  R2: "Richard II",
  R3: "Richard III",
  Rom: "Romeo and Juliet",
  Shr: "The Taming of the Shrew",
  Tmp: "The Tempest",
  Tim: "Timon of Athens",
  Tit: "Titus Andronicus",
  Tro: "Troilus and Cressida",
  TN: "Twelfth Night",
  TGV: "Two Gentlemen of Verona",
  TNK: "Two Noble Kinsmen",
  WT: "The Winter's Tale",
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "Apple Pie",
      playRawData: [],
      gameScenes: [
        {
          act: "",
          scene: "",
          synposis: "",
        },
      ],
    };
  }

  handleGetScenes = async (event) => {
    event.preventDefault();
    //fetch the data on the given URL
    const another = await fetch(
      "https://www.folgerdigitaltexts.org/Ham/synopsis"
    )
      //Turn that response into text
      .then((response) => {
        return response.text();
      })
      //Turn the text into an html document
      .then((data) => {
        const parser = new DOMParser();
        const parsedDoc = parser.parseFromString(data, "text/html");
        return parsedDoc;
      })
      //Gather all of the 'p' tags on the document, put them in an array
      .then((parsedDoc) => {
        const newArr = Array.from(parsedDoc.getElementsByTagName("p"));
        this.setState({
          playRawData: newArr,
        });
      });
  };

  handleStripScenes = () => {
    const newGameScenes = [];
    const strippedData = this.state.playRawData;
    const newStrip = strippedData.map((ele) => {
      const currentSceneText = ele.textContent;
      const splitThisScene = currentSceneText.split(":");
      if (splitThisScene.length < 2) {
        return;
      } else {
        const numMatch = /[0-9]/g;
        const getSceneAct = splitThisScene[0].match(numMatch);
        const newGameScene = {
          act: getSceneAct[0],
          scene: getSceneAct[1],
          synposis: splitThisScene[1].trim(),
        };
        newGameScenes.push(newGameScene);
      }
    });

    this.setState({
      gameScenes: newGameScenes,
    });
  };

  render() {
    return (
      <div className="App">
        This is your {this.state.data}
        <div>
          <Button variant="outline-primary" onClick={this.handleGetScenes}>
            Get all scenes from play
          </Button>
          <Button variant="outline-secondary" onClick={this.handleStripScenes}>
            Get all scenes from play
          </Button>
        </div>
        <p>{this.state.testData}</p>
      </div>
    );
  }
}

export default App;
