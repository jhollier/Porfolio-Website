import React, { Component } from 'react';
// import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Portfolio from './Components/Portfolio';
import Mathpreppro from './Components/Mathpreppro';
import Ikon from './Components/Ikon';
import Formula1 from './Components/Formula1';
import ISS from './Components/ISS';
import Scroll from './Components/Scroll';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }

  render() {
    return (
      <Router>
        {/* <ScrollToTop> */}
        <Scroll />
          <Switch>
              <Route exact path='/'>
                <div className="App">
                  <Header data={this.state.resumeData.main}/>
                  <About data={this.state.resumeData.main}/>
                  <Resume data={this.state.resumeData.resume}/>
                  <Portfolio data={this.state.resumeData.portfolio}/>
                  <Footer data={this.state.resumeData.main}/>
                </div>
              </Route>
              <Route path='/mathpreppro' >
                <Mathpreppro />
              </Route>
              <Route path='/ikon' >
                <Ikon />
              </Route>
              <Route path='/formula1' >
                <Formula1 />
              </Route>
              <Route path='/ISS' >
                <ISS />
              </Route>
          </Switch>
        {/* </ScrollToTop> */}
      </Router>
    );
  }
}

export default App;
