import { useState } from "react";
import useVideoList from "../hooks/useVideoList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Videos() {

    const [page, setPage] = useState(1);
    const {loading, error, videos, hasMore} = useVideoList(page);


    return (
        <div>


            { videos.length > 0 && (

              <InfiniteScroll dataLength={videos.length} hasMore={hasMore} loader={<h4>Loading wait...</h4>} next={ () => setPage(page + 8)} >
                {
                    videos.map( (video) =>
                    video.noq > 0 ? 
                        (
                            <Link to={`/quiz/${video.youtubeID}`} key={video.youtubeID} >
                            <Video  title = {video.title} id = {video.youtubeID} noq = {video.noq} />
                            </Link>
            
                        ) : (

                                <Video  title = {video.title} id = {video.youtubeID} noq = {video.noq} key={video.youtubeID} />
            
                        )
                
                        
                   )
                }

              </InfiniteScroll>

            )}


            {!loading && videos.length === 0 && <div> No data found! </div> }
            {error && <div> There was an error! </div> }
            {loading && <div>loading...</div> }
            {loading && videos.length == 0 && <div> loading and length is {videos.length} </div>}


        </div>
    );
}