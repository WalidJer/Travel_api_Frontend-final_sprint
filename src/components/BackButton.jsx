import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const BackButton = ({ to = "/", label = "Back to Home" , style = {}}) => {
    const navigate = useNavigate();
    return (
    <button className="back-button" onClick={() => navigate(to)} style={style}>
      <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "6px" }} />
      {label}
    </button>
  )
}

export default BackButton