import {Link} from "react-router-dom";

function Cart({product}){
 const pf=process.env.REACT_APP_PUBLIC_FOLDER
return(
<div className="md:w-1/3 w-full">
  <div className=" p-4">
    <div className="md:h-72 h-auto box w-full rounded-md border border-gray-300">
       <Link to={{pathname:`/productdetails/${product.id}`,product:product}}  className="w-full h-2/3 cursor-pointer">
         <img src={pf+"/"+product.img} alt="" className="rounded-t-md"/>
       </Link>
       <div className="px-2 py-3 md:py-0">
          <Link to={{pathname:`/productdetails/${product.id}`,product:product}} className="w-full capitalize text-blue-900 text-2xl cursor-pointer font-meduim">
              {product.name}
           </Link>
            
           <div className="w-full">
             {product.rating}
           </div>
           <div className="w-full flex justify-between">
              <div className="">
                       Price: ${product.price}
               </div>
              <div className="">
                       Offer: ${product.offers}
               </div>
           </div>
       </div>
    </div>
  </div>
</div>
)
}
export default (Cart);