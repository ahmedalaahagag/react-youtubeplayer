import React from 'react';
import ReactPlayer from "react-player";
import StyledVideoWrapper from "./styles/StyledVideoWrapper";
import StyledVideo from "./styles/StyledVideo";

const Video = ({active, autoplay, endCallback, progressCallback}) => {
    return (
        <StyledVideoWrapper>
            <StyledVideo>
                <ReactPlayer
                    width="100%"
                    height="85%"
                    style={{position:"absolute", top:"0"}}
                    playing={autoplay}
                    controls={true}
                    url={active.video}
                    onEnded={endCallback}
                    onProgress={progressCallback}
                />
            </StyledVideo>
        </StyledVideoWrapper>
    )
};

export default Video;
