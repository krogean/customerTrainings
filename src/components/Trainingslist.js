import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddTraining from './AddTraining';

export default function Trainingslist () {
    const [trainings, setTrainings] = useState([])
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')


    useEffect(() => {
        fetchTrainings()
    }, [])

    const handleClose = (event, reason) => {
        setOpen(false)
    }


    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => setTrainings(responseData.content))
        .catch(err => console.error(err))
    }

    
    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchTrainings())
            .then(res => setMessage('Training deleted'))
            .then(res => setOpen(true))
            .catch(err => console.error(err))
        }
    }

    const saveTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
        .then(res => fetchTrainings())
        .catch(err => console.error(err)) 
    }

    const columns = [
        {
            id:"joku",
            Header: 'Date',
            accessor: date => {
                return moment(date.date).format('HH:mm DD.MM.YYYY')
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
        {
            accessor: 'links[0].href',
            filterable: false,
            sortable: false,
            width: 80,
            Cell: ({value}) => 
            <div>
                <Button size="small" color="secondary" onClick={() => deleteTraining(value)}>Delete</Button>
            </div>
        }
    ]

    return (
        <div>
            <AddTraining saveTraining={saveTraining}/>
            <ReactTable filterable={true} columns={columns} data={trainings}/>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message}/>
        </div>
    )
}
