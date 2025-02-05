import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts,listCategories } from '../actions/productActions';

function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  
  let lsearch = window.location.search;
  let params = new URLSearchParams(lsearch);
  let searchKeyword = (params.get('search')) ? params.get('search') : '';
  let category = (props.match.params.id) ? props.match.params.id : (params.get('category')) ? params.get('category') : '';
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  useEffect(() => {
    setSearch(searchKeyword);
    dispatch(listProducts(category,searchKeyword));
    dispatch(listCategories(category,searchKeyword));
    return () => {
      //
    };
  }, [category,searchKeyword,dispatch]);
  
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
                    <span className="breadcrumb-item active">{searchKeyword}</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <form className="form m-0" action={process.env.PUBLIC_URL+"/productlist"}>
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
                            <div className="col-4">
                                <label>Keyword</label>
                                <input type="text" value={search}  onChange={(e) => setSearch(e.target.value)} id="search" name="search" />
                            </div>    
                            <div className="col-4">
                                <label>&nbsp;</label><div className="clearfix"></div>
                                <button type="submit" className="btn btn-primary">Search</button>
                            </div>    
                        </div>    
                    </form>
                    <h2>Search: {searchKeyword}</h2>
                    <div className="recent-book-sec">
                        {products.length === 0 ? <h4 align='center'>No Products Found</h4> : (
                        <div className="row">
                        {products.map((product) => (
                        <div className="col-lg-2 col-md-3 col-sm-4" key={product._id}>
                            <div className="item">
                                <Link to={'/product/' + product._id}><img src={product.image} alt="" height="260px" /></Link>
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
export default ProductListScreen;
