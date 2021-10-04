// import React from "react";
// import { useGameContext } from "../../context/GameContext"

// function SortDropZone({index}) {
//   const {
//     gameState, updateGameState,
//     playerState, setPlayerState,
//     draggedCard, setDraggedCard,
//     dealCards, setGameState
//   } = useGameContext()

//   const handleDrop = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     const movedCard = playerState.hand.splice(draggedCard.index, 1)[0]
//     let newIndex = e.target.getAttribute("value")
//     if (draggedCard.index < newIndex) {
//       newIndex--
//     }
//     playerState.hand.splice(newIndex, 0, movedCard)
//     console.log({ ...playerState })
//     setPlayerState({ ...playerState })
//   }

//   //DISPLAY

//   const style = {
//     dropZoneContainer: {
//       width: "120%",
//       height: "120px",
//       position: "absolute",
//       left: "-10%",
//       top: "-10px",
//       display: "flex",
//     },
//     dropZone: {
//       border: "1px solid black",
//       width: "50%"
//     }
//   }

//   return (
//     <div>
//       <div
//         style={style.dropZoneContainer}
//         value={index}
//       >
//         <div style={style.dropZone}
//           value={index}
//           onDrop={handleDrop}
//         />  
//         <div style={style.dropZone}
//           value={index + 1}
//           onDrop={handleDrop}
//         />
//       </div>
//     </div>
//   )
// }

// export default SortDropZone
