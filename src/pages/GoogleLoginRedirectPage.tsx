// import React from 'react';

import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    const urlPramas = new URLSearchParams(window.location.search);
    console.log(urlPramas.get("name"));

    const accessToken = urlPramas.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlPramas.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = "/my";
      console.log("로그인 성공");
    } else {
      console.log("로그인 실패");
    }
  }, [setAccessToken, setRefreshToken]);

  return <div>GoogleLoginRedirectPage</div>;
};

export default GoogleLoginRedirectPage;
