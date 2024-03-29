import React from "react";
import {useState, useContext, useEffect} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {NavLink, Outlet} from "react-router-dom";
import ModalPlaylist from "./ContentComponents/ModalPlaylist";
import {
    Box, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {StyledListItem} from "./CustomStyles";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Sidebar = () => {
    const {store} = useContext(Context)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        store.getPlaylists()
    }, [store])

    const handleDelete = (playlistId) => {
        store.deletePlaylist(playlistId)
    }

    let activeStyle = {
        backgroundColor: "rgba(104, 109, 224, 0.3)",
    };

    return (
        <Box
            bgcolor={"background.default"}
            color={"text.primary"}
            flex={1}
            sx={{
                minHeight: `calc(100vh - 64px - 133px)`,
                bgcolor: "#000",
                color: "#fff"
            }}
        >
            <List>
                <StyledListItem disablePadding>
                    <ListItemButton
                        style={({isActive}) =>
                            isActive ? activeStyle : undefined
                        }
                        component={NavLink}
                        to="/home"
                    >
                        <ListItemIcon sx={{color: "#fff"}}>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <ListItemButton
                        style={({isActive}) =>
                            isActive ? activeStyle : undefined
                        }
                        component={NavLink}
                        to="/library"
                    >
                        <ListItemIcon sx={{color: "#fff"}}>
                            <LibraryMusicIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Library"/>
                    </ListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <ListItemButton
                        style={({isActive}) =>
                            isActive ? activeStyle : undefined
                        }
                        component={NavLink}
                        to="/liked"
                    >
                        <ListItemIcon sx={{color: "#fff"}}>
                            <FavoriteIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Liked"/>
                    </ListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <ListItemButton
                        onClick={handleOpen}
                    >
                        <ListItemIcon sx={{color: "#fff"}}>
                            <AddCircleOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Add Playlist"/>
                    </ListItemButton>
                </StyledListItem>
                <Divider sx={{bgcolor: "#444444"}}/>
            </List>
            <ModalPlaylist open={open} handleClose={handleClose}/>
            <List>
                {store.playlists.map((playlist) => (
                    <StyledListItem key={playlist.id} disablePadding>
                        <ListItemButton
                            style={({isActive}) =>
                                isActive ? activeStyle : undefined
                            }
                            component={NavLink}
                            to={`playlist/${playlist.id}`}
                        >
                            <ListItemText primary={playlist.title}/>
                        </ListItemButton>
                        <IconButton onClick={() => handleDelete(playlist.id)}>
                            <DeleteForeverIcon fontSize="small" sx={{color: "#686de0"}}/>
                        </IconButton>
                    </StyledListItem>
                ))}
            </List>
            <Outlet/>
        </Box>
    );
};

export default observer(Sidebar);
