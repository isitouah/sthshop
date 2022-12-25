import React, { Fragment, useState, useEffect } from 'react'
import Announcement from '../components/Announcement'
import Navbar from "../components/Navbarprod"
import "./styles/styleProductlist.css"
import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";


const ProductList = () => {
  const [data, setdata] = useState([]);
  const [result, filterResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const url = 'https://dataprod.azurewebsites.net/dataprod';

    var myHeaders = new Headers();
    myHeaders.append("API-Key", "9c3c751c-555f-4ac6-92a2-934a51e78a4b");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then((json => {
        setLoading(false);
        if (result == null) {
          setdata(json)
        } else {
          setdata(json.filter((curData) => {
            return curData.categorie === result;
          }))
        }
      }))
      .catch(error => {
        setLoading(false)
        console.log('error', error)
      });

  }, [result])

  if (loading) {
    return (<div>
      <Navbar />
      <div style={{ width: "100vw", height: "90vh", display: "grid", placeItems: "center" }}><span class="loader"></span></div>
    </div>)
  }


  return (
    <div>
      <Navbar />
      <Announcement />
      <div className="categorie">
        <button onClick={() => filterResult()}>All</button>
        <button onClick={() => filterResult("men")}>Men</button>
        <button onClick={() => filterResult("women")}>Women</button>
        <button onClick={() => filterResult("children")}>children</button>
        <button onClick={() => filterResult("sneakers for men")}>Sneakers for Men</button>
        <button onClick={() => filterResult("sneakers for women")}>Sneakers for Women</button>
        <button onClick={() => filterResult("children's Shoe")}>Children's Shoe</button>
      </div>

      <div className='screen'>
        <div className='carts'>
          {data.map((values) => {
            const { id, price, image, titre } = values;
            return (
              <Fragment key={id} >
                <div className="cart">
                  <img src={image} />
                  <div className='titre'>
                    <h3>{titre}</h3>
                  </div>
                  <div className="info">
                    <div className="icon-left">
                      <ShoppingCartOutlined /><h3>{price}</h3>
                    </div>

                    <Link className="icon-right" to={'/productinfo/' + id} state={values} style={{ textDecoration: 'none', color: 'black' }} ><SearchOutlined /></Link>


                  </div>
                </div>
              </Fragment>
            )
          })}
        </div>

      </div>
    </div>



  )
}

export default ProductList
