import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../styles/main.scss'
import request from '../utils/request';
import Header from '../components/header';
import TableSortLabel from '@mui/material/TableSortLabel'



const columns = [
    { id: '_id', label: 'Transaction ID', minWidth: 100 },
    {
        id: 'balance',
        label: 'Balance',
        minWidth: 10,
        align: 'right',
        format: (value) => value.toFixed(4),
    },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toFixed(4),
    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 190,
        align: 'center',
    },
    {
        id: 'type',
        label: 'Type',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'description',
        label: 'Description',
        minWidth: 100,
        align: 'right',
    },


];

export default function TransactionPage(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])
    const [totalCount, setTotalCount] = React.useState(0)
    const [balance, setBalance] = React.useState(0)
    const [username, setUsername] = React.useState('')
    const [option, setOption] = React.useState('home')
    const [sortOrder, setSortOrder] = React.useState('desc')
    const [sortColumn, setSortColumn] = React.useState('date')
    const [walletId, setWalletId] = React.useState('')

    React.useEffect(() => {
        let storedWalletId = localStorage.getItem('walletId')
        if (!storedWalletId) {
            window.location.replace('/home')
        } else {
            console.log(storedWalletId)
            let walletId = JSON.parse(storedWalletId)
            setWalletId(walletId)
            let skip = page * rowsPerPage
            let limit = rowsPerPage
            fetchData(walletId, skip, limit)
            getWalletDetails(walletId)
        }
    }, [page, rowsPerPage])


    const getWalletDetails = async (walletId) => {
        let options = {
            url: `http://localhost:9094/wallet/${walletId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
            }
        }
        console.log("options:", options)
        let data = await request(options)
        console.log(data)
        data = data.data[0]
        let balance = data.balance
        let name = data.name
        setBalance(balance)
        setUsername(name)
    }
    const fetchData = async (walletId, skip, limit) => {
        console.log("going to call for ", sortColumn, sortOrder)

        let options = {
            method: 'GET',
            url: `http://localhost:9094/transactions?walletId=${walletId}&skip=${skip}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`,

            headers: { 'Content-Type': 'application/json' }
        };

        console.log("options:", options)
        let data = await request(options)
        console.log(data)
        data = data.data[0]
        let transactionList = data.transactions
        let totalCount = data.totalCount.length ? data.totalCount[0]['count'] : 0
        setRows(transactionList)
        setTotalCount(totalCount)
    }



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleMenuChange = () => {
        setOption(option)
        props.history.push('/home')
    }

    const createSortHandler = async (sortColumn) => {
        console.log("in...", sortColumn)
        let newSortOrder = sortOrder == 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder)
        setSortColumn(sortColumn)
        let skip = page * rowsPerPage
        let limit = rowsPerPage
        console.log("going to sort in", newSortOrder)
        await fetchData(walletId, skip, limit, sortColumn, newSortOrder)
    }
    //const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length)
    const emptyRows =  rowsPerPage - rows.length

    return (
        <React.Fragment>
            <Header
                walletId={walletId}
                balance={balance}
                username={username}
                option={option}
                handleMenuChange={handleMenuChange}
            />
            <div className="centered-container">
                <Paper sx={{ width: '80%', overflow: 'hidden', boxShadow: '0px 2px 5px rgba(00, 55, 66, 0.5)' }}>
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}

                                        >
                                            <TableSortLabel
                                                active={column.id === 'amount' || column.id === 'date'}
                                                direction={column.id == sortColumn ? sortOrder : 'asc'}
                                                onClick={() => createSortHandler(column.id)}
                                            >
                                            </TableSortLabel>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </React.Fragment>

    );
}