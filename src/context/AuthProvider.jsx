import { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = props => {
	const initialToken = localStorage.getItem('userToken');
	const [favouriteMovie, setfavouriteMovie] = useState([]);
	const [token, setToken] = useState(initialToken);
	const isUserLoggedIn = !!token;
	const addMovie = movie => {
		if (favouriteMovie.find(favmovie => favmovie.id === movie.id)) {
			removeMovie(movie);
		} else {
			setfavouriteMovie(prev => [movie, ...prev]);
		}
	};

	const removeMovie = movie => {
		const filteredMovie = favouriteMovie.filter(filmovie => {
			return movie !== filmovie;
		});
		setfavouriteMovie(filteredMovie);
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
		favouriteMovie,
		removeMovie,
	};
	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
