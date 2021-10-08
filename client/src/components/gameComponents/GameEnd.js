import React from "react";
import { useGameContext } from "../../context/GameContext"

function GameEnd() {
  const { gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState
  } = useGameContext()

  const winningPlayer = () => {
    const p1Score = gameState.score.player1
    const p2Score = gameState.score.player2

    if (p1Score === "Gin") {
      return {
        player: "Player 1",
        score: p2Score + 25
      }
    } if (p2Score === "Gin") {
      return {
        player: "Player 2",
        score: p1Score + 25
      }
    } if (p1Score < p2Score) {
      return {
        player: "Player 1",
        score: p2Score - p1Score
      }
    } if (p2Score < p1Score) {
      return {
        player: "Player 2",
        score: p1Score - p2Score
      }
    }
    return {
      player: "Tie"
    }
  }



  //DISPLAY

  const style = {

  }

  return (
    <div >
      <h1>GameEnd</h1>
      {winningPlayer().player === "tie" ? (
        <h2>Ended in a Tie!</h2>
      ) : (
        <h2> {winningPlayer().player} has won with {winningPlayer().score} points! </h2>
      )}
      <p>Player 1 Score: {gameState.score.player1}</p>
      <p>Player 2 Score: {gameState.score.player2}</p>
    </div>
  )
}

export default GameEnd
