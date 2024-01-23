const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			currentUser: "",
			succesfully_created: false,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStorage: () => {     // esta action es para guardar el token en sessionStorage en la "memoria del front"
				const token = sessionStorage.getItem("token");
				console.log("application just loaded synching the session storage token")
				console.log(token)
				if (token && token != "" && token != undefined) setStore({token: token}) 
			},

			logout: () => {
				sessionStorage.removeItem("token");   // esta action sirve como logout xq revoca los permisos al elminar el token del sessionstorage
				console.log("login out")			 // y del store de la app
				setStore({token: null})	
			},

			login: async (email, password) =>{    // realiza el post con la informacion del email y password para que el backend compare y si coincide 
				try{									// recibe el token de vuelta
				const resp = await fetch('https://jubilant-winner-g4qwv5qp6w6gcw4v6-3001.app.github.dev/api/token', {
            		method: 'POST',
            		headers: {                                 // es importante especificar en el header el tipo de contenido
                		"Content-Type": "application/json",     
            		},
            		body: JSON.stringify({                    // el body es un json que se convierte a string para que el servidor
                		"email": email,                       // lo pueda entender
                		"password": password,
            		})
        		})
            		if(resp.status !== 200) {               // la respuesta es un string que se convierte a json para que el 
						alert("numero equivocado flaco");    // front lo pueda entender en este caso la respuesta es el token que se creo en el back mediante la ruta create_token
						return false
					}
					
					const data = await resp.json();
					console.log("this came from the backend", data)     // sessionStorage o localStorage permiten almacenar datos en el front end
                	sessionStorage.setItem("token", data.access_token) // durante el run time inclcuso si se recarga la pagina, puedes usarlos con .setItem o .getItem segun sea el caso
					setStore({token: data.access_token})		      // data es la respuesta con el objeto que contiene el token, luego se obtiene el token con el key .acces_token                                                
					setStore({currentUser: email})
				}
				catch(error){                                      
                	console.error("there was an error loggin in!", error)
            	}
			},

			singup: async (email, password) =>{  // la ruta singUp debe crearse en el back ya lo hize ahorita hay un semi error de si repito el usuario no lo crea pero se fukea el msj de repuesta
				try{									
				const resp = await fetch('https://jubilant-winner-g4qwv5qp6w6gcw4v6-3001.app.github.dev/api/singup', {
            		method: 'POST',
            		headers: {                                 
                		"Content-Type": "application/json",     
            		},
            		body: JSON.stringify({                    
                		"email": email,                       
                		"password": password,
						"is_active": false,
            		})
        		})
            		if(resp.status !== 201) {                
						alert("Ese usuario ya existe");    
						return false
					}
					const data = await resp.json();
					console.log("this came from the backend", data)     
				}
				catch(error){                                      
                	console.error("there was an error", error)
            	}
			},
			// pendiente por revisar este metodo tiene problemas
			deleteUser: async () =>{            
				const store = getStore()
				const response = await fetch('https://jubilant-winner-g4qwv5qp6w6gcw4v6-3001.app.github.dev/api/deleteUser', {
        		method: 'DELETE',
				headers: {
					"Authorization": "Bearer " + store.token   //añadi el header de Authorization esta info esta en el Basic usage del Flask JWT extended
				},
    			});
    			const result = await response.json();
				console.log('User deleted successfully:', result);
    			return result;
			},

			getMessage: async () => {      // estoy modificando esta funcion para que acute bajo autorizacion del token
				const store = getStore()   // uso el get store para traer el valor de token almacenado en el store
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", {
						headers: {
							"Authorization": "Bearer " + store.token   //añadi el header de Authorization esta info esta en el Basic usage del Flask JWT extended
						}																// 'Authorization: Bearer <JWT>
					})
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
