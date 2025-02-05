import React, {useState, useEffect} from 'react';
import { Link, useHistory  } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


function Sidebar(props) {  
        const [activeSideMenu, setActiveSideMenu] = useState("");
        const dispatch = useDispatch();
        const history = useHistory();
        
        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;
        
        const handleLogout = () => {
            dispatch(logout());
            history.push("/signin");
        }
        
        useEffect(() => {
            setActiveSideMenu(props.activeMenu);
            return () => {

            };
          }, [props])
        
        return (  
            <ul className="list-group">
                <li className="list-group-item">
                <Link to={process.env.PUBLIC_URL+"/profile"} className={activeSideMenu === 'profile' ? 'active' : ''} onClick={(e) => setActiveSideMenu("profile")}>Profile</Link>
        </li>
        {(userInfo.isAdmin) ? 
                    <>
                <li className="list-group-item"><Link to={process.env.PUBLIC_URL+"/shops"} className={activeSideMenu === 'shops' ? 'active' : ''} onClick={(e) => setActiveSideMenu("shops")}>Shops</Link></li>
                <li className="list-group-item"><Link to={process.env.PUBLIC_URL+"/orders"} className={activeSideMenu === 'orders' ? 'active' : ''} onClick={(e) => setActiveSideMenu("orders")}>Orders</Link></li>
                <li className="list-group-item"><Link to={process.env.PUBLIC_URL+"/products"} className={activeSideMenu === 'products' ? 'active' : ''} onClick={(e) => setActiveSideMenu("products")}>Products</Link></li>
                <li className="list-group-item"><Link to={process.env.PUBLIC_URL+"/users"} className={activeSideMenu === 'users' ? 'active' : ''} onClick={(e) => setActiveSideMenu("users")}>Users</Link></li>
                {/* <li className="list-group-item"><Link to={process.env.PUBLIC_URL+"/report"} className={activeSideMenu === 'report' ? 'active' : ''} onClick={(e) => setActiveSideMenu("report")}>Report</Link></li> */}
                </>
                : (<li className="list-group-item"><Link to={process.env.PUBLIC_URL+"/myorders"} className={activeSideMenu === 'orders' ? 'active' : ''} onClick={(e) => setActiveSideMenu("orders")}>My Orders</Link></li>)}
                <li className="list-group-item"><Link to='#' onClick={handleLogout} className="text-danger">Logout</Link></li>
            </ul>  
        )  
}  
  
export default Sidebar  