import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const { isUserLoggedIn, logOut } = useAuthContext();
	const navigate = useNavigate();

	return (
		<>
			<div
				style={{
					display: ' flex',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}
			>
				{isUserLoggedIn && <NavLink to={'/'}>Home</NavLink>}
				<div
					style={{
						display: ' flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '1rem',
					}}
				>
					{!isUserLoggedIn && <NavLink to={'/signup'}>Sign-up</NavLink>}
					{isUserLoggedIn && <NavLink to={'/favs'}>favourite</NavLink>}
					{isUserLoggedIn && (
						<NavLink
							to="/signup"
							onClick={() => {
								logOut();
								navigate('/signup', { replace: true });
							}}
						>
							Logout
						</NavLink>
					)}
				</div>
			</div>
		</>
	);
};
export default Header;
