import React from "react"
import reachGoalStyles from "./reach-the-goal.module.css"
import Button from "./Button"





    
    const ReachTheGoal= props =>{
      // console.log(reachGoalStyles)
      const {handleClick} = props
      const {background, title, text} = reachGoalStyles;
      return (
        <div className={background}>
        
        <h1 className={title}>Reach The Goal</h1>
        
        <p className={text}>
        How to Play: When the red start Button is clicked users will be prompted to input a whole Positive integer.
       After you submit the prompt, two players with starting score at zero will take turns rolling the dice and add the total to their current score. 
       When the score of the respected player is greater than or equal to the goal chosen at the start of the game, then that player wins.
        Click the start button to begin!</p>
        <Button
        handleClick = {handleClick}
        >
        Press to start
        </Button>
        </div>
      )
    }
  

  export default ReachTheGoal