import { useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function ProgressBar({prev, next, submit,  progress}) {


  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();
  //create a null reference by using the useRef() hook

  //now when user takes mouse on the progress bar it will show progress in % and when removes the mouse , it will hide
  function toogleTooltip(){
    //so we will need a state for checking if the tooltip is open or not
    if(tooltip){
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    }else {
      setTooltip(true);
      // left: calc(70% - 65px); this style should be set dynamically
      // the toogle tooltip will dynamically move with the progress in % of the progress bar
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.display = 'block';
    }
  }

    return(

        <div className={classes.progressBar}>
        <div className={classes.backButton} onClick={prev} >
          <span className="material-icons-outlined"> arrow_back </span>
        </div>
        <div className={classes.rangeArea}>
          <div className={classes.tooltip} ref={tooltipRef} >{progress}% Complete!</div>

          <div className={classes.rangeBody}>
            <div className={classes.progress} style={{ width: `${progress}%` }} onMouseOver={toogleTooltip} onMouseOut={toogleTooltip}  ></div>
          </div>
        </div>

          <Button className={classes.next} onClick = {progress === 100 ? submit : next}>
          <span> {progress === 100 ? 'Submit Quiz' : "Next Question"} </span>
          <span className="material-icons-outlined"> arrow_forward </span>
          </Button>

      </div>

    );
}