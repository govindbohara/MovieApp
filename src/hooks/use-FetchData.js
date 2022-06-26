import { useEffect, useState } from 'react';

const useFetchMovies = url => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(url)
			.then(res => {
				return res.json();
			})
			.then(data => {
				setMovies(data.results);
			})
			.catch(err => {
				console.log(err.message);
			});
	}, [url]);
	return { movies };
};
export default useFetchMovies;
