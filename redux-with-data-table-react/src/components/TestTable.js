


class Table extends React.Component {
    render() {
        return (
            <BootstrapTable data={ products } bordered={ false }>
                <TableHeaderColumn dataField='id' isKey>Emp Id</TableHeaderColumn>
                <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}