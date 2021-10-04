import React from "react";
import Card from "./Card";
import { useGameContext } from "../../context/GameContext"

function DraggableCard({ index, card, location }) {
  const {
    gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState
  } = useGameContext()

  const handleDraggedCard = (e) => {
    setDraggedCard({
      index: e.target.getAttribute("value"),
      location: e.target.getAttribute("location")
    })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    //if dragged card is not in the same location do not trigger
    if (e.currentTarget.getAttribute("location") !== draggedCard.location) return

    //remove dragged card based on ref and index
    const draggedCardLocationArr = draggedCard.location.split(".")
    let draggedCardSchema = playerState
    draggedCardLocationArr.forEach(ref => {
      draggedCardSchema = draggedCardSchema[ref]
    })
    const movedCard = draggedCardSchema.splice(draggedCard.index, 1)[0]

    //place card in target location
    const newIndex = e.currentTarget.getAttribute("value")
    const newLocation = e.currentTarget.getAttribute("location")
    let currentLocationArr = newLocation.split(".")
    let currentLocationSchema = playerState
    currentLocationArr.forEach(ref => {
      currentLocationSchema = currentLocationSchema[ref]
    })
    currentLocationSchema.splice(newIndex, 0, movedCard)

    //Preform checks if we are in declareSets State
    if (gameState.playerAction === "declareSets") {
      //Check Hand
      console.log(playerState.hand.cards.length)
      if (playerState.hand.cards.length !== 0) {
        playerState.hand.valid = false
      } else {
        playerState.hand.valid = true
      }

      //Check Unmatched
      let totalValue = playerState.sets.unmatched.cards.reduce((a,b) => {
        return a + b.number
      }, 0)
      if (totalValue > 10){
        playerState.sets.unmatched.valid = false
      } else {
        playerState.sets.unmatched.valid = true
      }
      
      //Check Sets
      //Check all 3
      for (let i = 1; i < 4; i++) {
        let cards = playerState.sets[i].cards
        //has at least 3 cards
          if (cards.length > 2) {

          const isPair = () => {
            for (let i = 1; i < cards.length; i++) {
              //retruns false is display values are not equal
              if (cards[i-1].display !== cards[i].display) {
                return false
              }
            }
            return true
          }

          const isRun = () => {
            for (let i = 1; i < cards.length; i++) {
              //returns false if suits are not equal
              if (cards[i-1].suit !== cards[i].suit) {
                return false
              }
              //returns false if values are not consectutive
              if (cards[i-1].number !== cards[i].number - 1) {
                return false
              }
            }
            return true
          }

          //is a pair or run
          if (isPair() || isRun()) {
            playerState.sets[i].valid = true
          } else {
            playerState.sets[i].valid = false
          }
        } else if (cards.length === 0) {
          playerState.sets[i].valid = true
        }  else {
          playerState.sets[i].valid = false
        }
      }

    }

    //set state, and dragged card to reference its new spot 
    setPlayerState({ ...playerState })
    setDraggedCard({
      index: newIndex,
      location: newLocation
    })
  }

  //DISPLAY
  const style = {
    draggableCard: {
      cursor: "move",
    }
  }

  return (
    <div
      style={style.draggableCard}
      value={index}
      location={location}
      draggable={true}
      onDragStart={handleDraggedCard}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
    >
      <Card {...card} />
    </div>
  )
}

export default DraggableCard