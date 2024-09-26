import classes from './footer.module.css';
import Cert from '../../public/images/footer/cert.png';
import Social from '../../public/images/footer/social.png';
import Link from "next/link";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";

const FooterComponent = () => {
  const screenWidth = UseScreenWidth();
  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);

  return <footer className={classes.footer}>
    <div className={classes.footer_main}>
      <div className={classes.footer_content} style={{ marginBottom: responsive ? "3rem" : "0" }}>
        <strong>About us</strong>
        <div className={classes.footer_nav}>
          <Link href='/about'>Introduction</Link>
          <Link href='#news'>News</Link>
          <Link href='#contact'>Contact</Link>
        </div>
      </div>
      <div className={classes.footer_content} style={{ marginBottom: responsive ? "3rem" : "0" }}>
        <strong>Support</strong>
        <div className={classes.footer_nav}>
          <Link href='#help_booking'>Import Route Instructions</Link>
          <Link href='#searching_order'>Register Instructions</Link>
          <Link href='#questions'>Frequently Asked Questions</Link>
        </div>
      </div>
      <div className={classes.footer_content} style={{ marginBottom: responsive ? "3rem" : "0" }}>
        <strong>Policy</strong>
        <div className={classes.footer_nav}>
          <Link href='#policy'>Terms of Use</Link>
          <Link href='#info_policy'>Privacy Policy</Link>
        </div>
      </div>
      <div className={classes.footer_content} style={{ marginBottom: responsive ? "3rem" : "0" }}>
        <strong>Contact us</strong>
        <div className={classes.footer_nav}>
          <Link href='#email'>support.srouting@gmail.com</Link>
          <Link href='#call'>Call us 0602249017</Link>
          <Link href='#call'>1234 Main Street, Suite 567</Link>
        </div>
        <img style={{ marginTop: responsive ? "1rem" : "0" }} className={classes.cert} width={190} alt='credit_cert' src={Social.src} />
      </div>
      <div className={classes.footer_content}>
        <strong>Certificate</strong>
        <div className={classes.footer_nav} style={{ marginTop: responsive ? "0.5rem" : 0 }}>
          <img className={classes.cert} width={160} src={Cert.src} alt='certificate' />
        </div>
      </div>
    </div>
    <div className={classes.footer_foot}>
      <strong>S-Routing &nbsp; | &nbsp; Shipping Route Management System</strong>
      <div>Website: <Link href='/'>https://srouting.com</Link></div>
      <div>Copyright © 2024 All rights reserved by Team 06</div>
    </div>
  </footer>
};

export default FooterComponent;
