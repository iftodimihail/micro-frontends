import { createBrowserHistory, createMemoryHistory } from "history";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname: currentPathname } = history.location;
      if (currentPathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_auth-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
