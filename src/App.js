import React, { Component } from 'react';
import images from './mario.json';
import Wrapper from './components/Wrapper';
import MarioCard from './components/MarioCard';
import { Jumbotron , Button } from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    currentScore: 0,
    topScore: 0,
    message: "Click an image to begin.",
    charImages: images,
    unselectedImg: images
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
        charImages: images,
        unselectedImg: images
      });
  };

  selectCharacter = character => {
    //Using array.find function to find the first element in array that sattisfies the condition
    const findCharacter = this.state.unselectedImg.find(charImg => charImg.character === character);

    //If there is no matched element 
    if (findCharacter === undefined) {
        this.setState({
            message: "You guessed incorrectly!",
            topScore: (this.state.currentScore > this.state.topScore) ? this.state.currentScore : this.state.topScore,
            currentScore: 0,
            charImages: images,
            unselectedImg: images
        });
    }
    else {
        const newCharacter = this.state.unselectedImg.filter(charImg => charImg.character !== character);

        this.setState({
            message: "You guessed correctly!",
            currentScore: this.state.currentScore + 1,
            charImages: images,
            unselectedImg: newCharacter
        });
    };//End else

    //Invoke shuffleArray to shuffle images array
    this.shuffleArray(images);
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
              this.state.charImages.map(image => (
                  <MarioCard 
                      key={image.id}
                      character = {image.character}
                      charImage = {image.charImage}
                      selectCharacter = {this.selectCharacter}
                      currentScore = {this.state.currentScore}
                  />
              ))
            }
      </Wrapper>
      </div>
    );
  };
};

export default App;
