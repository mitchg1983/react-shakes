import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default class ButtonSelectPlay extends Component {
    constructor(props) {
        super(props);
    }

    

  handleSelect = (event) => {
    console.log(event);
    console.log(this.props.data)
  };
  


  render() {
    return (
      <div>
        <DropdownButton
          title="Select a Play"
          id="dropdown-menu-align-right"
          onSelect={this.handleSelect}
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
          <Dropdown.Item eventKey="Shr">The Taming of the Shrew</Dropdown.Item>
          <Dropdown.Item eventKey="Tmp">The Tempest</Dropdown.Item>
          <Dropdown.Item eventKey="Tim">Timon of Athens</Dropdown.Item>
          <Dropdown.Item eventKey="Tit">Titus Andronicus</Dropdown.Item>
          <Dropdown.Item eventKey="Tro">Troilus and Cressida</Dropdown.Item>
          <Dropdown.Item eventKey="TN">Twelfth Night</Dropdown.Item>
          <Dropdown.Item eventKey="TGV">Two Gentlemen of Verona</Dropdown.Item>
          <Dropdown.Item eventKey="TNK">Two Noble Kinsmen</Dropdown.Item>
          <Dropdown.Item eventKey="WT">The Winter's Tale</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}
