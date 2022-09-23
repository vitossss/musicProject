import React from 'react';
import {useContext, useEffect, useState, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Widget, CoverImage, TinyText} from "./CustomStyles"
import {Box, IconButton, Slider, Stack, Typography,} from "@mui/material"
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AudioPlayer = ({handleLiked, trackId, setTrackId}) => {
    const {store} = useContext(Context)
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);
    const [duration, setDuration] = useState(0)
    const trackRef = useRef(null)
    // const theme = useTheme();

    useEffect(() => {
        store.getTracks()
    }, [store])

    useEffect(() => {
        if (trackId !== "") {
            console.log(trackRef)
            if (store.isPlaying) {
                trackRef.current.play()
                setCurrentTime(trackRef.current.currentTime)
                setInterval(() => {
                    setCurrentTime(Math.floor(trackRef.current.currentTime));
                }, 1000);
            }
        }
    }, [store.isPlaying, trackId, trackRef])

    const togglePlayPause = () => {
        store.setIsPlaying(!store.isPlaying);
        if (store.isPlaying) {
            trackRef.current.play();
        } else {
            trackRef.current.pause();
        }
    }

    const skipBack = () => {
        if (trackId > 0) {
            setTrackId(trackId - 1)
        }
    }

    const skipForward = () => {
        if (trackId < store.tracks.length - 1) {
            setTrackId(trackId + 1)
        }
    }

    const volumeChange = (e, value) => {
        setVolume(value);
        trackRef.current.volume = value / 100;
    };

    const onDurationChangeHandler = (e) => {
        const seconds = Math.floor(e.target.duration);
        setDuration(seconds);
    };

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const mainIconColor = '#fff';
    const lightIconColor = '#fff';

    return (
        <Box sx={{width: '100%', overflow: "hidden"}}>
            <Widget sx={{height: "101px"}}>
                {store.tracks.map((track) => (
                    trackId === track.id
                        ? (
                            <Box sx={{display: "flex"}} key={track.id}>
                                <Box sx={{display: "flex"}}>
                                    <Box>
                                        <CoverImage>
                                            <img src={track.track_picture} alt="track"/>
                                        </CoverImage>
                                    </Box>
                                    <Stack sx={{margin: "20px 30px", color: "#fff", display: 'flex', width: 120}}
                                           spacing={1}>
                                        <Typography variant="body1">
                                            {track.artist.map(a => a.artist_name)}
                                        </Typography>
                                        <Typography variant="h6" noWrap>
                                            {track.track_title}
                                        </Typography>
                                        <audio src={track.track_url} ref={trackRef}
                                               onDurationChange={onDurationChangeHandler}>
                                        </audio>
                                    </Stack>
                                </Box>
                                <Box
                                    sx={{width: "1100px", display: 'flex', flexDirection: "column", alignItems: "center"}}
                                >
                                    <Box>
                                        <IconButton aria-label="previous song"
                                                    onClick={skipBack}
                                        >
                                            <FastRewindRounded fontSize="large" htmlColor={mainIconColor}/>
                                        </IconButton>
                                        <IconButton
                                            aria-label={store.isPlaying ? 'play' : 'pause'}
                                            onClick={togglePlayPause}
                                        >
                                            {!store.isPlaying ? (
                                                <PlayArrowRounded
                                                    sx={{
                                                        fontSize: '3rem', backgroundColor: "#fff", color: "#000",
                                                        borderRadius: 6
                                                    }}
                                                />
                                            ) : (
                                                <PauseRounded
                                                    sx={{
                                                        fontSize: '3rem', backgroundColor: "#fff", color: "#000",
                                                        borderRadius: 6
                                                    }}/>
                                            )}
                                        </IconButton>
                                        <IconButton aria-label="next song"
                                                    onClick={skipForward}
                                        >
                                            <FastForwardRounded fontSize="large" htmlColor={mainIconColor}/>
                                        </IconButton>
                                    </Box>
                                    <Stack sx={{width: "1000px"}}>
                                        <Slider
                                            aria-label="time-indicator"
                                            size="small"
                                            value={currentTime}
                                            min={0}
                                            step={1}
                                            max={duration}
                                            onChange={(_, value) => {
                                                trackRef.current.currentTime = value
                                                setCurrentTime(value)
                                            }}
                                            sx={{
                                                color: '#686de0',
                                                height: 4,
                                                '& .MuiSlider-thumb': {
                                                    width: 8,
                                                    height: 8,
                                                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                                    '&:before': {
                                                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                                    },
                                                    '&:hover, &.Mui-focusVisible': {
                                                        boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
                                                    },
                                                    '&.Mui-active': {
                                                        width: 20,
                                                        height: 20,
                                                    },
                                                },
                                                '& .MuiSlider-rail': {
                                                    opacity: 0.28,
                                                },
                                            }}
                                        />
                                    </Stack>
                                    <Box
                                        sx={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -2,
                                            color: "#fff",
                                            width: "1000px",
                                        }}
                                    >
                                        <TinyText>{formatDuration(currentTime)}</TinyText>
                                        <TinyText>{formatDuration(duration - currentTime)}</TinyText>
                                    </Box>
                                </Box>
                                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <Stack>
                                        <IconButton onClick={() => handleLiked(track.id)}>
                                            {track.is_liked
                                                ? <FavoriteIcon fontSize="large" sx={{color: "#686de0"}}/>
                                                : <FavoriteBorderIcon fontSize="large" sx={{color: "#686de0"}}/>
                                            }
                                        </IconButton>
                                    </Stack>
                                    <Stack
                                        sx={{mt: 1.5, mb: 1, px: 1, width: "250px"}} spacing={2} direction="row"
                                        alignItems="end"
                                    >
                                        <VolumeDownRounded htmlColor={lightIconColor}/>
                                        <Slider
                                            aria-label="Volume"
                                            value={volume}
                                            onChange={volumeChange}
                                            sx={{
                                                color: '#686de0',
                                                '& .MuiSlider-track': {
                                                    border: 'none',
                                                },
                                                '& .MuiSlider-thumb': {
                                                    backgroundColor: '#686de0',
                                                    border: '2px solid #fff',
                                                    '&:before': {
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                                    },
                                                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                                        boxShadow: 'none',
                                                    },
                                                },
                                            }}
                                        />
                                        <VolumeUpRounded htmlColor={lightIconColor}/>
                                    </Stack>
                                </Box>
                            </Box>
                        )
                        : ''
                ))}
            </Widget>
        </Box>
    );
}

export default observer(AudioPlayer);
