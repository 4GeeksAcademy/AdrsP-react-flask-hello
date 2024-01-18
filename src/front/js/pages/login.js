import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");        // se agrega el useState para manipular las variables a enviar al backend
    const [ password, setPassword] = useState("");
    const navigate = useNavigate()       // lo uso para redireccionar en base al login

    console.log("this is your token " + store.token)

    const handleClick = () =>{            // llama al login almacenado en el flux store para que haga el fecth post / token
        actions.login(email, password)    // le envio el email y password desde sus respectivos hooks 
    };
    
   if (store.token && store.token != "" && store.token != undefined) navigate('/'); // esta linea es para redireccionar la pagina de login una vez exista un token generado por el backend

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>  {/* si token existe, es distinto de '' y no esta indefinido, mensaje si no se carga la plantilla de log in */}
                {store.token && store.token != "" && store.token != undefined ? "You are logged in with" + store.token :
                <div>
                    <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />                {/*Esto se le llama un componente controlado, dado que cada vez que cambia el input se reevalua el valor del input y se almacena*/}
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value) } />
                    <button onClick={handleClick} > Login </button>
                </div>
                }
		</div>
	);
};
