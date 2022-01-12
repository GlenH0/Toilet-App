import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { FaHome, FaMapMarkedAlt, FaChevronLeft } from "react-icons/fa";
import logo from "./assets/logo.svg";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { useState } from "react";

const NavBar = (props) => {
  const useStyles = makeStyles({
    paper: {
      background: "#34759d",
      color: "white",
      /*  width : "5rem" */
      /*  height : "25%" */
    },
  });

  const styles = useStyles();

  return (
    <div>
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{ paper: styles.paper }}
      >
        <List>
          <ListItem>
            <FaChevronLeft
              className="chevron-left"
              size={30}
              onClick={() => props.setOpen(false)}
            />
          </ListItem>
          <ListItem>
            {/* <img size={34} src={logo} alt="" className="links-logo" /> */}
          </ListItem>
          <ListItem>
            <NavLink exact activeclass="active" className="links-btn" to="/">
              <FaHome size={34} />
            </NavLink>
          </ListItem>
        </List>
        <ListItem>
          <NavLink activeclass="active" className="links-btn" to="/map">
            <FaMapMarkedAlt size={34} />
          </NavLink>
        </ListItem>
      </Drawer>
    </div>
  );
};

export default NavBar;

{
  /* <div className="navBar">
            <div className="links">
                <img src={logo} alt="" className="links-logo"/>

                <NavLink exact activeclass='active' className='links-btn' to="/"  ><FaHome size={34}/></NavLink>
                
                <NavLink activeclass='active' className='links-btn'  to="/map" ><FaMapMarkedAlt size={34}/></NavLink>
            </div>
        </div> */
}
