import React from 'react';
import {useState, useContext, useEffect} from 'react';
import {Context} from "../../index";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

export default function AddMenu({trackId}) {
    const {store} = useContext(Context)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = (playlistId) => {
        store.playlistAddTrack(playlistId, trackId)
        handleClose()
    };

    useEffect(() => {
        store.getPlaylists()
    }, [store])

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <AddIcon sx={{color: "#686de0"}}/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {store.playlists.map((playlist) => (
                    <MenuItem key={playlist.id} onClick={() => handleSubmit(playlist.id)}>{playlist.title}</MenuItem>
                ))}
            </Menu>
        </div>
    );
}
