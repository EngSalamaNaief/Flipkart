 
 import {createStore,applyMiddleware,compose} from'redux'; 
 import Thunk from 'redux-thunk'; 
 import RootReducer from '../reduceres/RootReducer'; 
 const initialState={}; 
  
  
 const Store=createStore(RootReducer,initialState,compose( 
      applyMiddleware(Thunk)
/* window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__() 
*/ )) 
  
 export default Store;