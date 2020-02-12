import React, {useEffect, useState} from 'react';
import Video from '../Video';
import Playlist from "./Playlist";
import {ThemeProvider} from "styled-components";
import StyledHgoPlayer from "../styles/StyledHgoPlayer";

const theme = {
    bgcolor: "#353535",
    bgcolorItem: "#414141",
    bgcolorItemActive: "#405c63",
    bgcolorPlayed: "#525d4e",
    border: "none",
    borderPlayed: "none",
    color: "#fff",
};

const themeLight = {
    bgcolor: "#fff",
    bgcolorItem: "#fff",
    bgcolorItemActive: "#80a7b1",
    bgcolorPlayed: "#7d9979",
    border: "1px solid #353535",
    borderPlayed: "none",
    color: "#353535",
};

const HgoPlayer = (props) => {
    const videos = JSON.parse(document.querySelector('[name="videos"]').value);

    const [state, setState] = useState({
        videos: videos.playlist,
        activeVideo: videos.playlist[0],
        nightMode: true,
        playlistId: videos.playlistId,
        autoplay: false
    });

    useEffect(() => {
        const videoId = props.match.params.activeVideo;
        if (videoId !== undefined) {
            const newActiveVideo = state.videos.findIndex(
                video => video.id === videoId
            );
            setState(prev => ({
                ...prev,
                activeVideo: prev.videos[newActiveVideo],
                autoplay: props.location.autoplay,
            }));
        } else {
            props.history.push({
                pathname: `/${state.activeVideo.id}`,
                autoplay: false
            })
        }
    }, [props.history, props.location.autoplay, props.match.params.activeVideo, state.activeVideo.id, state.videos]);

    const nightModeCallback = () => {
        setState(prevState => ({
            ...prevState,
            nightMode: !prevState.nightMode
        }));
    };

    const endCallback = () => {
        const  videoId = props.match.params.activeVideo;
        const currentActiveIndex = state.videos.findIndex(
            video => video.id = videoId
        );
        const nextVideo = currentActiveIndex === state.videos.length - 1 ? 0: currentActiveIndex +1;
        props.history.push({
            pathname: `/${state.videos[nextVideo].id}`,
            autoplay: false
        })
    };

    const progressCallback = (e) => {
        if(e.playedSeconds > 10 && e.playedSeconds < 11 ) {
            setState({
                ...state,
                videos: state.videos.map(element => {
                    return element.id === state.activeVideo.id
                    ? {...element, played:true}
                    : element
                })
            })
        }
    };

    return (
        <ThemeProvider theme={state.nightMode ? theme : themeLight}>
            {state.videos !== null ? (
                <StyledHgoPlayer>
                    <Video
                        active={state.activeVideo}
                        autoplay={state.autoplay}
                        endCallback={endCallback}
                        progressCallback={progressCallback}
                    />
                    <Playlist
                        videos={state.videos}
                        active={state.activeVideo}
                        nightModeCallback={nightModeCallback}
                        nightMode={state.nightMode}
                    />
                </StyledHgoPlayer>
            ) : null}
        </ThemeProvider>
    );
};

export default HgoPlayer;
