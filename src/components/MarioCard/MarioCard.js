import React from "react";
import "./MarioCard.css";

const MarioCard = props => (
  <div className="card">
  <div className="img-container">
      <a onClick={() => props.selectCharacter(props.character)} 
          className={props.curScore === 0 ? "imgStyle imgStylePrevious" : "imgStyle"}>
          <img className="cusImg" alt={props.character} src={props.charImage} />
      </a>
  </div>
</div>
);

export default MarioCard;
