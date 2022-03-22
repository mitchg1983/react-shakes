import "./App.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonSelectPlay from "./components";

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
          <div className="reveal-box">
            <div className="game-act">Act? {this.state.gameScenes[0].synopsis} </div>
            <div className="scene-act">Scene?</div>
          </div>
          <div className="synopsis-field">
            <div className="syn-text">Synopsis goes here</div>
          </div>
        </div>
        <div></div>
        <ButtonSelectPlay data={this.state}/>
      </div>
    );
  }
}

export default App;
