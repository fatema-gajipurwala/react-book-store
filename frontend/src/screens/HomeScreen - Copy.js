import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, listCategories } from '../actions/productActions';

function HomeScreen(props) {  
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
    dispatch(listCategories(category));
    return () => {
      //
    };
  }, [category,dispatch]);


  return (
    <>
        <section className="slider">
            <div className="container">
                <div id="owl-demo" className="owl-carousel owl-theme">
                    <div className="item">
                        <div className="slide">
                            <img src="./assets/images/slide1.jpg" alt="slide1" height="400" />
                            <div className="content">
                                <div className="title">
                                    <h3>welcome to bookstore</h3>
                                    <h5>Discover the best books online with us</h5>
                                    <form className="form m-0" action={process.env.PUBLIC_URL+"/productlist"}>
                                        <div className="row">
                                            <div className="col-2 offset-4 text-left">
                                                <label>Category</label><br />
                                                <select id="category" name="category">
                                                    <option value="">Select Category</option>
                                                    {categories.map((pcategory) => (
                                                        <option key={ pcategory } value={ pcategory }>{ pcategory }</option>
                                                    ))}
                                                </select>
                                            </div>    
                                            <div className="text-left">
                                                <label>Keyword</label><br />
                                                <input type="text" id="search" name="search" />
                                            </div>    
                                            <div className="col-1 text-left">
                                                <label>&nbsp;</label><div className="clearfix"></div>
                                                <button type="submit" className="btn btn-primary">Search</button>
                                            </div>    
                                        </div>    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="slide">
                            <img src="./assets/images/slide2.jpg" alt="slide1" height="400" />
                            <div className="content">
                                <div className="title">
                                    <h3>welcome to bookstore</h3>
                                    <h5>Discover the best books online with us</h5>
                                    
                                    <form className="form m-0" action={process.env.PUBLIC_URL+"/productlist"}>
                                        <div className="row">
                                            <div className="col-2 offset-4 text-left">
                                                <label>Category</label><br />
                                                <select id="category" name="category">
                                                    <option value="">Select Category</option>
                                                    {categories.map((pcategory) => (
                                                        <option key={ pcategory } value={ pcategory }>{ pcategory }</option>
                                                    ))}
                                                </select>
                                            </div>    
                                            <div className="text-left">
                                                <label>Keyword</label><br />
                                                <input type="text" id="search" name="search" />
                                            </div>    
                                            <div className="col-1 text-left">
                                                <label>&nbsp;</label><div className="clearfix"></div>
                                                <button type="submit" className="btn btn-primary">Search</button>
                                            </div>    
                                        </div>    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
            <>
            <section className="recomended-sec">
                <div className="container">
                    <div className="title">
                        <h2>highly recommendes books</h2>
                        <hr />
                    </div>
                    <div className="row">
                        {products.map((product) => (
                        <div className="col-lg-3 col-md-6" key={product._id}>
                            <div className="item">
                                <Link to={'/product/' + product._id}><img src={product.image} alt="" /></Link>
                                <h3>{ product.name }</h3>
                                <h6><span className="price">Rs{product.price}</span> / <a href={'/product/' + product._id}>Buy Now</a></h6>
                                <div className="hover">
                                    <Link to={'/product/' + product._id}>
                                    <span><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="about-sec">
                <div className="about-img">
                    <figure style={{ background:"url(./assets/images/about-img.jpg)" }}></figure>
                </div>
                <div className="about-content">
                    <h2>About bookstore,</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and Scrambled it to make a type and typesetting industry. Lorem Ipsum has been the book. </p>
                    <p>It has survived not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and</p>
                    <div className="btn-sec">
                        <Link to={process.env.PUBLIC_URL+"/shop"}  className="btn btn-primary">Shop Books</Link>
                    </div>
                </div>
            </section>
            <section className="recent-book-sec">
                <div className="container">
                    <div className="title">
                        <h2>New Release</h2>
                        <hr />
                    </div>
                    <div className="row">
                        {products.map((product) => (
                        <div className="col-lg-2 col-md-3 col-sm-4" key={product._id}>
                            <div className="item">
                                <Link to={'/product/' + product._id}><img src={product.image} alt="" height="260px" /></Link>
                                <h3><Link to={'/product/' + product._id}>{ product.name }</Link></h3>
                                <h6><span className="price">Rs{product.price}</span> / <Link to={'/product/' + product._id}>Buy Now</Link></h6>
                            </div>
                        </div>
                        ))}
                    </div>
            {/*<div className="btn-sec">
                        <Link to={process.env.PUBLIC_URL+"/shop"} className="btn gray-btn">view all books</Link>
                    </div>*/}
                </div>
            </section>
          </>
      )}
    </>
  );
}
export default HomeScreen;
