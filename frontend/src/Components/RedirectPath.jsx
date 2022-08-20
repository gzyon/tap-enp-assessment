import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectPath = (props) => {
    let params = useParams();

    const queryUrl = `http://localhost:3000/${params.shorturl}`
    useEffect(() => {
        window.location.replace(queryUrl);
      }, [])

    return (
        <h3>Redirecting...</h3>
    )
}

export default RedirectPath;