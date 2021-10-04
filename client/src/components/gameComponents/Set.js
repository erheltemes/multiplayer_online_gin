import React from "react";
import { useGameContext } from "../../context/GameContext"
import { useMediaQuery } from "react-responsive"

import DraggableCard from "./DraggableCard"
import CardContainer from "./CardContainer";
import Card from "./Card"

function Set({name, container}) {
  const {
    gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState
  } = useGameContext()

  // DISPLAY

  const mediaQuery = useMediaQuery({ query: '(max-width: 1022px)' })
  const set = playerState.sets[container]

  const determineSetWidth = (ref) => {
    if (ref.length === 0) return "112px"
    if (mediaQuery) {
      return `${Math.ceil(ref.length / 2) * 90 + 22}px`
    }
    return `${ref.length * 90 + 22}px`
  }

  const style = {
    setContainer: {
      margin: "10px auto",
      // border: "solid 1px black",
    },
    cardHolder: {
      margin: "10px",
    },
  }

  return (
    <div
      style={style.setContainer}
    >
      <h6>{name}</h6>
      <CardContainer
        width={determineSetWidth(set.cards)}
        location={`sets.${container}.cards`}
      >
        {set.cards.length ? (
          <>
            {set.cards.map((card, index) => (
              <div
                style={style.cardHolder}
                key={index}
              >
                <DraggableCard
                  index={index}
                  card={card}
                  location={`sets.${container}.cards`}
                />
              </div>
            ))}
          </>
        ) : (
          <div
            style={style.cardHolder}
          >
            <Card display="Add Here" suit="" />
          </div>
        )}
      </CardContainer>
    </div>

  )
}

export default Set
