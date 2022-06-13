import {styled, alpha, InputBase, Button, Toolbar, Box, List, ListItem, Stack} from '@mui/material'

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
    width: "300px",
    height: "60px",
    fontSize: 16,
    margin: 10,
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
    marginBottom: "10px",
    "&:hover": {
        color: "#686de0",
        transition: "all .2s ease-out",
        "& .MuiListItemIcon-root": {
            color: "#686de0",
            transition: "all .2s ease-out"
        }
    },
}));

export const ArtistStack = styled(Stack)(() => ({
    height: "180px",
    padding: "15px",
    backgroundColor: "#f2f2f2",
    borderRadius: "10px",
    "&:hover": {
        backgroundColor: "#e9e9e9",
        transition: "all .1s linear"
    }
}));

export const DashboardBox = styled(Box)(() => ({
    width: "900px",
    height: "600px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}));
