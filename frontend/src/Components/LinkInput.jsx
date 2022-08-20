import React, { useState } from "react";
import { Grid, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

const LinkInput = (props) => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const boxWidth = props.width > 1023 ? "100vh" : "100vw";

    async function handleClick() {
        let shortUrl;
        console.log(props.url);
        try {
            setLoading(true);
            const response = await axios.get('//localhost:3000/api/shorten', {
                params: {
                    longURL: props.url
                }
            });
            const newUrl = response.data.shortUrl, dbStored = response.data;
            const url = newUrl != undefined ? newUrl : dbStored;
            shortUrl = "http://localhost:5173/" + url;
            props.setShortUrl(shortUrl);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    function checkUrlValidity(url) {
        const pattern = new RegExp(
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-]*)?\??(?:[-+=&;%@.\w]*)#?\w*)?)/gm
        );
        let isValidURL = !!pattern.test(url);
        if (isValidURL !== true) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    function handleChange(e) {
        checkUrlValidity(e.target.value);
        props.setURL(e.target.value);
    }

    const textField = (
        <TextField fullWidth label="Enter or paste the link to be shorterned" variant='outlined' onChange={handleChange}
        sx={{
            ".MuiInputLabel-root": {color: 'white'},
            ".MuiOutlinedInput-root": {"& > fieldset": { borderColor: "white", }},
            ".MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "yellow"}},
            ".MuiOutlinedInput-root:hover": {"& > fieldset": {borderColor: "yellow"}},
            input: { color: 'white' }
        }}/>
    )

    const submitButton = (
        <LoadingButton disabled={disabled} loading={loading} onClick={handleClick} variant="outlined" size="large"
        sx={{
            "&.MuiButton-root.Mui-disabled": {border: '2px grey solid', color: 'white'},
        }}>
            Shorten
        </LoadingButton>
    )

    return (
    <>
        <Box 
        width={boxWidth} 
        sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center'
        }}>
            {props.width  > 1023 ? (
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={10}>
                        {textField}
                    </Grid>
                    <Grid item xs={2} display="flex" justifyContent="flex-start">
                        {submitButton}
                    </Grid>
                </Grid>
            ) : (
                <Stack spacing={2}>
                    {textField}
                    {submitButton}
                </Stack>
            )}
            
        </Box>
    </>
    )
}

export default LinkInput;