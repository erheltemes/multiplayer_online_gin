import React, { useEffect, useState, createContext, useContext } from "react";
import { useSocketContext } from "./SocketContext"

const GameContext = createContext();

//DECK BUILDER
class Deck {
  constructor() {
    this.deck = [];

    const suits = ['\u2665', '\u2660', '\u2663', '\u2666'];
    const numbers = [1, 1, 1, 1, 1] //2, 3, 4, 5, 6]
    // 7, 8, 9, 10, 11, 12, 13];

    suits.forEach(suitVal => {
      numbers.forEach(numberVal => {
        let displayVal = numberVal
        if (numberVal === 1) { displayVal = "A" }
        if (numberVal === 11) { displayVal = "J" }
        if (numberVal === 12) { displayVal = "Q" }
        if (numberVal === 13) { displayVal = "K" }
        this.deck.push({
          suit: suitVal,
          number: numberVal,
          display: displayVal,
        })
      })
    })
  }
}

export function useGameContext() {
  return useContext(GameContext)
}

export const GameProvider = ({ playerNum, children }) => {
  const socket = useSocketContext()
  const [gameState, setGameState] = useState({
    deck: [],
    discard: [],

    action: "set-up", //"ready-to-deal", "player1", "player2", "force-quit", "game-ended"
    playerAction: "play", // "discard", "declareSets", "finalDraw", "responseSets", "none"
    score: {
      player1: null,
      player2: null 
    },
  })
  const [playerState, setPlayerState] = useState({
    number: "player" + playerNum,
    hand: {
      cards: [],
      valid: false
    },
    sets: {
      1: {
        cards: [],
        valid: true
      },
      2: {
        cards: [],
        valid: true
      },     
      3: {
        cards: [],
        valid: true
      },     
      unmatched: {
        cards: [],
        valid: true
      },
    },
  })
  const [draggedCard, setDraggedCard] = useState({ index: null })

  useEffect(() => {
    if (socket == null) return
    console.log(socket)

    socket.on("receive-state", (newState) => {
      console.log("receive")
      setGameState(newState)
    })

    socket.on("receive-hand", (newHand) => {
      setPlayerState(newHand)
    })

    socket.on("force-quit", () => {
      gameState.action = "force-quit"
      setGameState({...gameState})
    })

    // return () => socket.off("receive_state")
  }, [socket])

  //DEAL CARDS 
  useEffect(() => {
    if (socket == null) return
    // if (player === "1") return
    console.log(socket)
    const newState = {...gameState}
    newState.action = "ready-to-deal"
    updateGameState(newState) 
  }, [socket])

  // DEAL
  function dealCards () {
    const newDeck = new Deck()
    const hand1 = []
    const hand2 = []

    for (var i = 0; i < 6; i++) {
      let randomNumber = (Math.floor(Math.random()*newDeck.deck.length))
      let dealtCard = newDeck.deck.splice(randomNumber, 1)
      hand1.push(dealtCard[0])
    }  

    for (let i = 0; i < 6; i++) {
      let randomNumber = (Math.floor(Math.random()*newDeck.deck.length))
      let dealtCard = newDeck.deck.splice(randomNumber, 1)
      hand2.push(dealtCard[0])
    }

    // console.log(hand1)
    // console.log(hand2)
    // console.log(newDeck)

    playerState.hand.cards = hand1
    console.log(playerState.hand.cards)
    setPlayerState({...playerState})

    const newState = {...gameState} 
    newState.deck = newDeck.deck
    newState.action = "player2"
    updateGameState({...newState})

    const player2State = {
      number: "player2",
      hand: {
        cards: hand2,
        valid: false
      },
      finishedPlay: false,
      sets: {
        1: {
          cards: [],
          valid: true
        },
        2: {
          cards: [],
          valid: true
        },     
        3: {
          cards: [],
          valid: true
        },     
        unmatched: {
          cards: [],
          valid: true
        },
      },
      action: "play" // "discard", "declareSets"
    }
    updatePlayerState({...player2State})
  }

  function updateGameState(newState) {
    socket.emit("send-state", newState)
  }

  function updatePlayerState(newHand) {
    socket.emit("send-hand", newHand)
  }

  return (
    <GameContext.Provider value={
      {
        gameState, updateGameState,
        playerState, setPlayerState,
        draggedCard, setDraggedCard,
        dealCards, setGameState
      }
    }>
      {children}
    </GameContext.Provider>
  );
};

