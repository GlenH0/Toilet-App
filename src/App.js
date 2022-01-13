import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import Home from "./Home.js";
import NavBar from "./NavBar";
import Map from "./Map";
import ToiletDetails from "./Details";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import NotFound from "./Reroute";
import { useState } from 'react';
import {FaAlignJustify} from "react-icons/fa";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <div className="App">
       {/*  <NavBar open={open} setOpen={setOpen} />
        {!open && <FaAlignJustify size={30} className="drawer-toggle" onClick={() => setOpen(true)}/>} */}
        <div className="content">
          <ScrollToTop> 
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>

              <Route exact path="/map">
                <Map />
              </Route>

              <Route
                exact
                path="/toiletdetails/:_id"
                children={<ToiletDetails />}
              />

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
