// import React, { useState, useEffect, useContext } from "react";
// import API from "../../utils/API";

// function EndGame () {
//   // const {roomData, gameState, playerState, playerOne, setPlayerOne, playerTwo, setPlayerTwo, currentPlayer} = useContext(GameContext)

//   function saveAndReturn() {
//     if (gameState.winner === roomData.playerOneId) {
//       API.updateGame(roomData.roomId, {
//         score: gameState.finalResult,
//         isActiveGame: false
//       }).then(() =>
//         API.updateUser(roomData.playerOneId, {
//           $push: { history: roomData.roomId },
//           $inc: { numberOfWins: 1}
//         }).then(() =>
//           API.updateUser(roomData.playerTwoId, {
//             $push: { history: roomData.roomId },
//             $inc: { numberOfLosses: 1 }
//           }).then(() => window.location.replace('/options/' + roomData.playerTwoId)) 
//         )
//       )
//     } else {
//       API.updateGame(roomData.roomId, {
//         score: gameState.finalResult,
//         isActiveGame: false
//       }).then(() =>
//         API.updateUser(roomData.playerOneId, {
//           $push: { history: roomData.roomId },
//           $inc: { numberOfLosses: 1}
//         }).then(() =>
//           API.updateUser(roomData.playerTwoId, {
//             $push: { history: roomData.roomId },
//             $inc: { numberOfWins: 1 }
//           }).then(() => window.location.replace('/options/' + roomData.playerTwoId)) 
//         )
//       )
//     }
//   }

//   function returnHome() {
//     window.location.replace('/options/' + roomData.playerOneId)
//   }

//   return (
//     <div className="game-content">
//       <h2>Game Over</h2>
//       <p>{gameState.finalResult}</p>
//       {playerState === 1 ? (<button onClick={returnHome}>Return Home</button>) : (<button onClick={saveAndReturn}>Save Game and Return Home</button>) }  
//     </div>
//   )
// }

// export default EndGame