import { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import axios from 'axios';
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
} from '../types';

let githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
let githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: '',
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	//Search Users
	const searchUsers = async (text) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		dispatch({ type: SEARCH_USERS, payload: res.data.items });
	};

	//Get User
	const getUser = async (user) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${user}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		dispatch({ type: GET_USER, payload: res.data });
	};

	//Get Repos
	const getUserRepos = async (user) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		dispatch({ type: GET_REPOS, payload: res.data });
	};

	//Set Loading
	const setLoading = () => {
		dispatch({ type: SET_LOADING });
	};

	//Clear Users
	const clearUsers = () => {
		dispatch({ type: CLEAR_USERS });
	};

	return (
		<GithubContext.Provider
			value={{
				user: state.user,
				users: state.users,
				loading: state.loading,
				repos: state.repos,
				searchUsers,
				getUser,
				getUserRepos,
				clearUsers,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
