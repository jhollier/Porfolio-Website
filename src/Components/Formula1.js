import React from 'react';
import { Link } from 'react-router-dom';

const Formula1 = () => {
    return (
        <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
        <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

        <ul id="nav" className="nav">
            <li><Link to='/'classname="smoothscroll" >Home</Link></li>
            <li><Link to='/mathpreppro'classname="smoothscroll" >MathPrepPro</Link></li>
            <li><Link to='/ikon'classname="smoothscroll" >Ikon</Link></li>
            <li className='current'><Link to='/formula1'classname="smoothscroll" >Formula1</Link></li>
        </ul>
  </nav>
    )
}

export default Formula1
