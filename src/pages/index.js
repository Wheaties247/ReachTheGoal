import React from "react"
// import { Link } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import ReachTheGoal from "../components/ReachTheGoal"
import GameBoard from "../components/GameBoard"


class IndexPage extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          toggleGameboard:false,
          player1: "player1",
          player2: "player2",
          player1Rolls: [],
          player2Rolls: [],
          player1Score: 0,
          player2Score: 0,
          currentPlayer: null,
          goal: 0,
          die1: 0,
          die2: 0,
          turnCount:0
        };
        this.startGame = this.startGame.bind(this);
        this.setPlayerName = this.setPlayerName.bind(this);
        this.initializeCurrentPlayer = this.initializeCurrentPlayer.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.whereIsGoal = this.whereIsGoal.bind(this);
        this.rollDice = this.rollDice.bind(this);
        this.diceVal = this.diceVal.bind(this);
        this.setCurrentPlayer = this.setCurrentPlayer.bind(this);
        this.calcPlayerScore = this.calcPlayerScore.bind(this);
        this.checkWin = this.checkWin.bind(this);
    }

    startGame(){
      this.setState(prevState=>{
        prevState.toggleGameboard = !prevState.toggleGameboard
        return prevState;
      })
    }
    initializeCurrentPlayer(){
      console.log("initializeCurrentPlayer")
      const {turnCount, currentPlayer, player1, player2} = this.state
      if(turnCount< 2){

          if (turnCount % 2 === 0) {
            this.setState({currentPlayer: player1}, ()=> this.setPlayerName())
          } 
          else {
            this.setState({currentPlayer: player2}, ()=> this.setPlayerName())
          }
      }
      else{
       this.whereIsGoal()
      }
    }
    randomOnetoSix(){
      return Math.floor(1 + Math.random() * 6);
    }
    whereIsGoal(){
       let setGoal = prompt('Input a Positive number to reach with dice rolls');
      if (isNaN(setGoal)) {
        alert('Please Select A Positive integer');
        this.whereIsGoal()

      } else if (setGoal <= 0) {
        alert('Please Select A Positive integer');
        this.whereIsGoal();


      } else if (!setGoal) {
        alert('Please Select A Positive integer');
        this.whereIsGoal();


      } else {
        setGoal = Number(setGoal);
        // console.log("GOAL IS SET TO " + setGoal);
        // $('#goal').text(`THE GOAL:${setGoal}`);
        this.setState({goal:setGoal})
         // game.currentGoal = setGoal;
        // const dice = document.querySelector('#diceHolder');
        // dice.addEventListener('click', rollDice)
      }
    }
    setPlayerName(){
      console.log("setPlayerName")

          const {currentPlayer, player1, player2, turnCount} = this.state
          const name = prompt(`Please enter ${currentPlayer}'s name!`)
          this.setState(prevState=>{
            prevState.turnCount++
            prevState[currentPlayer] = name
            return prevState

          },()=> this.initializeCurrentPlayer())      
    }
    rollDice(){
      console.log("rollDice")
      this.diceVal();
    }
    setCurrentPlayer(total, die1, die2){
       const {
         currentPlayer, 
         player1, 
         player2, 
         turnCount, 
         player1Rolls, 
         player2Rolls,
       } = this.state
        if (turnCount % 2 === 0) {
              this.setState(prevState=> {
              console.log("player1", this.state)
              prevState.player1Rolls.push(total)
              prevState.currentPlayer = prevState.player1
              prevState.die1 = die1
              prevState.die2 = die2
              prevState.turnCount++
              return prevState
            }, ()=>{
              this.calcPlayerScore(player1, player1Rolls);
            })
        } else {
          this.setState(prevState=> {
              console.log("player2", this.state)
              prevState.player2Rolls.push(total)
              prevState.currentPlayer = prevState.player2
              prevState.die1 = die1
              prevState.die2 = die2
              prevState.turnCount++
              return prevState
            }, ()=>{
              this.calcPlayerScore(player2, player2Rolls);
            })
        }
    }
    diceVal(){
      const {
        die1,
        die2, 
        currentPlayer, 
        player1, 
        player1Rolls, 
        player2Rolls
      } = this.state

      const firstDie = this.randomOnetoSix();
      const secondDie = this.randomOnetoSix();
      const total = firstDie + secondDie;
      console.log("diceVal Check", firstDie, secondDie);
      this.setCurrentPlayer(total, firstDie, secondDie);
      

    }
    handleStartGame(){
      this.initializeCurrentPlayer()
      this.startGame();
    }
    calcPlayerScore(player, playerRolls){
      // const currentRolls = player1Rolls;
      const {player1, player2, player1Score, player2Score} = this.state
      let total = 0;
      for (let i = 0; i < playerRolls.length; i++) {
        total += playerRolls[i];
      }
      if(player === player1){
          console.log("HERE1")

        this.setState(prevState=> {
          prevState.player1Score+=total
          return prevState;
        }, ()=> {
          console.log("HERE")
          this.checkWin(player1, player1Score)
        })
      }
      if(player === player2){
          console.log("HERE1")

        this.setState(prevState=> {
          prevState.player2Score+=total
          return prevState;
        }, ()=> {
          console.log("HERE")

          this.checkWin(player2, player2Score)
        })
      }
    }
    checkWin(player, playerScore){

      const {goal} = this.state
      console.log(`CheckingWin ${playerScore}>=${goal}?`)

      if (playerScore >= goal) {
      console.log(`${player} wins`)

        const playAgain = confirm(`${player} wins! play again?`);
      }
    }
    render() {
      const {
        startGame,
        handleStartGame,
        rollDice
      } = this
      const {
        toggleGameboard, 
        player1, 
        player2, 
        goal, 
        die1, 
        die2,
        player1Rolls,
        player2Rolls,
        currentPlayer,
        player1Score,
        player2Score
        
      } = this.state 

      console.log("index state", this.state)
      return (
        <div>
        { toggleGameboard === true ? 
          <GameBoard 
            player1 = {player1} 
            player2 = {player2}
            goal = {goal}
            die1 = {die1}
            die2 = {die2}
            player1Rolls= {player1Rolls}
            player2Rolls= {player2Rolls}
            rollDice = {rollDice}
            currentPlayer = {currentPlayer}
            player1Score={player1Score}
            player2Score={player2Score}
          /> :
          <ReachTheGoal 
            handleClick={handleStartGame}
          />  }

        </div>
      )
    }
  }

export default IndexPage
