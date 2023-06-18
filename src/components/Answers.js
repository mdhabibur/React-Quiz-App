import { Fragment } from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";
import Quiz from "./pages/Quiz";


export default function Answers({options = [], handleChange, input}) {
    return (

        <div className={classes.answers}>


            {/* //so now the "Checkbox component" is fully becomes controlled component. it is fully controlled by our react state
            //at first all the 'checked' property will be false, then when an user clicks the checkbox, then it is set to true by handleChange and through reducer function
            //so now here this controlled component's checked state 'true or false' is fully controlled by our state[by react] = that is why we made it a controlled component
            
            //so now need to ensure that if the 'input' is true then it is for question page else for result page */}

            {options.map((option, index) => (
            
                <Fragment key={index} >
                    {input ? (

                        <Checkbox className={classes.answer}
                        key={index}
                        text={option.title} 
                        value = {index} 
                        checked = {option.checked}
                        onChange = { (e) => handleChange(e, index)}  />

                    ) : (

                        //here no option will be given for checked tick mark
                        //defaultChecked is for only getting the checked not for setting 
                        //there will be no event handler
                        //and disabled for not letting click to the checkbox
                        //and another work is to let the correct answers to be marked by green color and the wrong answers marked by red color
                        //there are two css classes for that, we will pass them here dynamically

                        <Checkbox className={`${classes.answer} ${
                            option.correct ? classes.correct :
                            option.checked ? classes.wrong : null

                        }` }

                        key={index}
                        text={option.title} 
                        defaultChecked = {option.checked}
                        disabled
                         />


                    )}


                </Fragment>

            )
            
            )}


        </div>


    );
}