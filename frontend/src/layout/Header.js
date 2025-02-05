import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listCategories } from '../actions/productActions';

function Header(props) {
        const [activeMenu, setActiveMenu] = useState("/");
    
        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;
        const categoryList = useSelector((state) => state.categoryList);
        const { categories } = categoryList;
        const dispatch = useDispatch();
    
        useEffect(() => {
          dispatch(listCategories());
          return () => {
            //
          };
        }, [dispatch]);



        return (  
            <div>
                <header>
                    <div className="header-top">
                    </div>
                    <div className="main-menu">
                        <div className="container">
                            <nav className="navbar navbar-expand-lg navbar-light">
                            <Link className="navbar-brand" to="/"><img src={process.env.PUBLIC_URL+"/assets/images/logo.jpg"} alt="logo" /></Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="navbar-item">
                                            <Link to={process.env.PUBLIC_URL+"/"} className={activeMenu === '/' ? 'active' : 'nav-link'} onClick={(e) => setActiveMenu("/")}>Home</Link>
                                        </li>
                                        <li className="navbar-item">
                                            <Link to={process.env.PUBLIC_URL+"/shop"} className={activeMenu === 'Shop' ? 'active' : 'nav-link'} onClick={(e) => setActiveMenu("Shop")}>Shop <span className="caret"></span></Link>
                                            <ul className="navbar-subnav">
                                                {categories.slice(0, 5).map((pcategory) => (
                                                        <li className="navbar-subitem">
                                                            <Link to={process.env.PUBLIC_URL+"/category/"+pcategory }>{pcategory}</Link>
                                                        </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="navbar-item">
                                            <Link to={process.env.PUBLIC_URL+"/aboutus"} className={activeMenu === 'aboutus' ? 'active' : 'nav-link'}  onClick={(e) => setActiveMenu("aboutus")}>About</Link>
                                        </li>
                                        <li className="navbar-item">
                                            {userInfo ? (
                                              <>
                                              <Link to={process.env.PUBLIC_URL+"/profile"}  className={activeMenu === 'profile' ? 'active' : 'nav-link'}  onClick={(e) => setActiveMenu("profile")}>{userInfo.name}</Link>
                                      {/*<ul>
                                                <li>
                                                    <Link to={process.env.PUBLIC_URL+"/products"}>Products</Link>
                                                </li>
                                                <li>
                                                    <Link to={process.env.PUBLIC_URL+"/orders"}>Orders</Link>
                                                </li>
                                              </ul>*/}
                                              </>
                                            ) : (
                                              <Link to={process.env.PUBLIC_URL+"/signin"} className="nav-link">Login</Link>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                                <div className="cart ml-0 my-lg-0">
                                    <Link to={process.env.PUBLIC_URL+"/cart"} className="nav-link">
                                        <span><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                                    </Link>    
                                </div>
                        {/*<form className="form-inline my-2 my-lg-0" action={process.env.PUBLIC_URL+"/productlist"}>
                                    <input className="form-control mr-sm-2" name="search" type="search" placeholder="Search here..." aria-label="Search" onChange={(e) => setSearch(e.target.value)} value={search || ''} />
                                    <span className="fa fa-search"></span>
                                </form>*/}
                            </nav>
                        </div>
                    </div>
                </header>
            </div>  
        )  
}  
  
export default Header  
