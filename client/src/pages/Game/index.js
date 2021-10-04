import React, {  useEffect, } from "react";
import { useParams } from 'react-router-dom';

import Game from '../../components/gameComponents/Game'

import { GameProvider } from "../../context/GameContext"
import { SocketProvider } from "../../context/SocketContext"

//GAME FUNCTION
function GamePage() {
  const { room_id, current_player } = useParams()

  useEffect(() => {

  }, [])

  //DISPLAY

  return (
    <SocketProvider id={room_id}>
      <GameProvider playerNum={current_player}>
        <Game />
      </GameProvider>
    </SocketProvider>
  );
}

export default GamePage;
