import React from 'react';
import Drawer from 'material-ui/Drawer';
import Badge from 'material-ui/Badge';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Cart.css';


const iconStyles = {
  marginRight: 24,
};

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open: false};

    // this.handleToggle = this.handleToggle.bind(this);
    this.handleOpenCart = this.handleOpenCart.bind(this);
    this.handleCloseCart = this.handleCloseCart.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  // handleToggle = () => this.setState({open: !this.state.open});
  handleOpenCart = () => this.setState({open: true});
  handleCloseCart = () => this.setState({open: false});

  render() {
    const beersInCart = this.props.cart.map((beer, index) => {
      return (
        <div className={styles.beerCartItem} key={index}>
          <img src={beer.image} className={styles.beerCartImage} /> 
          <MenuItem primaryText={beer.name} />
        </div>
      );
    });

    return (
      <div>
        <Badge badgeContent={this.props.cart.length} secondary={true} badgeStyle={{top: 12, right: 12}}>
          <IconButton tooltip="Cart" onClick={this.handleOpenCart}>
            <ShoppingCartIcon style={iconStyles} />
          </IconButton>
        </Badge>
        <Drawer
          docked={false}
          openSecondary={true}
          width={500}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <div>Your Shopping Cart</div>
          {beersInCart}
          <RaisedButton className={styles.button} primary onClick={() => {this.handleCloseCart(); this.props.checkout();}} label="Checkout" />
          <RaisedButton className={styles.button} primary onClick={this.handleCloseCart} label="Back" />
        </Drawer>
      </div>
    );
  }
}

Cart.propTypes = {
  cart: React.PropTypes.array
};

export default Cart;
