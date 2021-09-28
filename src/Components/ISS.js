import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
    main_paper: {
        marginTop: '7%',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '5%',
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingTop: '5%',
        paddingBottom: '5%'
    }
  }));

const ISS = () => {

    const classes = useStyles();

    return (
        <>
            <div>
                <nav id="nav-wrap">
                    <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                    <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
                    <ul id="nav" className="nav">
                        <li><Link to='/'classname="smoothscroll" >Home</Link></li>
                        <li><Link to='/mathpreppro'classname="smoothscroll" >MathPrepPro</Link></li>
                        <li><Link to='/ikon'classname="smoothscroll" >Ikon</Link></li>
                        <li><Link to='/formula1'classname="smoothscroll" >Formula1</Link></li>
                        <li className='current'><Link to='/ISS'classname="smoothscroll" >ISS</Link></li>
                    </ul>
                </nav>
            </div>
            <Paper className={classes.main_paper} elevation={2}>
                <h2>ISS project coming soon!</h2>
            </Paper>
            <Footer />
        </>
    )
}

export default ISS