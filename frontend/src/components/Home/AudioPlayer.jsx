import React, {useContext, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import musicDefault from "../assets/image/music.jpg"
import {Box, IconButton, Slider, Stack, Typography,} from "@mui/material"
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Widget = styled('div')(({theme}) => ({
    padding: 16,
    width: "100%",
    zIndex: 1,
    backgroundColor: "#262626",
    display: "flex",
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '1rem',
    opacity: 0.5,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const AudioPlayer = ({trackRef}) => {
    const {store} = useContext(Context)
    const [position, setPosition] = useState(36);
    const [isLiked, setIsLiked] = useState(false);
    // const theme = useTheme();

    useEffect(() => {
        store.getTracks()
    }, [store])

    useEffect(() => {
        if (store.isPlaying) {
            trackRef.current.play()
        } else if (Object.keys(store.track).length !== 0 && !store.isPlaying) {
            trackRef.current.pause()
        }
    }, [store.isPlaying, store.track, trackRef])

    const ToggleLike = () => {
        setIsLiked(!isLiked)
    }

    const togglePlayPause = () => {
        const prevValue = store.isPlaying;
        store.setIsPlaying(!prevValue);
        if (!prevValue) {
            trackRef.current.play();
            // animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            trackRef.current.pause();
            // cancelAnimationFrame(animationRef.current);
        }
    }

    const duration = Math.floor(store.track.duration); // seconds
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const mainIconColor = '#fff';
    const lightIconColor = '#fff';

    return (
        <Box sx={{width: '100%', overflow: "hidden"}}>
            <Widget>
                <Box>
                    <CoverImage>
                        {Object.keys(store.track).length !== 0
                            ? <img src={store.track.track_picture} alt="Track"/>
                            : <img src={musicDefault} alt="Track"/>
                        }
                    </CoverImage>
                </Box>
                <Stack sx={{margin: "20px 30px", color: "#fff", display: 'flex', width: 120}} spacing={1}>
                    <Typography variant="body1">
                        {Object.keys(store.track).length !== 0
                            ? <>{store.track.artist[0].artist_name}</>
                            : "Name of Artist"
                        }
                    </Typography>
                    <Typography variant="h6" noWrap>
                        {Object.keys(store.track).length !== 0
                            ? <>{store.track.track_title}</>
                            : <b>Name of Track</b>
                        }
                    </Typography>
                </Stack>
                <Box
                    sx={{
                        width: "1100px",
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Box>
                        <IconButton aria-label="previous song">
                            <FastRewindRounded fontSize="large" htmlColor={mainIconColor}/>
                        </IconButton>
                        <IconButton
                            aria-label={store.isPlaying ? 'play' : 'pause'}
                            onClick={togglePlayPause}
                        >
                            {!store.isPlaying ? (
                                <PlayArrowRounded
                                    sx={{fontSize: '3rem', backgroundColor: "#fff", color: "#000",
                                        borderRadius: 6}}
                                />
                            ) : (
                                <PauseRounded sx={{fontSize: '3rem', backgroundColor: "#fff", color: "#000",
                                    borderRadius: 6}}/>
                            )}
                        </IconButton>
                        <IconButton aria-label="next song">
                            <FastForwardRounded fontSize="large" htmlColor={mainIconColor}/>
                        </IconButton>
                    </Box>
                    <Stack sx={{width: "1000px"}}>
                        <Slider
                            aria-label="time-indicator"
                            size="small"
                            value={position}
                            min={0}
                            step={1}
                            max={duration}
                            onChange={(_, value) => setPosition(value)}
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
                                        boxShadow: `0px 0px 0px 8px ${
                                            'rgb(0 0 0 / 16%)'
                                        }`,
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: -2,
                            color: "#fff",
                            width: "1000px",
                        }}
                    >
                        <TinyText>{formatDuration(position)}</TinyText>
                        <TinyText>{formatDuration(duration - position)}</TinyText>
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Stack>
                        <IconButton
                            onClick={ToggleLike}
                        >
                            {!isLiked
                                ? <FavoriteBorderIcon fontSize="large" sx={{color: "#686de0"}}/>
                                : <FavoriteIcon fontSize="large" sx={{color: "#686de0"}}/>
                            }
                        </IconButton>
                    </Stack>
                    <Stack
                        sx={{
                            mt: 1.5,
                            mb: 1,
                            px: 1,
                            width: "250px",
                        }}
                        spacing={2}
                        direction="row"
                        alignItems="end"
                    >
                        <VolumeDownRounded htmlColor={lightIconColor}/>
                        <Slider
                            aria-label="Volume"
                            defaultValue={30}
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
            </Widget>
        </Box>
    );
}

export default observer(AudioPlayer);
