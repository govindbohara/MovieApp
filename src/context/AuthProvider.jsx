import { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = props => {
	const initialToken = localStorage.getItem('userToken');
	const [favouriteMovie, setfavouriteMovie] = useState([]);
	const [token, setToken] = useState(initialToken);
	const isUserLoggedIn = !!token;
	const addMovie = movie => {
		if (favouriteMovie.includes(movie)) {
			console.log('This movies Already exists');
		} else {
			setfavouriteMovie(movie);
			localStorage.setItem('movie', favouriteMovie);
		}
	};
	const login = token => {
		localStorage.setItem('userToken', token);
		setToken(token);
	};
	const logOut = () => {
		localStorage.setItem('userToken', null);
		setToken(null);
	};
	const contextValue = {
		token,
		isUserLoggedIn,
		login,
		logOut,
		addMovie,
	};
	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
