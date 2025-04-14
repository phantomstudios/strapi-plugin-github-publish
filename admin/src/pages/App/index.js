import React from "react";

import { Switch, Route } from "react-router-dom";

import pluginId from "../../pluginId";
import HomePage from "../HomePage";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
      </Switch>
    </div>
  );
};

export default App;
