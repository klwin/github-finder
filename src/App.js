import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import GithubState from './components/context/github/GithubState';
import User from './components/users/User';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

const App = () => {
	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/about' component={About} />
							<Route exact path='/user/:login' component={User} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
