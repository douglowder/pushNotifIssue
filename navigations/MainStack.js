import React from "react";
import { useApp } from "../context/AppContext";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";

const MainStack = () => {
  const auth = useApp();

  return auth.token ? <LoggedIn /> : <NotLoggedIn />;
};

export default MainStack;
