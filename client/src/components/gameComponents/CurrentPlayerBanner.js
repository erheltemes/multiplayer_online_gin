import React from "react";
import { useGameContext } from "../../context/GameContext"

function CurrentPlayerBanner() {
  const { gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState 
  } = useGameContext()

  //DISPLAY

  return (
    <h1>Current Player: {playerState.number}</h1>
  )
}

export default CurrentPlayerBanner
