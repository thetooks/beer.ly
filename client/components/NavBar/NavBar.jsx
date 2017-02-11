import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Cart from '../Cart/Cart';
import styles from './NavBar.css';
import Avatar from 'material-ui/Avatar';

class Nav extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.object,
    profile: PropTypes.object,
    cart: PropTypes.array,
    showProfile: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.auth.loggedIn()
    };
  }

  handleClick() {
    if ( this.props.auth.loggedIn() ) {
      this.props.auth.logout();
    } else {
      this.props.auth.login();
    }
    this.setState({ isLoggedIn: this.props.auth.loggedIn() });
  }

  render() {
    const isHomePage = this.props.location.pathname === '/';
    const logo = isHomePage ? styles.lightLogo : styles.logo;
    const login = isHomePage ? styles.lightLogin : styles.Login;
    const navbar = isHomePage ? styles.transparentNavbar : styles.navbar;
    const profile = this.props.auth.loggedIn() ? this.props.profile : {};
    const loginLogout  = this.props.auth.loggedIn() ? 'Logout' : 'Login';
    const cart = isHomePage ? null : <Cart className={styles.cart} cart={this.props.cart} location={this.props.location.pathname} checkout={this.props.checkout} inCheckout={this.props.inCheckout}/>;
    return (
        <nav className={navbar}>
          <h1>
            <Link to="/" className={logo}>Beer.ly</Link>
            <Link className={styles.profilePic} onClick={this.props.showProfile} >
              { this.props.auth.loggedIn() &&  <Avatar src={profile.picture}  /> }
            </Link>
            <Link  className={login} onClick={this.handleClick.bind(this)} >{loginLogout}</Link>
          </h1>
          <ul>
            <li>
              {cart}
            </li>
          </ul>
        </nav>
    );
  }
}

export default Nav;
