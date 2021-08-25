import React, { useEffect, useState, createContext, useContext } from "react";
import { useSocketContext } from "./SocketContext"

const GameContext = createContext();

//DECK BUILDER
class Deck {
  constructor() {
    this.deck = [];

    const suits = ['\u2665', '\u2660', '\u2663', '\u2666'];
    const numbers = [1, 2, 3, 4, 5, 6, 7,]
    // 8, 9, 10, 11, 12, 13];

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

    action: "set-up", //"ready-to-deal", "1", "2", "force-quit", "game-ended"
    score: {
      player1: 0,
      player2: 0
    },
  })
  const [playerState, setPlayerState] = useState({
    number: playerNum,
    hand: [],
    sets: [[], [], [], []],
    action: "play" // "discard", "declareSets"
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

    for (var i = 0; i < 10; i++) {
      let randomNumber = (Math.floor(Math.random()*newDeck.deck.length))
      let dealtCard = newDeck.deck.splice(randomNumber, 1)
      hand1.push(dealtCard[0])
    }  

    for (let i = 0; i < 10; i++) {
      let randomNumber = (Math.floor(Math.random()*newDeck.deck.length))
      let dealtCard = newDeck.deck.splice(randomNumber, 1)
      hand2.push(dealtCard[0])
    }

    playerState.hand = hand1
    setPlayerState({...playerState})

    const newState = {...gameState} 
    newState.deck = newDeck.deck
    newState.action = "2"
    updateGameState({...newState})

    const player2State = {...playerState}
    player2State.hand = hand2
    player2State.number = "2"
    player2State.action = "play"
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
        dealCards
      }
    }>
      {children}
    </GameContext.Provider>
  );
};

