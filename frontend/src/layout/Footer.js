import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {  
    render() {  
        return (  
            <div>
                <footer>
                    <div className="container">
                        <br></br>
                        <div className="row">
                            <div className="col-sm-5">
                                <img src={process.env.PUBLIC_URL+"/assets/images/logofooter.png"} style={{width:250 , height:100}}></img>
                                <p>Contact us:
                                    fastmartondemanddelivery@gmail.com</p>
                            </div>
                            <div className="col-sm-3">
                                <ul>
                                    <li>
                                        <Link  to={process.env.PUBLIC_URL+"/"}>Home</Link>    
                                    </li>
                                    <li>
                                        <Link  to={process.env.PUBLIC_URL+"/shop"}>Shop</Link>
                                    </li>
                                    <li>
                                        <Link  to={process.env.PUBLIC_URL+"/aboutus"}>About Us</Link>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div className="col-sm-3">
                                <ul>
                                    <li>Social links</li>
                                    <li> 
                                        <button type="button" class="btn btn-social-icon btn-facebook" style={{marginRight:5}}><i class="fa fa-facebook"></i></button>
                                        <button type="button" class="btn btn-social-icon btn-twitter" style={{marginRight:5}}><i class="fa fa-twitter"></i></button> 
                                        <button type="button" class="btn btn-social-icon btn-instagram" style={{marginRight:5}}><i class="fa fa-instagram"></i></button>
                                    </li>           
                                </ul>
                            </div>
                        </div>
                        <br></br>    
                        <div className="row">
                            <div className="col-md-5">
                            </div>
                            <div className="col-md-4">
                                &copy; copyright fastmart
                            </div>
                        </div>                                             
                    </div>
                </footer>
            </div>  
        )  
    }  
}  
  
export default Footer