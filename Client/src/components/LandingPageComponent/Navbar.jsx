import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar(){
    return(
        <div className={styles.navhead}>
           <h3 className={styles.navheader}><Link to='/'>Intellect Coin</Link></h3>
           <ul className={styles.navheading}>
              <Link to="Contact">Contact us</Link>
              <Link to='/Whyus'>Why Us?</Link>
              <Link to='/Aboutus'>About Us</Link>
           </ul>
        </div>
    )
}

export default Navbar