import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context); // se injecta el contexto a la navbar para que se pueda recargar cuando estemos log in (existe un token)
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{ !store.token ?    // uso un ternario para ver si no existe el token en el store, si no existe el button va a login
					<Link to="/login">
						<button className="btn btn-primary">Please log in</button>
					</Link> 
					:  // si no existe el boton llama la accion logout que reinicia el sessionStorage del front y el store de la app
					<button onClick={() => actions.logout() } className="btn btn-primary">log out</button>
					}
				</div>
			</div>
		</nav>
	);
};
