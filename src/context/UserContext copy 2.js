import React from "react";
import firebase from "../components/database/firebase";
import { config } from "../components/config/config";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

var showName, showIdentification, showEmail, showTypeUser;

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  userRegistry,
  userLogin,
  signOut,
  showName,
  showIdentification,
  showEmail,
  showTypeUser
};


// -----٩(˘◡˘)۶------

function userLogin(
  dispatch,
  email,
  password,
  history,
  setIsLoading,
  setError,
  setAnswer
) {
  if (email === "" && password === "") {
    setError(true);
  } else {
    setError(false);
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res.user);
        showName = res.user.displayName;
        showEmail = res.user.email;
        console.log("User logged-in successfully!");
        getUser(
          showEmail,
          history,
          setIsLoading,
          setError,
          setAnswer,
          dispatch
        );
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
        setAnswer(true);
        console.log(error);
      });
  }
}

// -----٩(˘◡˘)۶------
function getUser(
  showEmail,
  history,
  setIsLoading,
  setError,
  setAnswer,
  dispatch
) {
  try {

    fetch(
      `${config.APIGraphql}`,
      {
        crossDomain: true,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        },
        body: JSON.stringify({
          query: 
          `
          query MyQuery {
            usuario(where: { correo:{_eq: "${showEmail}"}}) {
              nombres
              apellidos
              correo
              estado
              fk_cargo
              fk_dependencia
              id
            }
          }
          `         
        }),
      },
      { mode: "cors" }
    )
      .then((resp) => resp.json())
      .then(function (data) {
        console.log("email", showEmail)
        //showIdentification = data.data.usuario[0].id;
        showTypeUser = data.data.usuario[0].fk_cargo;
        //console.log(showIdentification);
        console.log("Usuario obtenido", data, showEmail);
        //validateUser(showTypeUser, history, setError,setIsLoading);
        //history.push("/app/dashboard");
        userRegistry(setIsLoading,history)
        // setError(null);
        // setIsLoading(false);
       // getGoods(setIsLoading, history);
       // history.push("/app/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
}
function userRegistry(setIsLoading, history) {
  setIsLoading(true);
  //getCampus(setIsLoading, history);
  history.push("/app");
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
