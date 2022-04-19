import { Fragment } from "react";
import Footer from "./footer";
import MainMenu from "./main-menu";
import classes from "./layout.module.css";

function Layout(props) {
  return (
    <Fragment>
      <div className={classes.container}>
        {" "}
        <header className={classes.header}>
          <MainMenu />
        </header>
        <main className={classes.main}>{props.children}</main>
        <footer className={classes.footer}>
          <Footer />
        </footer>
      </div>
    </Fragment>
  );
}

export default Layout;
