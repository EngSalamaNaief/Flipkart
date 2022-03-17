import {Link} from "react-router-dom";
import {useState} from "react";
function Navbar(){
  const [dropdwon,setDropdwon]=useState(false);
  return(
    <div className="sticky top-0 w-full text-white bg-blue-900">
      <div className="container m-auto px-2 md:px-0 py-2">
        <div className="flex justify-between">
          <Link to="/" className="text-3xl">Amezona</Link>
          <div className="flex ">
            <div className="relative pr-4">
              <img onClick={()=>setDropdwon(!dropdwon)} src="./img/hero.jpg" alt="" className="h-10 w-10 rounded-full object-cover cursor-pointer" />
              <div className={`absolute top-12 rounded-md right-0 bg-blue-900 py-4 px-1 border-t border-white ${dropdwon?"block":"hidden"}`}>
                <div className="">
                   <div class="py-2 px-3 cursor-pointer">
                     Profile
                   </div>
                   <div class="py-2 px-3 cursor-pointer">
                     Logout
                   </div>
                </div>
              </div>
            </div>
            <div className="relative cursor-pointer">
              <div className="mt-3 font-semibold">Card </div>
              <div class="absolute bottom-6 right-2 bg-red-600 text-white flex justify-center px-1.5 text-sm items-center rounded-full">
                9
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default (Navbar);