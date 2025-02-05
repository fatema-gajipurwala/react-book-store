import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listShops } from '../actions/shopActions';

function ShopScreen(props) {  
  const category = props.match.params.id ? props.match.params.id : '';
  const shopList = useSelector((state) => state.shopList);
  const { shops, loading, error } = shopList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listShops(category));

    return () => {
      //
    };
  }, [category, dispatch]);


  return (
    <>
        <div className="breadcrumb">
            <div className="container">
                <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                <span className="breadcrumb-item active">Shop</span>
            </div>
        </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
            <>
            <section className="static about-sec">
                <div className="container">
                    <h2>Shops</h2>
                    <div className="recent-book-sec">
                        <div className="row">
                            {shops.map((shop) => (
                            <div className=" col-sm-4" key={shop._id}>
                              <div className="item">
                                    <Link to={'/shopbooks/' + shop._id}><img src={shop.image} alt="" height="300px" /></Link>
                                    <h3><Link to={'/shopbooks/' + shop._id}>{ shop.name }</Link></h3>
                              </div>
                            </div>
                            ))}
                        </div>
                    </div>    
                </div>
            </section>
          </>
      )}
    </>
  );
}
export default ShopScreen;
