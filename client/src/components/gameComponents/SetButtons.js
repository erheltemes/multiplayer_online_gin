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
    let scoreCount = playerState.sets.unmatched.cards.reduce((a, b) => { return a + b.number }, 0)

    //if player who went out has a score of zero.
    if (gameState.playerAction === "declareSets" && scoreCount === 0) {
      scoreCount = "Gin"
    }

    gameState.score[playerState.number] = scoreCount

    if (gameState.playerAction === "responseSets") {
      gameState.action = "game-ended"
      gameState.playerAction = "none"
    } else {
      if (gameState.action === "player2"){
        gameState.action = "player1"
      } else {
        gameState.action = "player2"
      }
      gameState.playerAction = "responseSets"
    }

    playerState.finshedPlay = true
    setPlayerState({...playerState})
    updateGameState({ ...gameState })
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

    setGameState({ ...gameState })
    setPlayerState({ ...playerState })
  }

  const submitSetsValidation = () => {
    //check all location's validity
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

  const ConditionalRender = () => {
    if (gameState.action === playerState.number) {
      if (gameState.playerAction === "declareSets") {
        return (
          <div style={style.container}>
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
          </div>
        )
      } if (gameState.playerAction === "responseSets") {
        return (
          <div style={style.container}>
            <div
              style={style.submitSets}
              onClick={handleSubmitSets}
            >
              Submit Sets
            </div>
          </div>
        )
      }
    }
    return (
      <></>
    )
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
    <div >
      <ConditionalRender/>
    </div>
  )
}

export default SetButtons
