import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import oneView from './components/OneView';
import EmployeeSearch from './components/EmployeeSearch';

class Panelrouter extends Component {
    render() {
        return (
          <Router>
          <div> 
                <Route exact path="/" component={EmployeeSearch}/>
                <Route path="/oneView" component={oneView}/>
          </div>
          </Router>
        );
    }
    
}
export default Panelrouter;