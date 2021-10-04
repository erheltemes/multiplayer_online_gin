import React from "react";

function Card({ display, suit }) {
  //DISPLAY

  //Checks if card is epty discard display
  const findFontSize = () => {
    if (display === 'Discard Empty') return "1rem"
    return "1.5rem"
  }

  //Checks for heart of Diamond
  const colorFind = () => {
    if (suit === '\u2665' || suit === '\u2666') return "red"
    return "black"
  }

  const backgroundColor = () => {
    if (display === 'Deck') return "lightblue"
    return "white"
  }

  const cardStyle = {
    border: "solid 1px black",
    borderRadius: "5px",
    width: "70px",
    height: "100px",
    // margin: "0px 10px",
    padding: "10px",
    lineHeight: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: backgroundColor(),
  }

  const displayStyle = {
    fontSize: findFontSize(),
    color: colorFind()
  }

  const suitStyle = {
    fontSize: "2rem",
    color: colorFind()
  }

  return (
    <div style={cardStyle}> 
      <p style={displayStyle}>{display}</p>
      {suit === "" ? (
        <></>
      ) : (
        <p style={suitStyle}>{suit}</p>
      )}
    </div>
  )
}

export default Card