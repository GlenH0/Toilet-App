
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home.js';
import NavBar from './NavBar';
import Map from './Map';
import ToiletDetails from './Details';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Router>
      
      <div className="App">
        <NavBar/>
      <div className="content">
      
        <Switch>
          <Route exact path ="/">
            <Home/>
          </Route>
            
          <Route exact path="/map">
            <Map/>
          </Route>

          <ScrollToTop>
            <Route exact path="/toiletdetails/:_id">
              <ToiletDetails/>
            </Route>
          </ScrollToTop>
        </Switch>
        
      </div>
    </div>
    
    </Router>
  );
}

export default App;
