import ResponsiveAppBar from './components/Header';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';

import './App.css';
import SignUP from './components/Signup';
import SignIn from './components/Signin';
import AddItem from './components/AddItems';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Error from './components/Error';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={ShoppingCart} />
				<Route exact path="/store" component={ShoppingCart} />
				<Route exact path="/signup" component={SignUP} />
				<Route exact path="/signin" component={SignIn} />
				<Route exact path="/add items" component={AddItem} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path="/error" component={Error} />
			</Switch>
		</BrowserRouter>
	);
};
// const Home = () => {
// 	return (
// 		<div>
// 			<h1>Home</h1>
// 		</div>
// 	);
// };

function App() {
	return (
		<div className="App">
			<ResponsiveAppBar />
			<AppRouter />
		</div>
	);
}

export default App;
