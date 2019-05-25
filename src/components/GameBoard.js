import React from "react"
import gameBoardStyles from "./gameboard.module.css"
import Button from './Button'
const { 
	background,
 	scoreBoard,
 	player,
 	goalBox,
 	diceBox,
 	playerInfoBox,
 	container,
 	die,
 	diceText,
 	restartBox
 } = gameBoardStyles

const ScoreBoard = props => {
	const { 
		children, 
		player1, 
		player2, 
		goal,
		player2Wins,
        player1Wins
         } = props
	console.log(props)
	return (
		<div className={scoreBoard}>
			<div className={player}>
				<h3>{player1}'s Past Wins</h3>
				<h2>{player1Wins}</h2>
			</div>
			<div className={goalBox}>
				<h4>The Goal</h4>
				<h3>{goal}</h3>
			</div>
			<div className={player}>
				<h3>{player2}'s Past Wins</h3>
				<h2>{player2Wins}</h2>
			</div>
		</div>
	)
}
const Dice = props => {
	const {die1, die2, rollDice} = props
	return (
		<div 
		className = {diceBox}
		onClick = {rollDice}
		>
			<div className={die}>
				{die1}
			</div>
			<div className={die}>
				{die2}
			</div>
			<h3 className={diceText}>
			Click to roll Dice
			</h3>
		</div>
		)
}
const PlayerInfo = props =>{
	const {playerRolls, player, currentPlayer, score}= props
	const indiactor = player === currentPlayer? "active": null
	return(
		<div className= {indiactor}>
			<div className={playerInfoBox}>
				<h2>{player}'s score {score}</h2>
				<h5>{player}'s rolls</h5>
				{playerRolls.map((roll, key)=>{
					return(
						<li key={key}>{roll}</li>
						)
				})}
			</div>
		</div>
		)
}
const GameBoard = props => {
	const { 
		player1, 
		player2, 
		children, 
		goal, 
		die1, 
		die2,
		player1Rolls,
        player2Rolls,
        rollDice,
        currentPlayer, 
        active,
        player1Score,
        player2Score,
        gameEnd,
        rematch,
        restart,
        player1Wins,
        player2Wins
	} = props
	return (
		<div className={background}>
			<ScoreBoard 
				player1={player1} 
				player2={player2} 
				goal={goal} 
				player2Wins = {player2Wins}
            	player1Wins = {player1Wins}
			/>
			<div className = {container}>
				<PlayerInfo
					score={player1Score}
					player = {player1}
					playerRolls= {player1Rolls}
					currentPlayer = {currentPlayer}
				/>
				<Dice 
					rollDice = {rollDice}
					die1 = {die1}
	           		die2 = {die2}
				/>
				<PlayerInfo
					score={player2Score}
					player = {player2}
            		playerRolls= {player2Rolls}
            		currentPlayer = {currentPlayer}
				/>
				
			</div>
			{gameEnd? <div className={restartBox}>
					<Button 
					handleClick={rematch}
					>
					Rematch
					</Button>
					<Button 
					handleClick={restart}
					>
					Restart
					</Button>	
			</div>: null}
		</div>
	)
}
export default GameBoard
