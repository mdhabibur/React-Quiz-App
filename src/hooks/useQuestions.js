
//a custom hook to import videos quiz and answers from the firebase 
//as this custom hook is in separate file so it is reusable and modular
//as importing videos quiz , answers are side effect so need to use the useEffect() hook here

import { useEffect } from "react";
import {get, getDatabase, limitToFirst, orderByKey, query, ref, startAt} from "firebase/database";
import { useState } from "react";
import app from "../firebase";

export default function useQuestions(videoID){

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);



    //this useEffect() runs for the first time when something renders and there is no dependency 
    //but if there are more dependency then depending upon their state, it will re-render
    //here the callback inside the useEffect() is a synchronous function, not async. so you can't write async-await in the call back but 
    //but the methods inside that callback can be async-await functions
    useEffect(() => {

        //database related works
        async function fetchQuestions(){
            //first need to make connection with the firebase db
            const db = getDatabase(app);
            const quizRef = ref(db, "quiz/" + videoID + "/questions");
            const quizQuery = query(
                quizRef,
                orderByKey(),
            );

            try{
                setError(false);
                setLoading(true);
                //request firebase data
                const snapshot = await get(quizQuery);

                setLoading(false);

                if(snapshot.exists()){
                    //setVideos() gives an object
                    //inside it , it gives a callback where we can get the previous state too and
                    //update the previous state
                    setQuestions((prevQuestions) => {

                        //as it reference type object so need to change immutably 
                        //and need to store the videos in an array from that object
                        //by taking value from the object we convert them to array
                        return [...prevQuestions, ...Object.values(snapshot.val()) ] 

                    });


                }else {
                    //no snapshot/data exists

                }
                


            }catch(err){
                console.log(err);
                setLoading(false);
                setError(true);
            }



        }
        fetchQuestions();

    }, [videoID]);

    return {
        loading, 
        error,
        questions,
    };

}