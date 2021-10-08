import React from "react";
import { useGameContext } from "../../context/GameContext"

function WaitingForGameEnd() {
  const { gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState
  } = useGameContext()

  const status = () => {
    const score = gameState.score[playerState.number] 
    if (score !== "Gin") {
      return score + " points!"
    }
    return score
  }



  //DISPLAY

  const style = {

  }

  return (
    <div >
      <h1>Waiting For Game End</h1>
      <h2>You went out with {status()}</h2>
    </div>
  )
}

export default WaitingForGameEnd
