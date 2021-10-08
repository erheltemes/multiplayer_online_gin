import React from "react";
import { useGameContext } from "../../context/GameContext"

function CurrentPlayerBanner() {
  const { gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState 
  } = useGameContext()

  //DISPLAY
  const playerNum = playerState.number.replace("player", "")

  return (
    <h1>Current Player: {playerNum}</h1>
  )
}

export default CurrentPlayerBanner
