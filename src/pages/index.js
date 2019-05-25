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
          turnCount:0,
          gameEnd:false,
          winner:null,
          player1Wins:0,
          player2Wins:0
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
        this.gameEnd = this.gameEnd.bind(this);
        this.rematch = this.rematch.bind(this);
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
        this.setState({goal:setGoal})
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
              this.calcPlayerScore(this.state.player1, this.state.player1Rolls);
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
              this.calcPlayerScore(this.state.player2, this.state.player2Rolls);
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
      let {
        player1, 
        player2, 
        player1Score, 
        player2Score} = this.state
      let total = 0;
      for (let i = 0; i < playerRolls.length; i++) {
        total += playerRolls[i];
      }
      console.log(`Current total: ${total}`)
      if(player === player1){
          console.log("HERE1")

        this.setState(prevState=> {
          prevState.player1Score+=total
          return prevState;
        }, ()=> {
          console.log("after calc score p1", this.state)
         return this.checkWin(this.state.player1, this.state.player1Score)
        })
      }
     else{
          console.log("HERE1")

        this.setState(prevState=> {
          prevState.player2Score+=total
          return prevState;
        }, ()=> {
          console.log("after calc score p2", this.state)


          return this.checkWin(this.state.player2, this.state.player2Score)
        })
      }
    }
    checkWin(player, playerScore){
      console.log(`checkWin parameters player${player} playerScore${playerScore}` )
      const {goal} = this.state
      console.log(`CheckingWin ${player}:${playerScore}>=${goal}?`)

      if (playerScore >= goal) {
      console.log(`${player} wins`)
     
      
          
         setTimeout(this.gameEnd(player), 1400);
      }
    }
    gameEnd(player){
      window.alert(`${player} wins! play again?`) 
      this.setState({gameEnd: true, winner: player})
    }
    rematch(){
      const resetGoal = window.confirm("would you like to reset the goal?")

      const {winner, player1} = this.state
      if(player1 === winner){
        this.setState(prevState =>{
          if(resetGoal){
            this.whereIsGoal()
          }
          prevState.player1Wins++
          prevState.player1Rolls = []
          prevState.player2Rolls = []
          prevState.player1Score = 0
          prevState.player2Score = 0
          prevState.currentPlayer = null
          prevState.die1 = 0
          prevState.die2 = 0
          prevState.turnCount = 0
          prevState.gameEnd = false
          prevState.winner = null
          return prevState
        })
      }
      else{
        this.setState(prevState =>{
          if(resetGoal){
            this.whereIsGoal()
          }

          prevState.player2Wins++
          prevState.player1Rolls = []
          prevState.player2Rolls = []
          prevState.player1Score = 0
          prevState.player2Score = 0
          prevState.currentPlayer = null
          prevState.die1 = 0
          prevState.die2 = 0
          prevState.turnCount = 0
          prevState.gameEnd = false
          prevState.winner = null
          return prevState
        })
      }
    }
    restart(){
      window.location.reload()
    }
    render() {
      const {
        startGame,
        handleStartGame,
        rollDice,
        rematch,
        restart
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
        player2Score, 
        gameEnd,
        player1Wins,
        player2Wins
        
      } = this.state 

      console.log("index state", this.state)
      return (
        <div>
        { toggleGameboard === true ? 
          <GameBoard 
            player2Wins = {player2Wins}
            player1Wins = {player1Wins}
            gameEnd = {gameEnd}
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
            rematch = {rematch}
            restart = {restart}
          /> :
          <ReachTheGoal 
            handleClick={handleStartGame}
          />  }

        </div>
      )
    }
  }

export default IndexPage
