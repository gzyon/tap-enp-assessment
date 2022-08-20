import { Alert, Box, Button, IconButton, Link, Snackbar } from "@mui/material";
import React, { useState, forwardRef } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '@fontsource/jetbrains-mono/300.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';

const ShortenedUrl = (props) => {
    console.log(props);
    
    function handleClick() {
        if (props.shortUrl != undefined) {
            navigator.clipboard.writeText(props.shortUrl);
            props.setCopied(true);
            setInterval(() => {
                props.setCopied(false);
            }, 5000);
        }
    }

    return (
        <Box sx={{ width: '50%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', border: 1, p: 1, borderRadius: '16px' }} >
            <Snackbar open={props.copied} autoHideDuration={5000}>
                <Alert security="info" sx={{width: '100%'}}>
                    Link Copied!
                </Alert>
            </Snackbar>
            <Link sx={{fontSize: 25, fontFamily: "Jetbrains Mono", 	pr: 2}} href={props.url} underline="none">
                {props.shortUrl}
            </Link>
            <IconButton onClick={handleClick} sx={{
            "&:hover, &.Mui-focusVisible": { borderColor: "yellow" }
            }} >
                <ContentCopyIcon sx={{color: "white"}} />
            </IconButton>
        </Box>
    )
}

export default ShortenedUrl;