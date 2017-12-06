import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
var roasterList = require('../testJson/dummy.js');
var roasterData = roasterList.getRoasterData();


class Dummy extends React.Component {
    render() {
        return (
            <BootstrapTable data={ roasterData } bordered={ false }>
                <TableHeaderColumn dataField='employeeid' isKey>Emp Id</TableHeaderColumn>
                <TableHeaderColumn dataField='id' isKey>Date</TableHeaderColumn>
               </BootstrapTable>
        );
    }
}