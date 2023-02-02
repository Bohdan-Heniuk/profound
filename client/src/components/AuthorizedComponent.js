import * as React from "react";
import { getUser } from "../utils";
import { Navigate } from "react-router-dom";

function AuthorizedComponent({ component }) {
  const user = getUser();

  return user ? <React.Fragment>{component}</React.Fragment> : <Navigate to="/login"/>;
}

export default AuthorizedComponent;
