import { useAuthContext } from '../context/AuthContext';
const Favourite = () => {
	const { isUserLoggedIn, favouriteMovie, removeMovie } = useAuthContext();
	const renderFav = favouriteMovie.map((movie, index) => {
		const imagePath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
		return (
			<div key={index}>
				<h1>{movie.title}</h1>
				<img src={imagePath} alt="image" />
				<p>{movie.overview}</p>
				<h4>{movie.release_date}</h4>
				<h4>{movie.popularity}</h4>
				{isUserLoggedIn && (
					<button
						onClick={() => {
							removeMovie(movie);
						}}
					>
						Remove to Favourites
					</button>
				)}
			</div>
		);
	});
	return (
		<>
			<h2>Favourites</h2>
			<div>{renderFav}</div>
		</>
	);
};
export default Favourite;
