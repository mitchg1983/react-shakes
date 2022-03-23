import "./App.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameScenes: [],
      playSelected: false,
      targetPlayCode: "",
      activeQuestion: {
        act: "testAct",
        scene: "testScene",
        synopsis: "testSynopsis",
      },
      userGuess: {
        act: "",
        scene: "",
      },
    };
  }

  //This function will return the array of raw scene & HTML data
  handleGetScenes = async (event) => {
    event.preventDefault();
    const newGameScenes = [];
    fetch(
      "https://www.folgerdigitaltexts.org/" +
        this.state.targetPlayCode +
        "/synopsis"
    )
      //Turn that response into text
      .then((response) => response.text())
      //Turn the text into an html document
      .then((data) => {
        const parser = new DOMParser();
        return parser.parseFromString(data, "text/html");
      })
      //Gather all of the 'p' tags on the document, put them in an array
      .then((parsedDoc) => Array.from(parsedDoc.getElementsByTagName("p")))
      //Remainder of the function will clean up the scenes' text, put them in individual objects with
      //Act-Scene-Synopsis values, and all of those objects into an array. Set the array to state.
      .then((newArr) => {
        newArr.map((ele) => {
          const splitThisScene = ele.textContent.split(":");
          if (splitThisScene.length < 2) {
            return;
          } else {
            const getSceneAct = splitThisScene[0].match(/[0-9]/g);
            const newGameScene = {
              act: getSceneAct[0],
              scene: getSceneAct[1],
              synopsis: splitThisScene[1].trim(),
            };
            newGameScenes.push(newGameScene);
          }
        });
      });
    this.setState({
      gameScenes: newGameScenes,
    });
  };

  //Will pick a random scene from the selected play
  handleDoSomething = async () => {
    const { gameScenes } = this.state;
    function getRandomInt(cap) {
      return Math.floor(Math.random() * cap);
    }
    this.setState({
      activeQuestion: gameScenes[getRandomInt(gameScenes.length)],
    });
  };

  //User input to select play
  handlePlaySelect = (event) => {
    this.setState({
      playSelected: true,
      targetPlayCode: event,
    });
  };

  //User input to guess the Scene
  handleSceneGuess = (event) => {
    console.log(event);
    console.log("Scene Guess");
    this.setState({
      userGuess: {
        ...this.state.userGuess,
        scene: event,
      },
    });
  };

  //user input to guess the Act
  handleActGuess = (event) => {
    console.log(event);
    console.log("Act Guess");
    this.setState({
      userGuess: {
        ...this.state.userGuess,
        act: event,
      },
    });
  };

  correctGuess = () => {
    console.log("You got a correct match!");
  };

  wrongGuess = () => {
    console.log("You got a WRONG match...");
  };

  handleMakeGuess = () => {
    const { activeQuestion, userGuess } = this.state;
    if (
      activeQuestion.act === userGuess.act &&
      activeQuestion.scene === userGuess.scene
    ) {
      this.correctGuess();
    } else this.wrongGuess();
  };

  render() {
    return (
      <div className="App">
        This is your Shakespeare react app
        <div>
          <Button variant="outline-primary" onClick={this.handleGetScenes}>
            Get all scenes from play
          </Button>
          <Button variant="secondary" onClick={this.handleDoSomething}>
            Display scene to guess
          </Button>
        </div>
        <div className="game-area m-2">
          <div className="reveal-box">
            <div className="game-act">
              <DropdownButton
                title="Guess the Act!"
                id="button-act-guess"
                onSelect={this.handleActGuess}
              >
                <Dropdown.Item eventKey="1">I</Dropdown.Item>
                <Dropdown.Item eventKey="2">II</Dropdown.Item>
                <Dropdown.Item eventKey="3">III</Dropdown.Item>
                <Dropdown.Item eventKey="4">IV</Dropdown.Item>
                <Dropdown.Item eventKey="5">V</Dropdown.Item>
              </DropdownButton>
              The answer is...
              <p className="act-answer"> {this.state.activeQuestion.act}</p>
            </div>
            <div className="scene-act">
              <DropdownButton
                title="Guess the Scene!"
                id="button-scene-guess"
                onSelect={this.handleSceneGuess}
              >
                <Dropdown.Item eventKey="1">I</Dropdown.Item>
                <Dropdown.Item eventKey="2">II</Dropdown.Item>
                <Dropdown.Item eventKey="3">III</Dropdown.Item>
                <Dropdown.Item eventKey="4">IV</Dropdown.Item>
                <Dropdown.Item eventKey="5">V</Dropdown.Item>
              </DropdownButton>
              The answer is...
              <p>{this.state.activeQuestion.scene}</p>
            </div>
          </div>
          <div className="synopsis-field">
            <div className="syn-text">{this.state.activeQuestion.synopsis}</div>
          </div>
        </div>
        <div className="bot-buttons">
          <DropdownButton
            title="Select a Play"
            id="dropdown-menu-align-right"
            onSelect={this.handlePlaySelect}
          >
            <Dropdown.Item eventKey="AWW">
              All's Well That Ends Well
            </Dropdown.Item>
            <Dropdown.Item eventKey="Ant">Antony and Cleopatra</Dropdown.Item>
            <Dropdown.Item eventKey="AYL">As You Like It</Dropdown.Item>
            <Dropdown.Item eventKey="Err">The Comedy of Errors</Dropdown.Item>
            <Dropdown.Item eventKey="Cor">Coriolanus</Dropdown.Item>
            <Dropdown.Item eventKey="Cym">Cymbeline</Dropdown.Item>
            <Dropdown.Item eventKey="Ham">Hamlet</Dropdown.Item>
            <Dropdown.Item eventKey="1H4">Henry IV, Part 1</Dropdown.Item>
            <Dropdown.Item eventKey="2H4">Henry IV, Part 2</Dropdown.Item>
            <Dropdown.Item eventKey="H5">Henry V</Dropdown.Item>
            <Dropdown.Item eventKey="1H6">Henry VI, Part 1</Dropdown.Item>
            <Dropdown.Item eventKey="2H6">Henry VI, Part 2</Dropdown.Item>
            <Dropdown.Item eventKey="3H6">Henry VI, Part 3</Dropdown.Item>
            <Dropdown.Item eventKey="H8">Henry VIII</Dropdown.Item>
            <Dropdown.Item eventKey="JC">Julius Caesar</Dropdown.Item>
            <Dropdown.Item eventKey="Jn">King John</Dropdown.Item>
            <Dropdown.Item eventKey="Lr">King Lear</Dropdown.Item>
            <Dropdown.Item eventKey="LLL">Love's Labor's Lost</Dropdown.Item>
            <Dropdown.Item eventKey="Mac">Macbeth</Dropdown.Item>
            <Dropdown.Item eventKey="MM">Measure for Measure</Dropdown.Item>
            <Dropdown.Item eventKey="MV">The Merchant of Venice</Dropdown.Item>
            <Dropdown.Item eventKey="Wiv">
              The Merry Wives of Windsor
            </Dropdown.Item>
            <Dropdown.Item eventKey="MND">
              A Midsummer Night's Dream
            </Dropdown.Item>
            <Dropdown.Item eventKey="Ado">Much Ado About Nothing</Dropdown.Item>
            <Dropdown.Item eventKey="Oth">Othello</Dropdown.Item>
            <Dropdown.Item eventKey="Per">Pericles</Dropdown.Item>
            <Dropdown.Item eventKey="R2">Richard II</Dropdown.Item>
            <Dropdown.Item eventKey="R3">Richard III</Dropdown.Item>
            <Dropdown.Item eventKey="Rom">Romeo and Juliet</Dropdown.Item>
            <Dropdown.Item eventKey="Shr">
              The Taming of the Shrew
            </Dropdown.Item>
            <Dropdown.Item eventKey="Tmp">The Tempest</Dropdown.Item>
            <Dropdown.Item eventKey="Tim">Timon of Athens</Dropdown.Item>
            <Dropdown.Item eventKey="Tit">Titus Andronicus</Dropdown.Item>
            <Dropdown.Item eventKey="Tro">Troilus and Cressida</Dropdown.Item>
            <Dropdown.Item eventKey="TN">Twelfth Night</Dropdown.Item>
            <Dropdown.Item eventKey="TGV">
              Two Gentlemen of Verona
            </Dropdown.Item>
            <Dropdown.Item eventKey="TNK">Two Noble Kinsmen</Dropdown.Item>
            <Dropdown.Item eventKey="WT">The Winter's Tale</Dropdown.Item>
          </DropdownButton>

          <Button variant="danger" onClick={this.handleMakeGuess}>
            Make your guess!
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
