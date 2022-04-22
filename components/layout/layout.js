import { Fragment } from "react";
import Footer from "./footer";
import MainMenu from "./main-menu";
import classes from "./layout.module.css";

function Layout(props) {
 
  return (
    <Fragment>
      <section className={classes.grid1}>
        <div className={classes.item1}>
          <MainMenu />
        </div>

        <div className={classes.item2}>
          <main className={classes.main}>{props.children}</main>
        </div>

        <div className={classes.item3}>
          <Footer />
        </div>
      </section>
    </Fragment>
  );
}

export default Layout;
