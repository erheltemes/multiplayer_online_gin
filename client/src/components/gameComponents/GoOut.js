import React from "react";
import { useGameContext } from "../../context/GameContext"

function GoOut() {
  const { gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState 
  } = useGameContext()

  const handleGoOut = () => {
    gameState.playerAction = "declareSets"
    setGameState({...gameState})
  }

  // DISPLAY
  const style = {
    container: {
      display: "flex",
      justifyContent: "center"
    },
    goOut: {
      margin: "10px",
      border: "black 1px solid",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100px",
      backgroundColor: "rgb(100, 200, 100)"
    }
  }

  return (
    <div style={style.container}>
      {gameState.action === playerState.number && gameState.playerAction === "play" ? (
        <div 
          style={style.goOut}
          onClick={handleGoOut}
        >
          Go Out
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default GoOut
