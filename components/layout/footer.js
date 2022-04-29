import Link from "next/link";
import { Fragment } from "react";
import classes from "../../styles/footer.module.css";
import Image from "next/image";

function Footer() {
  return (
    <Fragment>
      <div className={classes.containerfooter}>
        <main>
          <div className={classes.footerlogo}>
            <h5> Books-Amigos4All </h5>
          </div>
          <div className={classes.footerlinks}>
            <h6>
              <ul>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/tos">Terms of service</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy policy</Link>
                </li>
              </ul>
            </h6>
          </div>

          <div className={classes.footerredes}>
            <h6>
              <ul>
                <li>
                  <Image
                    src={"/images/footer/fb.png"}
                    id={classes.img}
                    height={20}
                    width={20}
                    alt="facebook"
                  />
                  <Link href="https://www.facebook.com/groups/FragmentosLibros/">
                    Libros
                  </Link>
                </li>
                <li>
                  <Image
                    src={"/images/footer/ig.png"}
                    id={classes.img}
                    height={20}
                    width={20}
                    alt="facebook"
                  />
                  <Link href="https://www.instagram.com/frasesdelibro/">
                    Frasesdelibro
                  </Link>
                </li>
                <li>
                  <Image
                    src={"/images/footer/tw.png"}
                    id={classes.img}
                    height={20}
                    width={20}
                    alt="facebook"
                  />
                  <Link href="https://twitter.com/LibrosEnCitas">
                    @LibrosEnCitas
                  </Link>
                </li>
              </ul>
            </h6>
          </div>
        </main>
        <div className={classes.copyright}>
          <hr />
          <h7>Content © 2022 Amigos4All All Rights Reserved</h7>
        </div>
      </div>
    </Fragment>
  );
}
export default Footer;
