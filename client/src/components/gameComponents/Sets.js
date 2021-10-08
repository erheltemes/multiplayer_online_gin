import React from "react";
import { useGameContext } from "../../context/GameContext"

import Set from "./Set"
import SetButtons from "./SetButtons"

function Sets() {
  const {
    gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState
  } = useGameContext()

  // DISPLAY

  const style = {
    setsContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      margin: "10px auto",
      border: "solid 1px black",
      backgroundColor: `rgb(245, 245, 255)`,
    }
  }

  return (
    <div>
      {gameState.action === playerState.number && gameState.playerAction === "declareSets" || gameState.playerAction === "responseSets" ? (
        <div>
          <div style={style.setsContainer}>
            <Set
              name="Set 1"
              container={1}
            />
            <Set
              name="Set 2"
              container={2}
            />
            <Set
              name="Set 3"
              container={3}
            />
            <Set
              name="Unmatched"
              container={"unmatched"}
            />
          </div>
          <SetButtons />
        </div >
      ) : (
        <></>
      )}
    </div>
  )
}

export default Sets
