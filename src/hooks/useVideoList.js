
//a custom hook to import videos quiz and answers from the firebase 
//as this custom hook is in separate file so it is reusable and modular
//as importing videos quiz , answers are side effect so need to use the useEffect() hook here

import { useEffect } from "react";
import {get, getDatabase, limitToFirst, orderByKey, query, ref, startAt} from "firebase/database";
import { useState } from "react";
import app from "../firebase";

export default function useVideoList(page){

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);



    //this useEffect() runs for the first time when something renders and there is no dependency 
    //but if there are more dependency then depending upon their state, it will re-render
    //here the callback inside the useEffect() is a synchronous function, not async. so you can't write async-await in the call back but 
    //but the methods inside that callback can be async-await functions
    useEffect(() => {

        //database related works
        async function fetchVideos(){
            //first need to make connection with the firebase db
            const db = getDatabase(app);
            const videoRef = ref(db, "videos");
            const videoQuery = query(
                videoRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(4),

            );

            try{
                setError(false);
                setLoading(true);
                //request firebase data
                const snapshot = await get(videoQuery);
                setLoading(false);
                if(snapshot.exists()){
                    //setVideos() gives an object
                    //inside it , it gives a callback where we can get the previous state too and
                    //update the previous state
                    setVideos((prevVideos) => {

                        //as it reference type object so need to change immutably 
                        //and need to store the videos in an array from that object
                        //by taking value from the object we convert them to array
                        return [...prevVideos, ...Object.values(snapshot.val()) ] 

                    });


                }else {
                    //no snapshot/data exists
                    setHasMore(false);

                }
                


            }catch(err){
                console.log(err);
                setLoading(false);
                setError(true);
            }



        }
        fetchVideos();

    }, [page]);

    return {
        loading, 
        error,
        videos,
        hasMore,
    };

}