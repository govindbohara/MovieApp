import './App.css';
import Signup from './Components/Signup/Signup';

import Header from './Components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favourite from './pages/favs';


function App() {
	

	return (
		<>
			<div>
				<Header />
			</div>
			<main>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/signup" element={<Signup />}></Route>
					<Route path="/favs" element={<Favourite />}></Route>
				</Routes>
			</main>
		</>
	);
}

export default App;
