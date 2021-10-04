import React from "react";
import { useGameContext } from "../../context/GameContext"

function SetButtons() {
  const {
    gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState
  } = useGameContext()

  const handleSubmitSets = () => {
    console.log(gameState)
    const scoreCount = playerState.sets.unmatched.cards.reduce((a, b) => {return a + b.number}, 0)
    if (gameState.action === "1") {
      gameState.score.player1 = scoreCount
      gameState.action = "2"
      gameState.playerAction = "declareSets"
    }
    else if (gameState.action === "2") {
      gameState.score.player2 = scoreCount
      gameState.action = "1"
      gameState.playerAction = "declareSets"
    }
    updateGameState({...gameState})
  }

  const handleReturnToDraw = () => {
    for (let i = 1; i < 4; i++) {
      playerState.hand.cards = playerState.hand.cards.concat(playerState.sets[i].cards)
      console.log(playerState.hand)
      playerState.sets[i].cards = []
    }
    playerState.hand.cards = playerState.hand.cards.concat(playerState.sets.unmatched.cards)
    playerState.sets.unmatched.cards = []

    gameState.playerAction = "play"
    for (let i = 1; i < 4; i++) {
      playerState.sets[i].valid = true
    }
    playerState.sets.unmatched.valid = true
    playerState.hand.valid = false

    setGameState({...gameState})
    setPlayerState({ ...playerState })
  }

  const submitSetsValidation = () => {
    //check all location's validity
    //IF OTHER PLAYER WENT OUT
    if (gameState.score.player1)
    //iterate through sets 
    for (let i = 1; i < 4; i++) {
      if (!playerState.sets[i].valid) return false
    }
    if (!playerState.sets.unmatched.valid) return false
    if (!playerState.hand.valid) return false
    return true
  }

  // DISPLAY
  const submitSetsColor = () => {
    if (submitSetsValidation()) {
      return "rgb(100, 200, 100)"
    }
    return "rgb(211,211,211)"
  }

  const submitSetsCursor = () => {
    if (submitSetsValidation()) {
      return "pointer"
    }
    return "default"
  } 

  const style = {
    container: {
      display: "flex",
      justifyContent: "center"
    },
    submitSets: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "10px",
      border: "black 1px solid",
      borderRadius: "5px",
      cursor: submitSetsCursor(),
      width: "100px",
      backgroundColor: submitSetsColor()
    },
    returnToDraw: {
      margin: "10px",
      border: "black 1px solid",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100px",
      backgroundColor: "rgb(173,216,230)"
    }
  }

  return (
    <div style={style.container}>
      {gameState.action === playerState.number && gameState.playerAction === "declareSets" ? (
        <>
          <div
            style={style.returnToDraw}
            onClick={handleReturnToDraw}
          >
            Return To Draw
          </div>
          <div
            style={style.submitSets}
            onClick={handleSubmitSets}
          >
            Submit Sets
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default SetButtons
