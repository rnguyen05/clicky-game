import React, { Component } from 'react';
import characters from './characters.json';
import Wrapper from './components/Wrapper';
import MarioCard from './components/MarioCard';
import { Jumbotron , Button } from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    currentScore: 0,
    topScore: 0,
    message: "Click an image to begin.",
    characters: characters,
    unselectedCharacters: characters
  };

  //Shuffle Array function
  shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      };
  };

  //Function to reset State to initial state on click
  handleButtonClick = event => {
      event.preventDefault();
      this.setState({
        currentScore: 0,
        topScore: 0,
        message: "Click an image to begin.",
        allCharacters: characters,
        unselectedCharacters: characters
      });
  };

  //selectCharacter is called by onClick event in MarioCard.js
  //and receives character parameter
  selectCharacter = selectCharName => {
    //Using array.find function to find the first element in unselectedCharacters array that sattisfies the condition
    //if no character matched then findCharacter will equals to undefined
    const findCharacter = this.state.unselectedCharacters.find(char => char.charName === selectCharName);

    //If no character found in the unselectedCharacters array
    //Then setState for State properties: topScore will be replaced with currentScore if currentScore is higher than topScore
    //and start new game
    if (findCharacter === undefined) {
        this.setState({
            message: "You guessed incorrectly!",
            topScore: (this.state.currentScore > this.state.topScore) ? this.state.currentScore : this.state.topScore,
            currentScore: 0,
            allCharacters: characters,
            unselectedCharacters: characters
        });
    }
    //If character is found in the unselectedCharacters array
    //Then use array.filter to create a new array (newunselectedCharacters)
    else {
        const newUnselectedCharacters = this.state.unselectedCharacters.filter(char => char.charName !== selectCharName);

        this.setState({
            message: "You guessed correctly!",
            currentScore: this.state.currentScore + 1,
            allCharacters: characters,
            unselectedCharacters: newUnselectedCharacters
        });
    };//End else

    //Invoke shuffleArray to shuffle images array
    this.shuffleArray(characters);
  };//End if

  render() {
    return (
      <div>           
        <div className="App">
            <Jumbotron>
                <h2 className="App-title">Mario Memory Challenge Game</h2>
                <p className="message">+++++++++++++++++++++++++++++++</p>
                <p className="message">{this.state.message}</p>
                <p className="message">Current Score: {this.state.currentScore}</p>
                <p className="message">Top Score: {this.state.topScore}</p>
                <Button color="danger" onClick={this.handleButtonClick}>Start Over </Button>
            </Jumbotron>
        </div>
        <Wrapper>
            {
              //map function iterates thru characters array and displays individual image
              //and pass to MarioCard with key, character, charImage, currentScore and function selectCharacter 
              this.state.characters.map(character => (
                  <MarioCard 
                      key={character.id}
                      charName = {character.charName}
                      image = {character.image}
                      currentScore = {this.state.currentScore}
                      selectCharacter = {this.selectCharacter}
                  />
              ))
            }
      </Wrapper>
      </div>
    );
  };
};

export default App;
