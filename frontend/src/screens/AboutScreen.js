import React from 'react';
import { Link } from 'react-router-dom';

function AboutScreen(props) {  
  return (
    <>
        <div className="breadcrumb">
        <div className="container">
            <Link className="breadcrumb-item" to={process.env.PUBLIC_URL+"/"}>Home</Link>
            <span className="breadcrumb-item active">About</span>
        </div>
    </div>
    <section className="static about-sec">
        <div className="container">
        <h3>Welcome to Fastmart!</h3>
                <p>Fastmart: On demand delivery of books and stationery ,is the fastest way to search for your choice of books and stationery in yout city and get it delivered in minutes. </p>
                <h3>Our Mission</h3>
                <p>Fastmart is an online platform with a mission to financially support local,independent bookstores
selling books and stationery nearby directly so the customer will get the product delivery in minutes
rather than waiting for days.</p>
                 <p>As more and more people buy their books and stationery online,we wanted to create an
easy,convenient way for you to get your books and stationery and support bookstores at the same
time.</p>
                <p>We hope that Fastmart can help strengthen the fragile ecosystem and margin ecosystem and margin
around bookselling and keep local store and integral part of our culture.</p>
                <p>Fastmart is the idea dedicated to the public good!</p>
                <h3>What People Say?</h3>
                <p>“Thanks to Fastmart,there is no reason to buy books on Amazon anymore!” - ABC</p>
                <p>“Thanks to Fastmart,I got books in just 1 hour.” - ABC </p>
                <h3>Our Team</h3>
                <p>Gajipurwala Fatema</p>
                <p>Aayushi Desai</p>
        </div>
    </section>
    </>
  );
}
export default AboutScreen;
