import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';

class Panelrouter extends Component {
    render() {
        return (
          <Router>
          <div> 
                <Route exact path="/" component={Dashboard}/>
                <Route path="/dashboard" component={Dashboard}/>
          </div>
          </Router>
        );
    }
    
}
export default Panelrouter;