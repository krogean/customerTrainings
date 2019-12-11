import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment';

const Trainingslist = () => {
    const [trainings, setTrainings] = useState([])


    useEffect(() => {
        fetchTrainings()
    }, [])


    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => setTrainings(responseData.content))
        .catch(err => console.error(err))
    }

    const dateFormatting = (date) => {
        moment(date).format('DD/MM/YYYY HH:mm')
    }

    const columns = [
        {
            id:"joku",
            Header: 'Date',
            accessor: date => {
                return moment(date.date).format('DD/MM/YYYY HH:mm')
            }
        },
        {
            Header: 'Duration in minutes',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} columns={columns} data={trainings}/>
        </div>
    )
}

export default Trainingslist