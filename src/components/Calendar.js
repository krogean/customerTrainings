import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import Trainingslist from './Trainingslist';



const Trainingcalendar = () => {

    const calendarEvents = Trainingslist.state.trainings.map(training => ({
        start: new Date(training.date),
        end: new Date(training.date),
        title: training.activity
    }))

    return (
        <div>
        <h1>   EDES TEKSTIÄ EI NÄY!!!  </h1>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[ dayGridPlugin]}
          events={calendarEvents()} />
        </div>
    )


}
export default Trainingcalendar;