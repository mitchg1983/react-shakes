import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


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
      data: "Shakespeare React App",
      playRawData: [],
      dropTest: "",
      gameScenes: [
        {
          act: "",
          scene: "",
          synposis: "",
        },
      ],
    };
  }

  //TODO - build the URL here from the input table provided to user
  //This function will return the array of raw scene & HTML data
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

  //This function will take in the raw scene & HTML data and create a new array
  //From each element in the input array, an object will be created that contains
  //the Act number, Scene number and corresponding Synposis
  //The returned array, will contain one new object for each scene in the play
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

  handleSelect = (event) => {
    console.log(event);
  }

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
        <div className="game-area m-2">

        <Dropdown>
        <Dropdown.Toggle variant="success">
          Open Menu
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            Home Page
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Settings
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
          
        </div>

        <div>
        <DropdownButton
      title="Dropdown right"
      id="dropdown-menu-align-right"
      onSelect={this.handleSelect}
        >
              <Dropdown.Item eventKey="first option">option-1</Dropdown.Item>
              <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
              <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
      </DropdownButton>
        </div>

      </div>

    );
  }
}

export default App;
