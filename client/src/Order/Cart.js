import React from 'react';
import "./Cart.css";
import Popover from '@material-ui/core/Popover';
import { Close } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    calculateTotal() {
        let total = 0;

        for(var k in this.props.cartItems) {
            total += this.props.cartItems[k].price*this.props.cartItems[k].quantity;
        }

        return total.toLocaleString("en-US", {style: "currency", currency: "USD"});
    }

    removeItem(id) {
        this.props.removeItemFromCart(id);
    }

    getItems() {
        let items = [];

        for(var k in this.props.cartItems) {
            items.push(this.props.cartItems[k]);
        }

        return items;
    }

    render() {
        return (
            <Popover
                className="Cart"
                open={this.props.open}
            >
                <IconButton
                    onClick={this.props.close}
                >
                    <Close />
                </IconButton>
                Ready to place your order?
                <div className="CartContent">
                    <Grid
                        container
                        className="CartGrid"
                        direction="column"
                        justify="left"
                        alignItems="left"
                        spacing={16}
                    >
                        {
                            this.getItems().map((item) => {
                                return (<CartItem key={item.id} item={item}></CartItem>);
                            })
                        }
                    </Grid>
                    <div className="CartActions">
                        <b>Total:</b> {this.calculateTotal()}
                        <br />
                        <Button
                            className="CheckoutButton"
                            onClick={this.props.checkout}
                            styles={{}}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </Popover>
        );
    }
}

class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card
                className="CartItem"
            >
                <CardContent>
                    <CardMedia
                        className="CartItemCardMedia"
                        component="img"
                        image={this.props.item.image}
                    ></CardMedia>
                    {this.props.item.quantity} {this.props.item.name}<br />
                    ${this.props.item.price * this.props.item.quantity}
                </CardContent>
            </Card>
        );
    }
}

export default Cart;