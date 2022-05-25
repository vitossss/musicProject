import React from "react";
import {observer} from "mobx-react-lite";

import {
    Box, Divider, List, ListItemButton, ListItemIcon, ListItemText,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {StyledListItem} from "./CustomStyles";

const Sidebar = () => {
    return (
        <Box
            bgcolor={"background.default"}
            color={"text.primary"}
            flex={1}
            sx={{
                minHeight: `calc(100vh - 64px)`,
                bgcolor: "#000",
                color: "#fff",
                zIndex: 1
            }}
        >
            <List>
                <StyledListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{color: "#fff"}}>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{color: "#fff"}}>
                            <LibraryMusicIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Library"/>
                    </ListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{color: "#fff"}}>
                            <FavoriteIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Liked"/>
                    </ListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{color: "#fff"}}>
                            <AddCircleOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Add Album"/>
                    </ListItemButton>
                </StyledListItem>
                <Divider sx={{bgcolor: "#444444"}}/>
            </List>
        </Box>
    );
};

export default observer(Sidebar);
