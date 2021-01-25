import React from "react";
import logo from "./logo.svg";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
// components
import Layout from "./components/Layout/Layout";

//pages
import Login from "./pages/Login/login";
import Registry from "./pages/Registry/registry";
//import Table from './pages/tables/Tables'
import Dashboard from "./pages/Dashboard/dashboard";

// context
import { useUserState } from "./context/UserContext";

/**class App extends React.Component {
  constructor(props) {
    super(props);
    
  }**/
export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  /**
    *           <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
    *   <Route
    exact
    path="/app"
    render={() => <Redirect to="/app/dashboard" />}
                <Route component={Error} />
  />**/

  //render() {
  return (
    <Router>
      <Switch>
        <Route exact path="/app" component={Layout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/app/registry" component={Registry} />
      </Switch>
    </Router>
  );
  //}
  //}

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/app/dashboard",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
//export default App;
