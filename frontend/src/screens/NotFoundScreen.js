import React from 'react';
import { Link } from 'react-router-dom';
function NotFoundScreen() {  
    return (
            
            <div>
                <h1 style={{fontSize: '140px',textAlign: 'center'}}>404</h1>
                <p style={{fontSize: '50px',textAlign: 'center'}}>Page Not Found</p>
                <p style={{textAlign:"center",margin:'2em auto 10em'}}>
                  <Link to="/" className="btn btn-primary">Go to Home Page </Link>
                </p>
              </div>
    )  
}
export default NotFoundScreen;