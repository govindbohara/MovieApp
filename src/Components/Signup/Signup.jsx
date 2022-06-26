import { useRef, useState } from 'react';
import { Button } from '@mantine/core';
import { Input } from '@mantine/core';
import { At } from 'tabler-icons-react';
import { PasswordInput } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const btnStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginTop: '1rem',
};
const Signup = () => {
	const [isLogin, setIsLogin] = useState(false);
	const navigate = useNavigate();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const { token, login, logout, isLoggedIn } = useAuthContext();

	const submitHandler = event => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		let url;
		if (isLogin) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQ9hTMkwHL2oIKNt6uG-kYqOhsKMGJIZo';
		} else {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQ9hTMkwHL2oIKNt6uG-kYqOhsKMGJIZo';
		}
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: enteredEmail,
				password: enteredPassword,
				returnSecureToken: false,
			}),
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					let error = 'Autjentication failed';
					throw new Error(error);
				}
			})
			.then(data => {
				login(data.idToken);
				navigate('/', { replace: true });
			})
			.catch(err => {
				alert(err.message);
			});
	};

	return (
		<>
			<form
				onSubmit={submitHandler}
				style={{ margin: '2rem auto auto auto', maxWidth: '35rem' }}
			>
				<Input
					style={{ marginTop: '1rem' }}
					label="Email"
					icon={<At />}
					placeholder="Your email"
					ref={emailInputRef}
				/>

				<PasswordInput
					placeholder="Password"
					label="Password"
					description="Password must include at least one letter, number and special character"
					required
					ref={passwordInputRef}
				/>
				<div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
					{/* <button type="submit">{isLogin ? 'Sign-up' : 'LogIn'}</button>
					 */}
					<Button
						type="submit"
						variant="gradient"
						gradient={{ from: 'teal', to: 'lime', deg: 105 }}
					>
						{isLogin ? 'Sign-up' : 'LogIn'}
					</Button>
					<div style={btnStyle}>
						<span>
							{isLogin ? 'Dont have an Account?' : 'Already have an account?'}
						</span>

						<a
							style={{ cursor: 'pointer' }}
							onClick={() => setIsLogin(prev => !prev)}
						>
							{isLogin ? 'Login' : 'Sign-up'}
						</a>
					</div>
				</div>
			</form>
		</>
	);
};
export default Signup;
