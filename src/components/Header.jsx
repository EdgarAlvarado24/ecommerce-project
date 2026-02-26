import { NavLink, useNavigate, useSearchParams } from 'react-router';
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import './Header.css'
import { useState } from 'react';

export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  let totalQuantity = 0;
  
  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || "");

  const updateSetSearchInput = (e) =>{
    setSearch(e.target.value)
  }

  const searchProducts = () =>{
    navigate(`/?search=${search}`)
  }
  
  cart.forEach((cartItem)=>{
    totalQuantity += cartItem.quantity;
  })

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src={LogoWhite} />
            <img className="mobile-logo"
              src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" onChange={updateSetSearchInput}/>

          <button className="search-button" onClick={searchProducts}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}