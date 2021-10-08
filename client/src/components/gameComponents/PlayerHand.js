import React from "react";
import { useMediaQuery } from "react-responsive"
import { useGameContext } from "../../context/GameContext"

import Card from "./Card"
import CardContainer from "./CardContainer";
import DraggableCard from "./DraggableCard"

function PlayerHand() {
  const {
    gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
    dealCards, setGameState
  } = useGameContext()

  //DISPLAY

  // const ConditionalContainer = () => {
  //   if (playerState.hand.cards.length !== 0) {
  //     return (
  //       <CardContainer
  //         width={determineWidth()}
  //         location={"hand.cards"}
  //       >
  //         {playerState.hand.cards.map((card, index) => (
  //           <div
  //             style={style.cardHolder}
  //             key={index}
  //           >
  //             <DraggableCard
  //               index={index}
  //               card={card}
  //               location={"hand.cards"}
  //             />
  //           </div>
  //         ))}
  //       </CardContainer>
  //     )
  //   }
  // }

  const mediaQuery = useMediaQuery({ query: '(max-width: 1022px)' })

  const determineWidth = () => {
    if (mediaQuery) {
      return `${Math.ceil(playerState.hand.cards.length / 2) * 90 + 22}px`
    }
    return `${playerState.hand.cards.length * 90 + 22}px`
  }

  const style = {
    cardHolder: {
      margin: "10px",
    },
  }

  if (playerState.hand.cards.length !== 0) {
    return (
      <CardContainer
        width={determineWidth()}
        location={"hand.cards"}
      >
        {playerState.hand.cards.map((card, index) => (
          <div
            style={style.cardHolder}
            key={index}
          >
            <DraggableCard
              index={index}
              card={card}
              location={"hand.cards"}
            />
          </div>
        ))}
      </CardContainer>
    )
  }
  if (gameState.playerAction === "declareSets" || gameState.playerAction === "responseSets") {
    return (
      <CardContainer
        width={112}
        location={"hand.cards"}
      >
        <div
          style={style.cardHolder}
        >
          <Card display="Add Here" suit="" />
        </div>
      </CardContainer>
    )
  }
  return (
    <></>
  )
}

export default PlayerHand
