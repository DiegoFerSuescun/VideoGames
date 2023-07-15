import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

// Conexión a la extensión del navegador "Redux DevTools"
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	// Poder hacer peticiones a la API
	composeEnhancer(applyMiddleware(thunkMiddleware))//!peticiones a servidor externo
);

export default store;