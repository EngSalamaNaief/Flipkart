import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "./Home"
import ProductDetails from "./ProductDetails"

function RootPage() {
  
  return (
      <Router > 
         <Navbar/>
         <Switch>
            <Route path="/" exact><Home/></Route>
            <Route path="/productdetails/:id"><ProductDetails/></Route>
         </Switch>
      </Router>
   
  );
}


export default (RootPage);
