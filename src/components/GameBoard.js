import React from "react"
import gameBoardStyles from "./gameboard.module.css"

const { 
	background,
 	scoreBoard,
 	player,
 	goalBox,
 	diceBox,
 	playerInfoBox,
 	container,
 	die 
 } = gameBoardStyles

const ScoreBoard = props => {
	const { children, player1, player2, goal } = props
	console.log(props)
	return (
		<div className={scoreBoard}>
			<div className={player}>
				<h3>{player1}</h3>
			</div>
			<div className={goalBox}>
				<h3>The Goal</h3>
				<h3>{goal}</h3>
			</div>
			<div className={player}>
				<h3>{player2}</h3>
			</div>
		</div>
	)
}
const Dice = props => {
	const {die1, die2} = props
	return (
		<div className={diceBox}>
			<div className={die}>
				{die1}
			</div>
			<div className={die}>
				{die2}
			</div>
		</div>
		)
}
const PlayerInfo = props =>{
	const {playerRolls, player}= props
	return(
		<div className={playerInfoBox}>
			<h1>{player}</h1>
			{playerRolls.map((roll, key)=>{
				return(
					<li key={key}>{roll}</li>
					)
			})}
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
        player2Rolls 
	} = props
	return (
		<div className={background}>
			<ScoreBoard 
				player1={player1} 
				player2={player2} 
				goal={goal} 
			/>
			<div className = {container}>
				<PlayerInfo
					player = {player1}
					playerRolls= {player1Rolls}
				/>
				<Dice 
					die1 = {die1}
	           		die2 = {die2}
				/>
				<PlayerInfo
					player = {player2}
            		playerRolls= {player2Rolls}
				/>
			</div>
		
		</div>
	)
}
export default GameBoard
