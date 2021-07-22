import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux'
import { current_item_added } from '../actions/auth'

var uniqid = require('uniqid');

const columns = [
  { id: 'customer_name', label: 'Name', minWidth: 170 },
  { id: 'phone_number', label: 'Phone\u00a0No.', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'product_name',
    label: 'Product\u00a0Name',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'enquiry_for',
    label: 'Enquiry\u00a0For',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  // {
  //   id: 'paid',
  //   label: 'Paid',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
];

function createData(customer_name, phone_number, email, product_name,enquiry_for) {
  return {customer_name, phone_number, email, product_name,enquiry_for};
}

 


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


const rows = [

];
const uniqueEmails = []

function StickyHeadTable({user}) {
    console.log(user.product_enquires)
user.product_enquires.map((item)=>{
    
    if(!uniqueEmails.includes(item.id)){

        rows.push( createData(item.customer_name,item.phone_number,item.email,item.product_name,item.enquiry_for,item.paid,),)
        uniqueEmails.push(item.id)
    }
    return 0
    
})

console.log("roessss",rows)


  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (

    <Paper className={classes.root}>
      <br />

                <div className='title'>
      <center style={{fontSize:'2rem'}}>My Enquires &nbsp;&nbsp;</center>

      </div>
      <br />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={uniqid()}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover aria-checked='true'  role="checkbox" tabIndex={-1} key={uniqid()}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={uniqid()} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}



 const mapStateToProps = state => {
       return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem}
}

  
export default connect(mapStateToProps, {current_item_added})(StickyHeadTable)

