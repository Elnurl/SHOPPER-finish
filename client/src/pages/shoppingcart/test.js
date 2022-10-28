import React from "react";

function test() {
  return (
    <div>
      {" "}
      <div>
        <h1 className="h1">Shopping Cart {}</h1>
        <div className="selected">
          {/* {items.map(createShopCart)} */}
          {/* {selproducts.map((items, inx) => {
        const { id, image, name, price } = items; */}
          {unique.map((items, inx) => {
            const { id, image, name, price } = items;
            let a = price;
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
                      <button
                        disabled={count[id] == 0 ? true : false}
                        onClick={() => Decrease(items)}
                      >
                        {"<"}
                      </button>
                      {count[id]}
                      <button onClick={() => Incraese(items)}>{">"}</button>
                    </div>
                  </div>
                </div>
                <div>
                  <h4>{price}</h4>{" "}
                  <button
                    className="bttn"
                    onClick={() => {
                      remvBtn(items);
                    }}
                  >
                    {"X  "}Remove
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
    </div>
  );
}

export default test;
