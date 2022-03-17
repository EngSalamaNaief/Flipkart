import RootPage from './pages/RootPage';
import {Provider} from "react-redux";
import Store from './redux/store/Store';

function App() {

  return (
 <Provider store={Store}>
    <RootPage/>
   </Provider>
  );
}
export default (App);
