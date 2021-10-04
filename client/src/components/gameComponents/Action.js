import React from "react";
import { useGameContext } from "../../context/GameContext"

//DISPLAYS "action" and "playerAction", Also renders Deal button
function Action() {
  const { gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState 
  } = useGameContext()

  return (
    <div className="action">
      <p>{gameState.action}</p>
      <p>{gameState.playerAction}</p>
      {gameState.action === "ready-to-deal" && playerState.number === "1" ? (
        <button onClick={dealCards}>DEAL</button>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Action
