import React, { Component } from 'react';
import mario from './mario.json';
import Wrapper from './components/Wrapper';
import MarioCard from './components/MarioCard';
import './App.css';
import { Jumbotron } from 'reactstrap';


class App extends Component {

  state = {
    currentScore: 0,
    topScore: 0,
    message: "Click an image to begin.",
    charImages: mario,
    unselectedImg: mario
  }

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  selectCharacter = character => {
    const findCharacter = this.state.unselectedImg.find(charImg => charImg.character === character);

    if (findCharacter === undefined) {
      this.setState({
        message: "You guessed incorrectly!",
        topScore: (this.state.currentScore > this.state.topScore) ? this.state.currentScore : this.state.topScore,
        currentScore: 0,
        charImages: mario,
        unselectedImg: mario
      });
    }
    else {
      const newChar = this.state.unselectedImg.filter(charImg => charImg.character !== character);

      this.setState({
        message: "You guessed correctly!",
        currentScore: this.state.currentScore + 1,
        charImages: mario,
        unselectedImg: newChar
      })
    }//End else
    this.shuffleArray(mario);
  }//End if


  render() {
    return (
      <div>
        
          
        <div className="App">

        <header>
        <Jumbotron className="Jumbotron">
            <h1 className="App-title">Mario Memory Challenge Game</h1>
            <h4 className="message">++++++++++++++++++++++++++++++</h4>
            <h4 className="message">{this.state.message}</h4>
            <h4 className="message">Current Score: {this.state.currentScore}</h4>
            <h4 className="message">Top Score: {this.state.topScore}</h4>
            </Jumbotron>
            </header>
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
  }
}

export default App;
