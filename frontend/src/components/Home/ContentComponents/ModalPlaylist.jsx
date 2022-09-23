import React from 'react';
import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Context} from "../../../index";
import {Backdrop, Box, Button, Fade, Grid, Modal, TextField} from '@mui/material'
import {observer} from "mobx-react-lite";

const ModalPlaylist = ({open, handleClose}) => {
    const {store} = useContext(Context)
    const [title, setTitle] = useState('')
    const history = useNavigate()

    const handleSubmit = () => {
        store.createPlaylist(title)
        setTitle('')
        handleClose()
    }

    const handleChange = (e) => {
        const {value} = e.target
        setTitle(value);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box component="form" noValidate sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Title"
                                        name="title"
                                        type="text"
                                        onChange={handleChange}
                                        value={title}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{mt: 3, mb: 2}}
                                onClick={handleSubmit}
                            >
                                Create
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default observer(ModalPlaylist);