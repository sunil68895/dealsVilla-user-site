import React, { useEffect, useState } from "react";
import "./style.css";
import flipkartLogo from "../../images/logo/flipkart2.png";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // state cart value
  const cart = useSelector((state) => state.cart);

   const userSignup = () => {
    const user = { firstName, lastName, email, password };
    let atposition=email.indexOf("@");  
      let dotposition=email.lastIndexOf(".");  
      if (email==="" || atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length)
            alert("Please enter a valid e-mail address"); 
    else if (
      firstName === "" ||
      lastName === "" ||
      password === ""||
      password.length<6
    ) alert('Enter fields properly')
     else
    dispatch(_signup(user));
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    if(auth.error) alert(auth.error)
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      let atposition=email.indexOf("@");  
      let dotposition=email.lastIndexOf(".");  
      if (email==="" || atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length)
            alert("Please enter a valid e-mail address"); 
      else if(password=="" || password.length<6) alert('Invalid password')
      else
      dispatch(login({ email, password }));
      setEmail("")
      setPassword("")
      if(!auth.authenticate) alert(auth.error)
    }
  };
  
  
 /** const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""||
      password.length<6
    ) alert('Enter fields properly')
     else
    dispatch(_signup(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      if(email=="" || password=="" || password.length<6) alert('Enter fields properly')
      else
      dispatch(login({ email, password }));
    }
  };
  **/

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  /**const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.fullName}</a>}
        menus={[
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };
**/
  
   const renderLoggedInMenu = () => {
    return (
      <div style={{display:"flex"}}>

      <div style={{ cursor:"pointer"}}>
            <a className="fullName">{auth.user.fullName}</a>
      </div>

      
      <div style={{ cursor:"pointer"}}>
      <a
      className="cart"
      onClick={() => {
        !auth.authenticate && setLoginModal(true);
      }}>
      Orders
      </a>
      </div>
      
      
      <div style={{cursor:"pointer"}}>
              <a
              className="cart"
              onClick={logout}>
              Logout
              </a>
      </div>
      
      <div>
      <a href={`/cart`} className="cart">
        <Cart count={Object.keys(cart.cartItems).length} />
        <span style={{ margin: "0 10px" }}>Cart</span>
      </a>
    </div>
      
    </div>

      
    );
  };

  const renderNonLoggedInMenu = () => {
    return (

      <div style={{display:"flex"}}>
            <div style={{padding:'0px 5px', cursor:"pointer"}}>
            <a
            className="cart"
            onClick={() => { setSignup(false);  setLoginModal(true); }}>
            Login
            </a>
            </div>

            <div style={{padding:'0px 5px', cursor:"pointer"}}>
            <a
            className="cart"
            onClick={() => {
              setLoginModal(true);
              setSignup(true);
            }}>
            Signup
            </a>
            </div>

            <div>
            <a href={`/cart`} className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>

            
          </div>
      
     
    );
  };
  
  
  
  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email/Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={userLogin}
                />
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{
                    margin: "20px 0",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo  */}
        <div className="logo">
          <a href="/">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        {/* logo ends here */}

        {/* search component */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        {/* search component ends here */}

        {/* right side menu */}
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
         /** <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <a href={`/cart`} className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>**/
        </div>
        {/* right side menu ends here */}
      </div>
    </div>
  );
};

export default Header;
