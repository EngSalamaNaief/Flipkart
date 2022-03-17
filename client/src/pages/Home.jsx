import Cart from "../components/Cart";
import {useState,useEffect} from "react";
import {productData} from "../domyData";

function Home(){
  const [product,setProduct]=useState();
  
  useEffect(()=>{
     setProduct(productData);
  },[productData])
  return(
    <div className="w-full py-4">
      <div className="container m-auto">
        <div className="md:flex w-full flex-wrap">
          {product?.map(p=>(
          <Cart key={p.id} product={p}/>
          ))}
        </div>
      </div>
    </div>
    )
}
export default (Home);