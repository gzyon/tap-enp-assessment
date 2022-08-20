import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'
import LinkInput from './Components/LinkInput';
import ShortenedUrl from './Components/ShortenedUrl';

function App() {

  const [shortUrl, setShortUrl] = useState("");
  const [url, setURL] = useState("");
  const [width, setWindowWidth] = useState(0);

  useEffect(() => { 

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => 
      window.removeEventListener("resize",updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  }

  return (
    <div className="App">
      <h1 style={{color: 'white'}}>URL Shorterner</h1>
      <Stack spacing={3}>
        <LinkInput width={width} setShortUrl={setShortUrl} setURL={setURL} url={url}/>
        {shortUrl !== '' ? (
          <center><ShortenedUrl data-testid="shorterned-url" shortUrl={shortUrl} url={url} /></center>
        ) : (
          <></>
        )}
      </Stack>
    </div>
  )
}

export default App
