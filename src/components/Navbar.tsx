import React, { Component } from "react";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContextConsumer } from "../contexts/CartContext";
import logo from "../images/logo.svg";
import Svg from "./Svg";

export default class Navbar extends Component {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <nav className="nav" data-testid="navbar">
        <div className="nav__left">
          <Link to="/" data-testid="logo">
            <img src={logo} alt="Beach Resort" />
          </Link>
          <ul
            className={this.state.isOpen ? "nav__links-show" : "nav__links"}
            data-testid="navbar-links"
          >
            <li>
              <Link to="/" data-testid="home-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/rooms" data-testid="rooms-link">
                Rooms
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav__right">
          <CartContextConsumer>
            {value => (
              <button
                type="button"
                className="nav__btn"
                onClick={value.handleIsOpen}
              >
                <Svg name={"shopping-cart"} />
              </button>
            )}
          </CartContextConsumer>

          <button
            type="button"
            className="nav__btn"
            onClick={this.handleToggle}
            data-testid="menu"
          >
            <FaAlignRight className="nav__icon" />
          </button>
        </div>
      </nav>
    );
  }
}
