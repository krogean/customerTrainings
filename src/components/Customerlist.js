import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
//import Trainingslist from './Trainingslist';

export default function Customerlist () {
    const [customers, setCustomers] = useState([])
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')


    useEffect(() => {
        fetchCustomers()
    }, [])

    const handleClose = (event, reason) => {
        setOpen(false)
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchCustomers())
            .then(res => setMessage('Customer deleted'))
            .then(res => setOpen(true))
            .catch(err => console.error(err))
        }
    }

    const saveCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then(res => fetchCustomers())
        .catch(err => console.error(err)) 
    }

    const customersTrainings = (customer) => { //tiedän, että tää homma on väärin + ei toimi
        fetch('https://customerrest.herokuapp.com/api/customers/links[0]/trainings')
        .then(response => response.json())
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link,
            {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
            .then(res => fetchCustomers())
            .then(res => setMessage('Changes saved succesfully'))
            .then(res => setOpen(true))
            .catch(err => console.error(err))
    }

    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Streetaddress',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Header: 'Trainings',
            Cell: ({value}) => <p>(activities 404)</p> //joo..
        },
        //{
            //Header: 'Trainings',
            //accessor: 'links[2].href',
            //Cell: ({value, original}) => <Trainingslist link={value} customer={original} />
            //^tää näyttää homman ihan väärin...
            
            //Header: 'Trainings', //tiedän, että tää homma on väärin + ei toimi
            //accessor: 'links[3].href',
            //Cell: ({value, original}) => <customersTrainings link={value} customer={original}/>
        //},
        {
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original}/>,
            filterable: false,
            sortable: false,
            width: 80
            //tässä ei nyt joku toimi... ei tallenna muutosta, mutta sanoo "changes saved succesfully"...
            //toimi aikasemmin, mutta en löydä mitään eroa
        },
        {
            accessor: 'links[0].href',
            filterable: false,
            sortable: false,
            width: 80,
            Cell: ({value}) => 
                <Button size="small" color="secondary" onClick={() => deleteCustomer(value)}>Delete</Button>
        }
    ]

    return (
        <div>
            <Addcustomer saveCustomer={saveCustomer}/>
            <ReactTable filterable={true} columns={columns} data={customers}/>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message}/>
        </div>
    )
}