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
          goal: 0,
          die1: 0,
          die2: 0
        };
        this.startGame = this.startGame.bind(this);
    }
    startGame(){
      this.setState(prevState=>{
        prevState.toggleGameboard = !prevState.toggleGameboard
        return prevState;
      })
    }
    
    render() {
      const {startGame} = this
      const {
        toggleGameboard, 
        player1, 
        player2, 
        goal, 
        die1, 
        die2,
        player1Rolls,
        player2Rolls
      } = this.state 

      
      return (
        <div>
        { toggleGameboard ===true ? 
          <GameBoard 
            player1 = {player1} 
            player2 = {player2}
            goal = {goal}
            die1 = {die1}
            die2 = {die2}
            player1Rolls= {player1Rolls}
            player2Rolls= {player2Rolls}

          /> :
          <ReachTheGoal handleClick={startGame}/>  }

        </div>
      )
    }
  }

export default IndexPage
// <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link>
//   </Layout>