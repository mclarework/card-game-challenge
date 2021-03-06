import React, { Component } from "react";
import Card from "./components/Card";
import Turn from "./components/Turn";
import Reset from "./components/Reset";
import Win from "./components/Win";
import Lose from "./components/Lose";
import "./styles/App.css";
import Bowser from "./images/bowser.jpg";
import BabyMario from "./images/babymario.jpg";
import DryBowser from "./images/DryBowserSmash3.png";
import Morton from "./images/Morton_SSBU.png";
import Roy from "./images/roy-kooper.png";
import Waluigi from "./images/waluigi.jpg";
import Wario from "./images/Wario_MP100.png";
import Yoshi from "./images/yoshi.png";
import _ from "lodash";

class App extends Component {
  time = 0
  state = {
    message:
      "Match the cards to win the game! Run out of lives and you lose...",
    cards: [
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: DryBowser },
      { flipped: false, image: Morton },
      { flipped: false, image: DryBowser },
      { flipped: false, image: Morton },
      { flipped: false, image: Roy },
      { flipped: false, image: Waluigi },
      { flipped: false, image: Roy },
      { flipped: false, image: Waluigi },
      { flipped: false, image: Wario },
      { flipped: false, image: Yoshi },
      { flipped: false, image: Wario },
      { flipped: false, image: Yoshi }
    ],
    firstFlip: null,
    secondFlip: null,
    turn: 10,
    loading: true,
    seconds: 0,
    minutes: 0,
    win: false,
    lose: false
  };

  componentDidMount() {
    let cards = this.state.cards;
    cards = _.shuffle(cards);
    this.setState({ cards: cards });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  //this is a React Lifecycle method - read the docs
  componentDidUpdate() {
    if (this.state.win || this.state.lose) {
      clearInterval(this.time)
    }
    //object destructuring so I don't have to keep typing this.state.
    const { firstFlip, secondFlip, cards, turn } = this.state;
    if (firstFlip != null && secondFlip !== null) {
      if (cards[firstFlip].image === cards[secondFlip].image) {
        this.setState({
          firstFlip: null,
          secondFlip: null,
          message: "It's a match"
        });
      } else if (cards[firstFlip].image !== cards[secondFlip].image) {
        setTimeout(() => {
          let newCards = this.state.cards;
          newCards[firstFlip].flipped = false;
          newCards[secondFlip].flipped = false;
          this.setState({
            cards: newCards,
            firstFlip: null,
            secondFlip: null,
            turn: turn - 1,
            message:
              "Match the cards to win the game! Run out of lives and you lose..."
          });
        }, 1000);
      }
    }
  }

  ResetButton = () => {
    window.location.reload(false);
  };

  flipHandler = index => {
    if (this.state.turn === 0) {
      return;
    } else {
      if (this.state.firstFlip === null) {
        let newCards = this.state.cards;
        newCards[index].flipped = true;
        this.setState({ cards: newCards, firstFlip: index, timer: true });
      } else if (this.state.secondFlip === null) {
        let newCards = this.state.cards;
        newCards[index].flipped = true;
        if (this.state.turn === 1) {
          this.setState({ lose: true });
          
        }
        this.setState({ cards: newCards, secondFlip: index });
      }
    }

    this.winningLogic()
  };

  winningLogic = () => {
    let cardState = this.state.cards;
    this.setState({ win: cardState.every(x => x.flipped === true) })
    if (this.state.turn === 10) {
      this.time = setInterval(() => {
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        this.setState({ seconds: seconds, minutes: minutes });
      }, 1000);
    }
  };

  render() {
    return (
      <div className="app">
        {this.state.loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Turn
              turn={this.state.turn}
              minutes={this.state.minutes}
              seconds={this.state.seconds}
            />
            <div className="main">
              {this.state.cards.map((card, index) => {
                return (
                  <Card
                    key={index}
                    image={card.image}
                    flipped={card.flipped}
                    click={() => this.flipHandler(index)}
                  />
                );
              })}
            </div>
            <p>{this.state.message}</p>
            <Reset reset={this.ResetButton} />
            <div className="winlose">
              {this.state.win ? <Win /> : null}
              {this.state.lose ? <Lose /> : null}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
