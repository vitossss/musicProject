import {styled, alpha, InputBase, Button, Toolbar, Box, List, ListItem} from '@mui/material'

export const Search = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "45%"
}));

export const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export const StyledButton = styled(Button)(() => ({
    "&:hover": {
        backgroundColor: "#686de0",
        color: "#fff"
    }
}));

export const StyledToolbar = styled(Toolbar)(() => ({
    display: "flex",
    justifyContent: "space-between"
}));

export const UserBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center"
}));

export const StyledListItem = styled(ListItem)(() => ({
    marginBottom: "20px",
    "&:hover": {
        color: "#686de0",
        transition: "all .2s ease-out",
        "& .MuiListItemIcon-root": {
            color: "#686de0",
            transition: "all .2s ease-out"
        }
    },
}));
