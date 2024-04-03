import {Link} from 'react-router-dom'
import './Heading.css'

function Navbar(){
    return(
        <div className='navbar'>
           <h3><Link to='/'>Intellect Coin</Link></h3>
           <ul>
              <Link to='Findjob'> Find Job</Link>
              <Link to='Events'>Events</Link>
              <Link to="/Features">Features</Link>
              <Link to="Contact">Contact</Link>
              <Link to='/Whyus'>Why Us?</Link>
              <Link to='/Aboutus'>About Us</Link>
           </ul>
        </div>
    )
}

export default Navbar