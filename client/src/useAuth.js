import React, { useEffect, useState } from "react";
import axios from "axios";

function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", { code })
      .then((res) => {
        
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);
 

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      console.log('refreshing')
      
      axios
        .post("http://localhost:3001/refresh", { refreshToken })
        .then((res) => {
          console.log(res.data.expiresIn)
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
        
    }, 3590000);
    return () => clearInterval(interval)
  }, [expiresIn,accessToken]);

  return accessToken;
}

export default useAuth;
