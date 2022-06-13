import React from "react";
import {observer} from "mobx-react-lite";

import {NavLink, Outlet} from "react-router-dom";
import {
    Box, Divider, List, ListItemButton, ListItemIcon, ListItemText,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {StyledListItem} from "./CustomStyles";

const Sidebar = () => {
    let activeStyle = {
        backgroundColor: "rgba(104, 109, 224, 0.3)",
    };

    return (
        <Box
            bgcolor={"background.default"}
            color={"text.primary"}
            flex={1}
            sx={{
                minHeight: `calc(100vh - 64px - 136px)`,
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
                        style={({isActive}) =>
                            isActive ? activeStyle : undefined
                        }
                        component={NavLink}
                        to="/add_album"
                    >
                        <ListItemIcon sx={{color: "#fff"}}>
                            <AddCircleOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Add Album"/>
                    </ListItemButton>
                </StyledListItem>
                <Divider sx={{bgcolor: "#444444"}}/>
            </List>
            <Outlet/>
        </Box>
    );
};

export default observer(Sidebar);
