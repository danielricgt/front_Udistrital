import React from "react";
import firebase from "../components/database/firebase";
import { config } from "../components/config/config";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
var showName, showIdentification, showEmail, showDependence, showDependenceName,showTypeUser, showCampus, showInventory;
var dependence, goods, type, campus;


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
  dependence,
  showEmail,
  showDependence,
  showDependenceName,
  showInventory,
  saveGood,
  showCampus,
  getDependences,
  campus,
  goods,
  getDependenceByFk
};


//Navigation 
// function navigate(data){
//     data.setIsLoading(true);
//   if (data.operation == "login"){
//     switch (data.step) {
//       case 1:
//         userLogin(data);        
//         break;
//       case 2:
//         console.log("ENTRÉ")
//         getUser(data);
//         break;
//       case 3:
//         console.log("ENTRÉX2")
//         getCampus(data);
//       case 4:
//         console.log("ENTRE X3")
//         getDependenceByFk(data);
//       case 5:
//         console.log("ENTRE X4")
//         getDependences(data);        
//       case 6:
//         data.history.push("/app/dashboard")
//       default:
//         break;
//     }
//   }
// }
// -----٩(˘◡˘)۶------

function userLogin(data) {

  if (data.loginValue === "" && data.passwordValue === "") {
    //Alert.alert('Campos vacíos', 'Ingresa tu correo y contraseña', [{ style: 'destructive' }])
    data.setError(true);
  } else {
    data.setError(false);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.loginValue, data.passwordValue)
      .then((res) => {
        console.log(res.user);
        showName = res.user.displayName;
        showEmail = res.user.email;
        //data.step= data.step+1;
        //console.log("the steeeeeeeep1", data.step)
        //navigate(data);
        getUser(data);
      })
      .catch((error) => {
        data.setError(true);
        data.setIsLoading(false);
        data.setAnswer(true);
        console.log(error);
      });
  }
}

// -----٩(˘◡˘)۶------

function getUser(dataE) {

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
        console.log(showEmail,data);
        showIdentification = data.data.usuario[0].id;
        showDependence = data.data.usuario[0].fk_dependencia;

        console.log("Usuario obtenido", data);
        showTypeUser = data.data.usuario[0].fk_cargo;
        dataE.setError(null);
        //dataE.dispatch({ type: "LOGIN_SUCCESS" });
        //dataE.step= dataE.step+1;
        //console.log("the steeeeeeeep", dataE.step)
        //navigate(dataE);
        getCampus(dataE);
        dataE.userDispatch({ type: 'LOGIN_SUCCESS' })
       //dataE.history.push("/app");
      })
      .catch(function (error) {
        console.log("something happend",error);
        dataE.userDispatch({ type: "LOGIN_FAILURE" });

      });
  } catch (error) {
    console.error(error);
  }
}

// -----٩(˘◡˘)۶------

function getDependenceByFk(dataE) {
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
            depedencia(where: { id:{_eq: "${showDependence}"}}) {
              nombre_dependencia
              fk_sede
              fk_inventario

            }
          }
          `         
        }),
      },
      
      { mode: "cors" }
    )
      .then((resp) => resp.json())
      .then(function (data) {
        showCampus = data.data.depedencia[0].fk_sede;
        showDependenceName = data.data.depedencia[0].nombre_dependencia;
        showInventory = data.data.depedencia[0].fk_inventario;
        console.log("Super infoooooooo-->",showDependenceName, data);
        getDependences(dataE)
        //dataE.step= dataE.step+1;
        //navigate(dataE)
      })
      .catch(function (error) {
        dataE.setIsLoading(false);
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
}

// -----٩(˘-˘)۶------

function getDependences(dataE) {
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
            depedencia(where: { fk_sede:{_eq: "${showCampus}"}}) {
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
        dataE.setIsLoading(false);
        dependence = data.data.depedencia;
        console.log("the campus data ----->", showCampus,"and",dataE);
        dataE.history.push("/app")
        //dataE.step= dataE.step+1;
        //console.log("THE STEPPPP",dataE.step)
        //navigate(dataE)

      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
}

// -----٩(˘◡˘)۶------

function getCampus(dataE) {
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
        dataE.setIsLoading(false);
        campus = data.data.sede;
        console.log("THE DATA OF CAMPUS: ",campus);
        getDependenceByFk(dataE);
        //dataE.step= dataE.step+1;
        //navigate(dataE);
      })
      .catch(function (error) {
        dataE.setIsLoading(false);
        console.log(error);
      });
  } catch (error) {
    console.log("something happend")
  }
}


function getInventories(){

}

// -----٩(˘-˘)۶------
 function saveGood(
  nameGood,
  description,
  idPlate,
  place,
  physical_space,
  brand_and_serie,
  state,
  reason,
  observation,
  goodType,
  history,
  setIsLoading,
  setError,
  setAnswer
) {
  try {
    setError(false);
    setIsLoading(true);
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

        body: JSON.stringify(
          {
            query: 
            `
            mutation {
              insert_bien_one(object: {espacio_fisico: "${physical_space}", estado: "${state}", marca_y_serie: "${brand_and_serie}",fk_dependencia: ${showDependence}, fk_inventario: ${showInventory}, fk_sede: ${showCampus}, motivo: "${reason}", nombre_bien: "${nameGood}", observacion: "${observation}", descripcion: "${description}", placa: ${idPlate}, porcentaje_iva: 0, tipo_de_bien: "${goodType}", total: 0, total_iva: 0, valor_unitario: 0, verificacion: ""})
              {
                id_bien
              }

            }            
            `         
          }),
      },
      { mode: "cors" }
    )
    .then((resp) => resp.json())
    .then(function (data) {
    //let json = await response;
    console.log("data",showInventory )
    console.log("The answerrr of save goods is :", data)
    setIsLoading(false);
    setError(false);
    setAnswer(true);
    type="Bienes";
  }).catch(function (error) {
    setIsLoading(false);
    console.log(error);
  });
    //responseApi(json, setIsLoading, setError, setAnswer, history, type);
  } catch (error) {
    setIsLoading(false);
    setError(true);
    setAnswer(true);
    console.error(error);
  }
}


//Registry

function userRegistry(setIsLoading, history) {
  setIsLoading(true);
  getDependences(setIsLoading, history);
}

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
      if (res.status === 200) {
        setError(null);
        setIsLoading(false);
        if(type==="Registro"){
          history.push("/");
        }else{
          if(type === "Bienes"){
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


function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
