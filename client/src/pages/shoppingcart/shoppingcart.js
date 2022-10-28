import React, { useState, setState, useEffect } from "react";
// import selectedProduct from "../cartcompanents/shop_data";
import Footer from "../../components/Footer/Footer";
import Promo from "../../components/Promo/Promo";
import Head from "../../components/Header/Head";
// import data from "./Data";
// import SelectedCart from "./selectedCart";
import "./shoppingcart.css";
import axios from "axios";
// import main, { cart } from "../main";
// import data from "../../Data";
// import Cart from "../main";
// import { useState } from "react";
// function createShopCart(kart) {
//   return (
//     <SelectedCart
//       key={kart.id}
//       id={kart.id}
//       name={kart.name}
//       price={kart.price}
//       image={kart.image}
//     />
//   );
// }

export default function Shoppingcart() {
  // const [arr, setArr] = useState([]);
  const [selproducts, setSelproducts] = useState([]);
  const lookup = selproducts.reduce((a, e) => {
    a[e.id] = (a[e.id] || 0) + 1;
    return a;
  }, {});
  const [count, setCount] = useState(lookup);
  const [price, setPrice] = useState(
    selproducts.reduce((sum, object) => {
      return sum + object.price;
    }, 0)
  );
  useEffect(()=>{
    async function getCart(){
      await axios.get('http://localhost:8080/api/cart',{
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000",withCredentials:true, 'Access-Control-Allow-Credentials': true,'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }
      }).then(r=>{
        setSelproducts(r.data);
      })
    }
    getCart();

  },[]);
  useEffect(()=>{
    let a =0;
    for(let i of selproducts){
      a += i.count * i.price;
    }
    setPrice(a);
  },[selproducts]);


  const unique = [...new Set(selproducts)];
 async function Incraese(items) {
    let a = structuredClone(selproducts);
    for(let i in a){
      if(a[i]._id===items._id){
        a[i].count +=1;
      }
    }
    await axios.patch(`http://localhost:8080/api/cart/`,{
    product_id: items.product_id,
    size: items.size,
    color: items.color,
    count: items.count+1
    },{
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000",withCredentials:true, 'Access-Control-Allow-Credentials': true,'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }
      });
    setSelproducts(a);
    // setPrice(price + items.price);
    // console.log(items.price);
    // setSelproducts(selproducts.push(data[`${product.id}`]));
  }
  async function Decrease(items) {
    if(items.count === 1){
      return;
    }
    let a = structuredClone(selproducts);
    for(let i in a){
      if(a[i]._id===items._id){
        a[i].count -=1;
      }
    }
    await axios.patch(`http://localhost:8080/api/cart`,{
    product_id: items.product_id,
    size: items.size,
    color: items.color,
    count: items.count-1 
    },{
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000",withCredentials:true, 'Access-Control-Allow-Credentials': true,'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }
      });
    setSelproducts(a);

    // setCount(count - 1);
    // setPrice(price - items.price);
  }

  // function remvBtn(items) {
  //   setSelproducts(selproducts.filter((itemss) => itemss !== items));
  function remvBtn(items) {
    let a = [];
    for(let i in a){
      if(selproducts[i]._id === items._id){
        let b = structuredClone(selproducts[i]);
        a.push(b);
      }
    }
    // setPrice(price - items.price * count[items.id]);
    // console.log(selproducts.filter((e) => lookup[e.id]));
    // console.log(lookup[`${items.id}`]);
    // setCount(lookup[`${items.id}`]);
    // console.log(lookup);
    // console.log(selproducts.length);
    // console.log(selproducts.indexOf(items));

    // console.log(arr);
  }

  // const [items, setItems] = useState(selectedProduct);
  // const removeItem = (index) => {
  //   console.log(index);*
  //   return (index) => {
  //     console.log(items);
  //     selectedProduct = items.filter(function (value, index, arr) {
  //       return data[` ${value}`].id !== props.id;
  //     });
  //     setItems(selectedProduct);
  //     console.log(items);
  //   };
  //   // setItems();
  // };
  // function removeBtn() {
  //   selectedProduct = selectedProduct.filter(function (value, index, arr) {
  //     return data[` ${value}`].id !== props.id;
  //   });
  //   // setArr(selectedProduct);

  // }
  if (!(selproducts == 0)) {
    return (
      <div>
        <div >
          <Promo />
          <Head />
        </div>
        <div className="shopcart">


          <div>
            <h1 className="h1">Shopping Cart { }</h1>
            <div className="selected">
              {/* {items.map(createShopCart)} */}
              {/* {selproducts.map((items, inx) => {
          const { id, image, name, price } = items; */}
              {unique.map((items, inx) => {
                const { id, image, name, price,count } = items;
                // let price = total;
                // let a = price;
                return (
                  <div key={inx} className="kart">
                    {" "}
                    <div className="img">
                      {" "}
                      <img src={image} alt=".png" />
                      <div>
                        <h4>{name}</h4>
                        <div className="numItem">
                          {" "}
                          <div>            <button
                            disabled={count[id] == 0 ? true : false}
                            onClick={() => Decrease(items)}
                          >
                            {"-"}
                          </button>
                            {count}
                            <button onClick={() => Incraese(items)}>{"+"}</button>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4>{price}$</h4>{" "}
                      <button
                        className="bttn"
                        onClick={() => {
                          remvBtn(items);
                        }}
                      >
                    <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
              {/* <button onClick={removeItem}>remove</button>{" "} */}
            </div>
            {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
            <div className="cupon">
              <div className="cupon1">
                {" "}
                <h4>Coupon code:</h4>
                <input type="text" placeholder="  Enter cupon code*"></input>
                <button>Apply</button>
              </div>
              <div className="btn">
                <button type="button"> Update Cart</button>
              </div>
            </div>
          </div>

          <div className="costrow">
            {" "}
            <div className="Total">
              <div className="subtotal">
                Subtotal
                <p>
                  {/* {selproducts.reduce((sum, object) => {
              return sum + object.price;
            }, 0)} */}
                  {price}$
                </p>
              </div>
              <div className="tax">
                Tax
                <p>00.00$</p>
              </div>
              <div className="total">
                <h3>Total</h3>
                <p>{price}$</p>
              </div>
              <p className="p">Shipping cost calculated at Checkout *</p>
            </div>
            <button>Proceed to Checkout</button>
            <div className="coun">
              {" "}
              <a href="/"> {`< `}Continue Shopping</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else if (selproducts == 0) {
    return (
      <div>
        <Promo />
        <Head />
        <div className="empty">
          <img
            className="emping"
            src="https://www.svgrepo.com/show/17356/empty-cart.svg"
            alt="Cart Empty Image "
          />
          <div className="coment">
            {" "}
            <h4>Your cart is empty! </h4>

            <a href="/"> Go to Shopping</a>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}
