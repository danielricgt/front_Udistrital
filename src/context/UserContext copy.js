import React from "react";
import firebase from "../components/database/firebase";
import { config } from "../components/config/config";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
var showName, showIdentification, showEmail, showDependence, showDependenceName, showCampus, showCampus, showTypeUser;
var  goods, type, campus;
var dependence;
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
  userLogin,
  userRegistry,
  userRegistrySave,
  signOut,
  showName,
  showIdentification,
  showEmail,
  dependence,
  showDependence,
  showDependenceName,
  showTypeUser,
  campus,
  showCampus,
  saveGood,
  getDependenceByFk,
  goods
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

//Profile Validation

function validateUser(cargo, history, setError,setIsLoading){
  console.log("Cargo", cargo==2)
  if (cargo==2){
    history.push("/app/dashboard")
  } else if (cargo==1){
    console.log("........building........!")
  }
  setError(null);
  setIsLoading(false);
}

//Registry

function userRegistry(setIsLoading, history) {
  setIsLoading(true);
  getCampus(setIsLoading, history);
  //getDependences(setIsLoading, history);
}

/** 
async function userRegistrySave(
  identification,
  name,
  lastname,
  email,
  password,
  password2,
  history,
  setIsLoading,
  setError,
  setAnswer
) {
  try {
    setError(false);
    setIsLoading(true);
    let response = await fetch(
      `${config.APIFireBase}/api/user`,
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
          id: identification,
          name: name,
          lastname: lastname,
          email: email,
          password: password,
          fk_dependence: "0hSRJuu0Zrwq0w0euTyH",
        }),
      },
      { mode: "cors" }
    );
    let json = await response;
    type="Registro";
    responseApi(json, setIsLoading, setError, setAnswer, history, type);
  } catch (error) {
    setError(true);
    setAnswer(true);
    console.error(error);
  }
}

function responseApi(res, setIsLoading, setError, setAnswer, history, type) {
  console.log("esto es la respuesta", res.description, res.json());
  if (typeof res.error !== "undefined") {
    setIsLoading(false);
    setError(true);
    console.log("Upps!", res.error);
  } else {
    if (typeof res.status === "undefined" || res.status !== 200) {
      setIsLoading(false);
      setError(true);
      setAnswer(true);
      console.log(JSON.stringify(res));
      console.log("Upps!", "Algo pasó, intenta de nuevo");
    } else {
      if (res.status == 200) {
        setError(null);
        setIsLoading(false);
        if(type=="Registro"){
          history.push("/");
        }else{
          if(type == "Bienes"){
            history.push("/app/dashboard")
          }
        }
        console.log("respuesta!!!!!!!!!", res);
      } else {
        setError(true);
        setIsLoading(false);
        setAnswer(true);
        console.log("Upps!", "Algo pasó intenta de nuevo", res);
      }
    }
  }
}

async function saveGood(
  nameGood,
  description,
  idPlate,
  place,
  physical_space,
  brand_and_serie,
  state,
  reason,
  history,
  setIsLoading,
  setError,
  setAnswer
) {
  try {
    setError(false);
    setIsLoading(true);
    let response = await fetch(
      `${config.APIFireBase}/api/good`,
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
          name: nameGood,
          description: description,
          idPlate: idPlate,
          place: place,
          fk_dependence: showDependence,
          physical_space: physical_space,
          brand_and_serie: brand_and_serie,
          state: state,
          reason: reason,
        }),
      },
      { mode: "cors" }
    );
    let json = await response;
    type="Bienes";
    responseApi(json, setIsLoading, setError, setAnswer, history, type);
  } catch (error) {
    setError(true);
    setAnswer(true);
    console.error(error);
  }
}
 
function getDependenceByFk(setIsLoading, history) {
  try {
    fetch(
      `${config.APIFireBase}/api/dependence?id=${showDependence}`,
      {
        crossDomain: true,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        },
      },
      { mode: "cors" }
    )
      .then((resp) => resp.json())
      .then(function (data) {
        setIsLoading(false);
        showDependenceName = data.dependence_name;
        console.log("Super infoooooooo-->",showDependenceName, data);
        history.push("/app/dashboard");
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
}
**/

// -----٩(˘◡˘)۶------

async function getDependenceByFk(idDependence) {
  try {
    fetch(
      `${config.APIGraphql}`,
      {
        crossDomain: true,
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        },
        body: JSON.stringify({
          query: `
          query MyQuery {
            depedencia(where: {fk_sede: {_eq: ${idDependence}}}) {
              fk_sede
              id
              nombre_dependencia
            }
          }
          `
        }),
      },
      { mode: "cors" }
    )
      .then((resp) => resp.json())
      .then(function (data) {
        //setIsLoading(false);
        showDependenceName = data.data.depedencia;
        dependence=showDependence;
        console.log("dependencia", idDependence)
        console.log("Super infoooooooo-->", data.data.depedencia);
        //history.push("/registry");
       // history.push("/app/dashboard");
      })
      .catch(function (error) {
        //setIsLoading(false);
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
}

// -----٩(˘◡˘)۶------

function getCampus(setIsLoading,history) {
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
          query: `
          query MyQuery {
            sede {
              id
              nombre
            }
          }
          `
        }),
      },
      { mode: "cors" }
    )
      .then((resp) => resp.json())
      .then(function (data) {
        setIsLoading(false);
        campus = data.data.sede;
        console.log("THE DATA OF CAMPUS: ",campus);
       history.push("/registry");
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  } catch (error) {
    console.log("something happend")
  }
}
function getDependences(setIsLoading, history) {
  try {
    fetch(
      `${config.APIFireBase}/api/dependencies`,
      {
        crossDomain: true,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        },
      },
      { mode: "cors" }
    )
      .then((resp) => resp.json())
      .then(function (data) {
        setIsLoading(false);
        dependence = data;
        console.log("DEPENDENCE",dependence);
        history.push("/registry");
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
    //responseApi(json, setIsLoading,setError, setAnswer,history);
  } catch (error) {
    console.error(error);
  }
}

function getGoods(setIsLoading, history) {
  try {
    fetch(
      `${config.APIFireBase}/api/goods?id=${showDependence}`,
      {
        crossDomain: true,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        },
      },
      { mode: "cors" }
    )
      .then((resp) => resp.json())
      .then(function (data) {
        goods = data;
        console.log(goods);
        getDependenceByFk(setIsLoading, history)
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
    //responseApi(json, setIsLoading,setError, setAnswer,history);
  } catch (error) {
    console.error(error);
  }
}

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
        history.push("/app/dashboard");
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

/** 
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
      `${config.APIFireBase}/api/user?email=${showEmail}`,
      {
        crossDomain: true,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        },
      },
      { mode: "cors" }
    )
      .then((resp) => resp.json())
      .then(function (data) {
        showIdentification = data.userInfo.id;
        showDependence = data.userInfo.fk_dependence;
        console.log(showIdentification);
        console.log("Usuario obtenido", data, showEmail);
        setError(null);
        setIsLoading(false);
        dispatch({ type: "LOGIN_SUCCESS" });
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
**/
function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
