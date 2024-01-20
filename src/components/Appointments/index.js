// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleText: '',
    dateInput: '',
    appointmentsList: [],
    isStarredFilterActive: false,
  }

  onAddComment = event => {
    event.preventDefault()
    const {titleText, dateInput} = this.state
    const formatDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      titleText,
      formatDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleText: '',
      dateInput: '',
    }))
  }

  onTextChange = e => {
    this.setState({titleText: e.target.value})
  }

  onChangeDate = e => {
    this.setState({dateInput: e.target.value})
  }

  onStarChange = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  toggleStarredFilter = () => {
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  render() {
    const {
      titleText,
      dateInput,
      appointmentsList,
      isStarredFilterActive,
    } = this.state
    const filteredResults = isStarredFilterActive
      ? appointmentsList.filter(appointment => appointment.isStarred)
      : appointmentsList

    return (
      <div className="bg-container">
        <div className="inner">
          <form onSubmit={this.onAddComment}>
            <div className="inner-container">
              <div>
                <h1 className="head">Add Appointment</h1>
                <label htmlFor="title" className="titleLabel">
                  TITLE
                </label>
                <br />
                <input
                  id="title"
                  placeholder="Title"
                  className="inputTitle"
                  value={titleText}
                  onChange={this.onTextChange}
                />
                <br />
                <label htmlFor="date" className="dateLabel">
                  Date
                </label>
                <br />
                <input
                  id="date"
                  type="date"
                  className="dateInput"
                  value={dateInput}
                  onChange={this.onChangeDate}
                />
                <br />
                <button type="submit" className="addBtn">
                  Add
                </button>
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  className="appointimage"
                  alt="appointments"
                />
              </div>
            </div>
            <hr className="hr" />
            <div className="appointments">
              <h3>Appointments</h3>
              <button
                type="button"
                className="para"
                onClick={this.toggleStarredFilter}
              >
                Starred
              </button>
            </div>
            <ul className="ullist">
              {filteredResults.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  eachDetail={eachAppointment}
                  onClick={this.onStarChange}
                />
              ))}
            </ul>
          </form>
        </div>
      </div>
    )
  }
}
export default Appointments
