import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Singup = () => {
	const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");       
    const [ password, setPassword] = useState("");
    const navigate = useNavigate()       // lo uso para redireccionar en base al login
    
    const handleClick = ()=>{
        // que quiero bueno quiero hacer un fetch que mande esos datos tipo post para guardarlos en la base de datos
        actions.singup(email, password)
                        // tambien hace falta mostrar un mensaje de error cuando no cree el usuario nuevo xq el nombre ya esta en uso, se podria llevar la lista de usuarios al store y comprobar alli primero en la funcion del flux quiza
        navigate('/') // lo quiero redireccionar a home pero solo cuando se cree el usuario de manera exitosa
    };

   	return (
		<div className="text-center mt-5">
			<h1>Sing Up</h1> 
                <div>
                    <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />                
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value) } />
                    <button onClick={handleClick} > Create New User </button>
                </div>
    	</div>
	);
};