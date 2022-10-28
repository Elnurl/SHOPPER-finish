import React, { useEffect } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "./TopSellers.css";
import axios from 'axios'
const TopSellers = () => {
  const [toggle, setToggle] = useState(0);

  const toggleTab = (index) => {
    setToggle(index);
  };
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getPorduct = () => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setLoading(false)
        setData(json);
        setFilter(json)
      });
  };
  useEffect(() => {
    getPorduct();
  }, []);

function addBtn(product) {
  return async ()=>{
    console.log(product)
    await axios.post('http://localhost:8080/api/cart',{
      product_id:product._id,
      color: product.color,
      size: 'm',
      count: 1
    }, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000",withCredentials:true, 'Access-Control-Allow-Credentials': true,'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }
    });
  }
  
}

  const Loading = () => {
    return (
      <>
        <div className="flex justify-center items-center">
          <Skeleton height={350} />
          <Skeleton height={350} />
          <Skeleton height={350} />
          <Skeleton height={350} />
        </div>
      </>
    );
  };
  const filterProduct = (cat) => {
    const updateList = data.filter((x) => x.category === cat);
    setFilter(updateList);
  };
  const ShowProducts = () => {
    return (
      <>
        {filter.map((product) => {
          return (
              <div className="item item-1 hover:bg-slate-200" key={product._id} id={product._id}>
                <Link to={`/product/${product._id}`}>
                  {" "}
                  <img
                    src={product.image}
                    className="hover:scale-y-90 hover:scale-x-90 transition-all ease-in duration-300"
                    alt=""
                  />{" "}
                </Link>
                <span className="badgeintop">New</span>
                <div className="item-info">
                  <Link
                    to={`/product/${product._id}`}
                    className="hover:bg-slate-300"
                  >
                   
                  </Link>
                  <b>
                    <Link to={`/product/${product._id}`}>
                      <h5 className="fw-bold hover:bg-slate-400 ">
                        {product.name}
                      </h5>
                    </Link>
                  </b>
              
                  <span className="price hover:bg-slate-300 cursor-pointer flex justify-between">
                   
                        <button className="crtbtnm" onClick={addBtn(product)}>
                Add to Cart
              </button>
              {product.price} $
                  </span>
                </div>
              </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="py-24">
      <div className="header flex justify-center items-center">
        <p className="font-bold text-4xl">Top month Sellers</p>
      </div>
      <div className="bloc-tabs">
        <button
          className={toggle === 0 ? "tabs active-tabs" : "tabs"}
          onClick={() => {
            setFilter(data);
            toggleTab(0);
          }}
        >
          All
        </button>
        <button
          className={toggle === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => {
            filterProduct("women's clothing");
            toggleTab(1);
          }}
        >
          Women
        </button>
        <button
          className={toggle === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => {
            filterProduct("men's clothing");
            toggleTab(2);
          }}
        >
          Men
        </button>
        <button
          className={toggle === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => {
            filterProduct("jewelery");
            toggleTab(3);
          }}
        >
          Kids
        </button>
      </div>
      <div className="container flex-wrap">
        <div
          className={
            toggle === 0 || toggle === 1 || toggle === 2 || toggle == 3
              ? "content p-0 active-content"
              : "content"
          }
        >
          <div className="items">
            {loading ? <Loading /> : <ShowProducts />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellers;
