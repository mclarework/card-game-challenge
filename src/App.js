import React, { Component } from "react";
import Card from "./components/Card";
import Turn from "./components/Turn";
import Reset from "./components/Reset"
import "./styles/App.css";
import Bowser from "./images/bowser.jpg";
import BabyMario from "./images/babymario.jpg";

class App extends Component {
  state = {
    message: "match the cards to win the game",
    cards: [
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario }
    ],
    firstFlip: null,
    secondFlip: null,
    turn: 0
  };

  ResetButton = () => {
    window.location.reload(false)
  }

  flipHandler = index => {
    if (this.state.firstFlip === null) {
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.setState({ cards: newCards, firstFlip: index });
    } else if (this.state.secondFlip === null) {
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.setState({ cards: newCards, secondFlip: index });
    }
  };

  //this is a React Lifecycle method - read the docs
  componentDidUpdate() {
    //object destructuring so I don't have to keep typing this.state.
    const { firstFlip, secondFlip, cards } = this.state;

    if (firstFlip != null && secondFlip !== null) {
      if (cards[firstFlip].image === cards[secondFlip].image) {
        console.log("its a match");
        this.setState({ firstFlip: null, secondFlip: null });
        this.setState({turn:this.state.turn +1})
      } else if (cards[firstFlip].image !== cards[secondFlip].image) {
        setTimeout(()=>{
          let newCards = this.state.cards;
          newCards[firstFlip].flipped = false;
          newCards[secondFlip].flipped = false;
          this.setState({ cards: newCards, firstFlip: null, secondFlip: null })
        },1000)
      }
      this.setState({turn:this.state.turn +1})
    }
    this.winningLogic();
  }

  winningLogic = () => {
    //write a function that determines a winner (every card is turned over)
    //there's an array method called -every- which you might want to look up.
    //you then need to decided where the best place to call this method is.
  };

  render() {
    return (
      <div className="app">
        <Turn turn = {this.state.turn}/>
        <div className="main">
          {this.state.cards.map((card, index) => {
            return <Card key={index} image={card.image} flipped={card.flipped} click={() => this.flipHandler(index)} />;
          })}
          <p>{this.state.message}</p>
        </div>
          <Reset reset = {this.ResetButton}/>
      </div>
    );
  }
}

export default App;
