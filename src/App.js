
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home.js';
import NavBar from './NavBar';
import Map from './Map';
import ToiletDetails from './Details';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';
import NotFound from './Reroute';

function App() {
  return (
    <Router>

      <div className="App">
        <NavBar />
        <div className="content">
          <ScrollToTop>
          <Switch>

              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/map">
                <Map />
              </Route>


              <Route exact path="/toiletdetails/:_id">
                <ToiletDetails />
              </Route>

              <Route path="*">
                <NotFound />
              </Route>

          </Switch>
          </ScrollToTop>

        </div>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
