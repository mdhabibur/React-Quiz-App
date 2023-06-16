import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";
import Quiz from "./pages/Quiz";


export default function Answers({options = [], handleChange}) {
    return (

        <div className={classes.answers}>

            {options.map((option, index) => (
            <Checkbox className={classes.answer} text={option.title} value = {index} checked = {option.checked} onChange = { (e) => handleChange(e, index)}  />
            //so now the "Checkbox component" is fully becomes controlled component. it is fully controlled by our react state
            //at first all the 'checked' property will be false, then when an user clicks the checkbox, then it is set to true by handleChange and through reducer function
            //so now here this controlled component's checked state 'true or false' is fully controlled by our state[by react] = that is why we made it a controlled component

            )
            
            )}


        </div>


    );
}