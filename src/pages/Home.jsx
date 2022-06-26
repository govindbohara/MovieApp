import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import useFetchMovies from '../hooks/use-FetchData';
const url =
	'https://api.themoviedb.org/3/movie/now_playing?api_key=3a201f9e8419e01252ed3ee889cfa6d1&page=1';
// 0:
// adult: false
// backdrop_path: "/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg"
// genre_ids: (3) [14, 28, 12]
// id: 453395
// original_language: "en"
// original_title: "Doctor Strange in the Multiverse of Madness"
// overview: "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary."
// popularity: 10705.828
// poster_path: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
// release_date: "2022-05-04"
// title: "Doctor Strange in the Multiverse of Madness"
// video: false
// vote_average: 7.6
// vote_count: 3069
const Home = () => {
	const data = useFetchMovies(url);
	const navigate = useNavigate();
	const movies = data.movies;
	const { addMovie, isUserLoggedIn, favouriteMovie } = useAuthContext();

	const renderMovies = movies.map((movie, index) => {
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
							addMovie(movie);
							navigate('/favs', { push: true });
						}}
					>
						Add to Favourites
					</button>
				)}
			</div>
		);
	});

	return (
		<>
			<h1>All Movies</h1>
			{renderMovies}
		</>
	);
};
export default Home;
