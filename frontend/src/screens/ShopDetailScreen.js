import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsShop } from '../actions/shopActions';
import { shopProducts,listCategories } from '../actions/productActions';

function ShopDetailScreen(props) {
  const shopDetails = useSelector((state) => state.shopDetails);
  const { shops, loading, error } = shopDetails;
  
  const shpProducts = useSelector((state) => state.shpProducts);
  const { products } = shpProducts;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const [search, setSearch] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  let lsearch = window.location.search;
  let params = new URLSearchParams(lsearch);
  let searchKeyword = (params.get('search')) ? params.get('search') : '';
  let category = (params.get('category')) ? params.get('category') : '';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsShop(props.match.params.id));
    dispatch(shopProducts(props.match.params.id,category,searchKeyword));
    dispatch(listCategories(category,searchKeyword));
    return () => {
      //
    };
  }, [dispatch, props, category, searchKeyword]);
  
  const sortHandler = (e) => {
    dispatch(shopProducts(props.match.params.id,category,searchKeyword, e.target.value));
  };
  
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
            <>
            <div className="breadcrumb">
                <div className="container">
                    <Link className="breadcrumb-item" to={process.env.PUBLIC_URL+"/"}>Home</Link>
                    <Link className="breadcrumb-item" to={process.env.PUBLIC_URL+"/shop"}>Shop</Link>
                    <span className="breadcrumb-item active">{shops.name}</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                        <div className="float-left">
                            <img src={shops.image} alt="" className="m-0" height="180px" />
                        </div>
                        <div className="float-left ml-3">
                            <h2 className="m-0">{shops.name}</h2>
                            <small className="text-muted">- {shops.owner}</small>
                            <div>&nbsp;</div>
                            <dl class="row">
                                <dt class="col-sm-3">Address:</dt>
                                <dd class="col-sm-9">{shops.address}</dd>
                                <dt class="col-sm-3">Phone:</dt>
                                <dd class="col-sm-9">{shops.phone}</dd>
                            </dl>
                        </div>
                        <div className="float-left ml-3">
                            {shops.description}
                        </div>
                        <div className="clearfix"></div>
                    <hr />
                    <div className="row">
                        <div className="col-9">
                            <form className="form m-0" action={process.env.PUBLIC_URL+"/shopbooks/"+shops._id}>
                                <div className="row">
                                    <div className="col-4">
                                        <label>Category</label>
                                        <select id="category" name="category">
                                            <option value="">Select Category</option>
                                            {categories.map((pcategory) => (
                                                <option key={ pcategory } value={ pcategory } selected={(category === pcategory) ? "selected" :""}>{ pcategory }</option>
                                            ))}
                                        </select>
                                    </div>    
                                    <div className="col-5">
                                        <label>Keyword</label>
                                        <input type="text" value={search}  onChange={(e) => setSearch(e.target.value)} id="search" name="search" />
                                    </div>    
                                    <div className="col-3">
                                        <label>&nbsp;</label><div className="clearfix"></div>
                                        <button type="submit" className="btn btn-primary">Search</button>
                                    </div>    
                                </div>    
                            </form>   
                        </div>    
                        <div className="col-3 form m-0">
                            <label>Sort By</label>{' '}
                            <select name="sortOrder" onChange={sortHandler}>
                              <option value="">Newest</option>
                              <option value="lowest">Lowest</option>
                              <option value="highest">Highest</option>
                            </select>
                        </div>
                    </div>
                    <div className="recent-book-sec">
                        {products.length === 0 ? <h4 align='center'>No Products Found</h4> : (
                        <div className="row">
                        {products.map((product) => (
                        <div className=" col-sm-4" key={product._id}>
                            <div className="item">
                                <Link to={'/product/' + product._id}><img src={product.image} alt="" /></Link>
                                <h3><Link to={'/product/' + product._id}>{ product.name }</Link></h3>
                                <h6><span className="price">Rs{product.price}</span>
                                {(userInfo.isAdmin) ? '' : (<Link to={'/product/' + product._id}>Buy Now</Link>)}
                                      </h6>
                            </div>
                        </div>
                        ))}
                        </div>
                        )}
                    </div>
                </div>
            </section>
        </>
      )}
    </div>
  );
}
export default ShopDetailScreen;
