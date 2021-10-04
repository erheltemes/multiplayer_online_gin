import React from "react";
import { useGameContext } from "../../context/GameContext"
import Card from "./Card"

function DiscardPile() {
  const {
    gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState
  } = useGameContext()

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    const movedCard = playerState.hand.cards.splice(draggedCard.index, 1)[0]
    gameState.discard.unshift(movedCard)

    //retrun to "play" state becasue card was discarded
    gameState.playerAction = "play"

    //Passes Turn
    if (playerState.number === "1") {
      gameState.action = "2"
    } else {
      gameState.action = "1"
    }

    updateGameState({ ...gameState })
    setPlayerState({ ...playerState })
    setDraggedCard({ index: null })
  }

  const handleDraw = () => {
    const movedCard = gameState.discard.splice(0, 1)[0]

    gameState.playerAction = "discard"
    playerState.hand.cards.push(movedCard)

    setGameState({ ...gameState })
    setPlayerState({ ...playerState })
  }

  //DISPLAY 

  const ConditionalContainer = ({ children }) => {
    //If player's turn
    if (gameState.action === playerState.number) {
      //If 10 card's in Hand and discard not empty
      if (gameState.playerAction === "play" && gameState.discard.length !== 0) {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={handleDraw}
          >
            {children}
          </div>
        )
      } 
      if (gameState.playerAction === "discard") {
        return (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {children}
          </div>
        )
      }
    }

    return (
      <div>
        {children}
      </div>
    )

  }

  const style = {
    discardPile: {
      margin: "10px"
    }
  }

  return (
    <div style={style.discardPile}>
      <ConditionalContainer>
        {gameState.discard.length ? (
          <div>
            <Card
              {...gameState.discard[0]}
            />
          </div>
        ) : (
          <Card
            display="Discard Empty"
            suit=""
          />
        )}
      </ConditionalContainer>
    </div>
  )
}

export default DiscardPile
