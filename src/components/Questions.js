import classes from "../styles/Question.module.css";
import Answers from "./Answers";

export default function Question({answers = []}) {

  //there is everything inside the answers array
  return answers.map( (answer, index) => (

    <div className={classes.question} key={index}>
    <div className={classes.qtitle}>
      <span className="material-icons-outlined"> help_outline </span>
      {answer.title}
    </div>
    <Answers options={answer.options} input = {false} />
    {/* when Answers component was used in the question page there were checkboxes. now when we will use them in the question analysis page, everything will be same except for checkboxes. to specify that we will not take any input, we set the input to false  */}
    

    </div>


  ));

}