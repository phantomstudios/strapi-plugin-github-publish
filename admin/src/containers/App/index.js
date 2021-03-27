import React from "react";

import { GlobalStyle } from "@buffetjs/styles";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "strapi-helper-plugin";

import pluginId from "../../pluginId";
import HomePage from "../HomePage";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
