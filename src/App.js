import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";

const playCodes = {
  "AWW": "All's Well That Ends Well",
  "Ant": "Antony and Cleopatra",
  "AYL": "As You Like It",
  "Err": "The Comedy of Errors",
  "Cor": "Coriolanus",
  "Cym": "Cymbeline",
  "Ham": "Hamlet",
  "1H4": "Henry IV, Part 1",
  "2H4": "Henry IV, Part 2",
  "H5": "Henry V",
  "1H6": "Henry VI, Part 1",
  "2H6": "Henry VI, Part 2",
  "3H6": "Henry VI, Part 3",
  "H8": "Henry VIII",
  "JC": "Julius Caesar",
  "Jn": "King John",
  "Lr": "King Lear",
  "LLL": "Love's Labor's Lost",
  "Mac": "Macbeth",
  "MM": "Measure for Measure",
  "MV": "The Merchant of Venice",
  "Wiv": "The Merry Wives of Windsor",
  "MND": "A Midsummer Night's Dream",
  "Ado": "Much Ado About Nothing",
  "Oth": "Othello",
  "Per": "Pericles",
  "R2": "Richard II",
  "R3": "Richard III",
  "Rom": "Romeo and Juliet",
  "Shr": "The Taming of the Shrew",
  "Tmp": "The Tempest",
  "Tim": "Timon of Athens",
  "Tit": "Titus Andronicus",
  "Tro": "Troilus and Cressida",
  "TN": "Twelfth Night",
  "TGV": "Two Gentlemen of Verona",
  "TNK": "Two Noble Kinsmen",
  "WT": "The Winter's Tale",
  }


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "Apple Pie",
      testData: "",
    };
  }
  
  handleClick = async (event) => {
    event.preventDefault();
    console.log(this.state);

    const another = await fetch('https://www.folgerdigitaltexts.org/Tmp/synopsis')
    .then((response) => {
      return response.text();
    })

    const parser = new DOMParser();

    const doc1 = await parser.parseFromString(another, "text/html");

    console.log(typeof doc1)
    console.log(doc1)

    const testTags = await doc1.getElementsByTagName('p');

    // const textOfTags = testTags.map((tag) =>{
    //   console.log("This is your tag...", tag)
    // })

    console.log(Array.from(testTags))


    // console.log(another)
  };


  render() {
    return (
      <div className="App">
        This is your {this.state.data}
        <div>
          <Button variant="outline-primary" onClick={this.handleClick}>
            Primary Button
          </Button>
        </div>
        <p>{this.state.testData}</p>
      </div>
    );
  }
}

export default App;
