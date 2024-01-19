import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context); // se injecta el contexto a la navbar para que se pueda recargar cuando estemos log in (existe un token)
	const navigate = useNavigate()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/singup">
						<button className="btn btn-primary mx-2">Sing Up</button>
					</Link> 
					{ !store.token ?    // uso un ternario para ver si no existe el token en el store, si no existe el button va a login
					<Link to="/login">
						<button className="btn btn-primary">Log in</button>
					</Link> 
					:  // si no existe el boton llama la accion logout que reinicia el sessionStorage del front y el store de la app
					<button onClick={() => {actions.logout(), navigate('/')}} className="btn btn-primary">log out</button> // aca estoy forzando a que cuando cierre sesion se vaya al home
					}
				</div>
			</div>
		</nav>
	);
};
