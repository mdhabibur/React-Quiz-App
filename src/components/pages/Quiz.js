import Answers from "../Answers";
import ProgressBar from "../ProgressBar";
import MiniPlayer from "../MiniPlayer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import useQuestions from "../../hooks/useQuestions";
import _ from 'lodash';
import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set } from "firebase/database";



const initialState = null;

const reducer = (state, action) => {
    switch(action.type){
        //action is an object and inside it's type property it defines the type of the action

        //in this case(questions case),  the 'questions' from firebase will be copied and inside every questions , the property 'checked' will be set to false
        //and when an user click the checkbox then it will be set to 'true'

        case "questions":
            //action.value will return the 'questions' from firebase
            action.value.forEach(question => (
                question.options.forEach(option => (
                    option.checked = false
                    //all checked property of all questions is set to false at first

                ))

            ));
            return action.value;


        //when an user will click the check box, inside the dispatch() method, this case should be called
        case "answer":
            //first copy the 'questions' array of the local state , that was changed by setting all the questions 's checked property to false
            const questions = _.cloneDeep(state);
            //for copying/cloning the deeply nested objects/array immutably , lodash npm package is used which is by default installed in the react

            questions[action.questionID].options[action.optionIndex].checked = action.value;
            //the checked property of which question or which option of a question is set to true or false , will be passed too
            return questions;


            default:
                return state;

    }

}

export default function Quiz() {

    //got the id of the videos from url
    const {id} = useParams();

    const {loading, error, questions} = useQuestions(id);

    //need to track the current question
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [qna, dispatch] = useReducer(reducer, initialState);
    //qna is the copy of the 'questions' node from firebase to our local application state
    //dispatch is the function defining actions
    //reducer is the function called when an action is done
    

    //and this setting the checked property to 'false' after fetching from firebase for the first time, it should be done when the questions is fetched for the first time from database // //(actually that will be done for 2 or 3 times due to error or network issues) 
    //and it is a side effect so it should be done inside the useEffect() hook

    const {currentUser} = useAuth(); //got the current user
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: "questions", //action type
            value: questions, //got from firebase

        });


    }, [questions]);
    //after the useEffect() is called, dispatch() will be called and the 'questions' will be copied to the local 'qna' array with all questions having 'checked' set to false
    //and when any user will click the 'checkbox' then the 'checked' property will be set to true
    //and for that 'answers' case will be fired


    function handleAnswerChange(e, index){
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked, //action.value which comes from the 'checkbox's checked property' when an user clicks the checkbox

        });
    }

    //handle when user clicks the next button to get the next question
    function nextQuestion(){

        if(currentQuestion + 1 <questions.length){
            setCurrentQuestion((prevCurrent) => prevCurrent + 1);
        }
    }
    
    //handle when user clicks the previous button to get the previous question
    function prevQuestion(){

        if(currentQuestion >= 1 && currentQuestion <= questions.length){
            setCurrentQuestion((prevCurrent) => prevCurrent - 1);
        }
    }

    //submit quiz
    //here the questions's answer will be submitted to firebase inside a node called 'result' and inside
    //'result' node there will be a unique node against the uid of the current user

    //and we will get the updated data and 'checked' data from our local 'qua' array

    async function submit() {
        const {uid} = currentUser;

        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        //inside the 'result' node, we created the 'uid' node and inside it , there will be nodes for each videos by these videoID
        await set(resultRef, {
            [id]: qna
        });

        navigate({
            pathname: `/result/${id}`,
            state: {
                qna,
            }

        });

    }

    //calculate the progress in percentage
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;


    return(
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error !</div>}

            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <h1> {qna[currentQuestion].title } </h1>
                    <h4>Question can have multiple answers</h4>

                    <Answers options = { qna[currentQuestion].options }  handleChange = {handleAnswerChange}  />
                    {/* handleAnswerChange will be called inside the dispatch when the user clicks the checkbox of a question */}

                    <ProgressBar prev={prevQuestion} next={nextQuestion} progress={percentage} submit={submit} />
                    <MiniPlayer />
                
                </>
                )
            
            }
        
        </>

    );
}