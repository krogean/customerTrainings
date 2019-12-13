import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment';


export default function CustomersTrainings () {
    const [trainings, setTrainings] = useState([])


    useEffect(() => {
        fetchCustomersTrainings()
    }, [])


    const fetchCustomersTrainings = (id) => { //id pelkästään näin ei taida riittää
        fetch('https://customerrest.herokuapp.com/api/customers/' + id + '/trainings')
        .then(response => response.json())
        .then(responseData => setTrainings(responseData.content))
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
            id:"joku",
            Header: 'Date',
            accessor: date => {
                return moment(date.date).format('HH:mm DD/MM/YY')
            //accessor: 'date'
            }
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        }
    ]

    return (
        <div>
            <h4>Ei toimi... Oli idea jolla leikin hetken</h4>
            <ReactTable filterable={true} columns={columns} data={trainings}/>
        </div>
    )
}
