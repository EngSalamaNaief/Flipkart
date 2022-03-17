import {useLocation} from "react-router-dom";
import {useEffect,useState} from "react";

function ProductsDetails(){
  const product=useLocation().product;
  const[qtyArray,setQtyArray]=useState([])
  const pf=process.env.REACT_APP_PUBLIC_FOLDER
  useEffect(()=>{
    let arr=[]
     for(let i=1;i<=product?.stock;i++){
       arr.push(i)
     }
       setQtyArray(arr)
  },[product])
  return(
     <div>
     {!product?(
     <div className="container m-auto">
        <div className="p-4 mt-8 rounded bg-red-100 text-red-500 border border-red-500">Product Not Found</div>
     </div>
     ):(
     <div className="p-4 h-full">
        <div className="container m-auto">
          <div className="grid md:grid-cols-3">
             <div className="h-full  p-2">
               <img src={`${pf}/${product.img}`} alt="" className="h-full w-full object-cover" />
             </div>
          <div className="p-2">
             <div className="h-auto">
               <div className="px-2 py-3 md:py-0">
                  <div className="w-full capitalize text-blue-900 text-2xl cursor-pointer font-meduim">
                     {product?.name}
                   </div>
                   <div className="w-full">
                     {product?.rating}
                   </div>
                   <div className="w-full flex justify-between">
                      <div className="line-throw">
                               Price: ${product?.price}
                       </div>
                      <div className="">
                               Offer: ${product?.offers}
                       </div>
                   </div>
                    <div className="w-full">
                     Description:<br/>{product?.desc}
                   </div>
               </div>
          </div>
             </div>
             <div className="p-2">
             <div className="py-2 px-3 rounded border border-blue-900 bg-red-50 h-auto">
                 <div className="flex justify-between py-2">
                      <span>Price:</span>
                      <span className="">${product?.price}</span>
                  </div>
                 <div className="flex justify-between py-2">
                      <span>Status</span>
                      <span className="text-green-400">{product?.stock} peace in stock</span>
                  </div>
                 <div className="flex justify-between py-2">
                      <span>Qty</span>
                      <select className="p-1 border border-black rounded bg-red-50 focus:outline-none">
                        {
                       qtyArray.map(x=>(
                          <option value={x}>{x}</option>
                        ))
                        }
                      </select>
                  </div>
                  <button className="w-full py-1.5 my-2 bg-yellow-400 text-blue-900 border border-blue-900 rounded-md font-semibold">Add to Card</button>
             </div>
             </div>
          </div>
        </div>
     </div>
       )
     }
     </div>
    );
}
export default ProductsDetails;