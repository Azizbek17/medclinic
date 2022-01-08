import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../../assets/Montserrat/stylesheet.css'
import SelectedDoctor from '../../../components/kit/SelectedDoctor/SelectedDoctor'
import { currentDate } from '../../../global/Constants/Constants'
import * as appointmentActions from '../../../redux/actions/appointmentActions'
import * as doctorActions from '../../../redux/actions/doctorActions'
import * as userActions from '../../../redux/actions/userActions'
import ChooseMedService from '../OnlineRecord/ChooseMedService'
import SimpleAlert from './Alert/SimpleAlert'
import ChooseMaster from './ChooseMaster'
import ClientForm from './ClientForm/ClientForm.jsx'
import './index.scss'
import LoadingComponent from './LoadingComponent/LoadingComponent'
import OnlineRecordModal from './OnlineRecordModal/OnlineRecordModal'
import Payment from './Payment/Payment'
import SelectDate from './SelectDate/SelectDate'

class OnlineRecord extends Component {
  state = {
    isLoading: true,
    timesBtnsLoading: undefined,
    page: 1,
    services: [],
    time: '',
    name: '',
    lastname: '',
    gender: -1,
    phone: '',
    doctype: -1,
    docnum: '',
    master: null,
    selectedDate: currentDate,
    isOpenModal: false,
    doctorId: 0,
  }

  componentDidMount() {
    this.props
      .authWebApiUser()
      .then((user) => {
        this.setState({ user })
        this.setState({ errorMessage: '' })
        this.props
          .loadDoctors()
          .then(() => {
            this.setState({ doctors: this.props.doctors })
            this.setState({ isLoading: false })
            this.setState({ errorMessage: '' })
          })
          .catch((error) => {
            this.setState({ errorMessage: 'Ошибка загрузки врачей: ' + error })
          })
      })
      .catch((error) => {
        this.setState({ errorMessage: 'Ошибка авторизации: ' + error })
      })

    

    this.setState({ currentMonth: new Date().getMonth() + 1 })
  }

  onSelectService = (variant) => {
    this.setState({ page: variant })
  }

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSelectTime = (time) => {
    this.setState({ time })
    let duration = this.state.doctorTime * 60000
    var timeArr = time.split(':')
    var minutes = +timeArr[0] * 60 + +timeArr[1]
    var date = new Date(this.state.selectedDate.toDateString())
    var startTime = date.getTime() + minutes * 60000
    var endTime = startTime + duration
    var startDateTime =
      new Date(startTime).toDateString('yyyy-MM-dd') +
      ' ' +
      new Date(startTime).toLocaleTimeString()
    var endDateTime =
      new Date(endTime).toDateString('yyyy-MM-dd') +
      ' ' +
      new Date(endTime).toLocaleTimeString()
    this.setState({ startDateTime })
    this.setState({ endDateTime })
  }

  onSelectMaster = (master, id, time, doctorSpecialities) => {
    this.setState({ doctorId: id })
    this.setState({ master }, () => this.handleClickNext())
    this.setState({ doctorTime: time })
    this.setState({ doctorSpecialities })
    this.setState({ services: [] })
    this.setState({ busyDays: null })
    this.setState({ freeTimes: [] })
    this.setState({ selectedDate: currentDate })
  }

  handleClickNext = () => {
    if (this.state.page === 1) {
      this.setState({ page: 2 })
      this.changeMonth()
    } else {
      this.setState({ page: this.state.page + 1 })
    }
  }

  handleClickPrev = () => {
    if (this.state.page === 2) {
      this.setState({ page: 1 })
      this.changeMonth()
    } else {
      this.setState({ page: this.state.page - 1 })
    }
  }

  toggleModal = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal })
    if (this.state.isOpenModal) {
      // TODO remove it
      this.setState({
        page: 1,
        services: [],
        time: '',
        name: '',
        lastname: '',
        gender: -1,
        phone: '',
        doctype: -1,
        docnum: '',
        master: null,
        selectedDate: '',
      })
    }
  }

  onSelectDate = (date) => {
    this.setState({ timesBtnsLoading: true })
    this.setState({ selectedDate: date })
    let selDate = new Date(date).toDateString('yyyy-MM-dd')
    let data = {
      date: selDate,
      doctorId: this.state.doctorId,
      checkCurrentDate: true,
    }
    this.props
      .loadFreeAppointments(data)
      .then((appointments) => {
        let freeTimes = []
        this.props.appointments.forEach((element) => {
          if (element.Status === 1)
            freeTimes.push(getTimePart(new Date(element.StartTime)))
        })
        this.setState({ freeTimes })
        this.setState({ errorMessage: '' })
        this.setState({ timesBtnsLoading: false })
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'Ошибка загрузки свободного времени: ' + error,
        })
        this.setState({ timesBtnsLoading: false })
      })
  }

  calendarHandleNextClick = () => {
    const { selectedDate } = this.state
    const selectedMonth = selectedDate.getMonth() + 1
    this.setState({
      selectedDate: new Date(selectedDate.setMonth(selectedMonth)),
    })
    this.setState({ busyDays: null })
    this.setState({ freeTimes: [] })
    this.changeMonth()
  }

  calendarHandlePrevClick = () => {
    const { selectedDate } = this.state
    const selectedMonth = selectedDate.getMonth() - 1
    this.setState({
      selectedDate: new Date(selectedDate.setMonth(selectedMonth)),
    })
    this.setState({ busyDays: null })
    this.setState({ freeTimes: [] })
    this.changeMonth()
  }

  changeMonth = () => {
    const selectedDate = this.state.selectedDate
    const selectedMonth = selectedDate.getMonth() + 1
    if (this.state.currentMonth <= selectedMonth) {
      const year = selectedDate.getFullYear()
      let data = {
        month: selectedMonth,
        year: year,
        doctorId: this.state.doctorId,
      }
      this.props
        .loadBusyDays(data)
        .then((days) => {
          this.setState({ busyDays: this.props.appointments })
          this.setState({ errorMessage: '' })
        })
        .catch((error) => {
          this.setState({
            errorMessage: 'Ошибка загрузки нерабочих и занятых дней: ' + error,
          })
        })
    }
    if (new Date().getMonth() + 1 !== this.state.selectedDate.getMonth() + 1) {
      Array.from(
        document.querySelectorAll('.react-calendar__tile--active')
      ).forEach((el) => {
        console.log(el.classList)
        el.classList.add('bd-none')
      })
    }
  }
  onSubmit = () => {
    let patient = {
      Name: this.state.name,
      SName: this.state.lastname,
      Sex: this.state.gender === 1,
      Phone: this.state.phone
        .replace(/[^\d]/g, '')
        .split('')
        .splice(3)
        .join(''),
    }
    let appointmentData = {
      FromDateTime: this.state.startDateTime,
      ToDateTime: this.state.endDateTime,
      DoctorId: this.state.doctorId,
      Patient: patient,
      Services: this.state.services.map((a) => a.Id),
    }

    this.setState({ isLoading: true })
    this.props
      .createAppointment(appointmentData)
      .then(() => {
        this.toggleModal()
        this.setState({ isLoading: false })
        this.setState({ errorMessage: '' })
      })
      .catch((error) => {
        this.setState({ errorMessage: 'Ошибка создания приёма: ' + error })
      })
  }

  render() {
    const {
      page,
      isLoading,
      services,
      time,
      name,
      lastname,
      gender,
      phone,
      doctype,
      docnum,
      master,
      isOpenModal,
      selectedDate,
    } = this.state
    return (
      <React.Fragment>
        {isLoading ? (
          <LoadingComponent errorMessage={this.state.errorMessage} />
        ) : (
          <div className="container">
            <div className="online-record-root">
              {this.state.errorMessage && (
                <SimpleAlert
                  severity="error"
                  errorMessage={this.state.errorMessage}
                />
              )}
              {page === 1 && (
                <ChooseMaster
                  onSelectMaster={this.onSelectMaster}
                  errorMessage={this.state.errorMessage}
                />
              )}
              {page === 2 && (
                <div>
                  <SelectedDoctor
                    master={master}
                    doctorSpecialities={this.state.doctorSpecialities}
                  />
                  <SelectDate
                    selectedTime={this.state.time}
                    onSelectTime={this.onSelectTime}
                    inputChangeHandler={this.inputChangeHandler}
                    onSelectDate={this.onSelectDate}
                    selectedDate={selectedDate}
                    calendarHandleNextClick={this.calendarHandleNextClick}
                    calendarHandlePrevClick={this.calendarHandlePrevClick}
                    handleClickNext={this.handleClickNext}
                    times={this.state.freeTimes}
                    timesBtnsLoading={this.state.timesBtnsLoading}
                    doctorId={this.state.doctorId}
                    busyDays={this.state.busyDays}
                    handleClickPrev={this.handleClickPrev}
                  />
                </div>
              )}
              {page === 3 && (
                <div>
                  <SelectedDoctor
                    master={master}
                    doctorSpecialities={this.state.doctorSpecialities}
                  />
                  <ChooseMedService
                    onSelect={this.onSelectServiceVariant}
                    selectedOptions={services}
                    handleClickNext={this.handleClickNext}
                    doctors={this.props.doctors}
                    doctorId={this.state.doctorId}
                    doctorTime={this.state.doctorTime}
                    startDateTime={this.state.startDateTime}
                    endDateTime={this.state.endDateTime}
                    doctorSpecialities={this.state.doctorSpecialities}
                    handleClickPrev={this.handleClickPrev}
                    errorMessage={this.state.errorMessage}
                  />
                </div>
              )}
              {page === 4 && (
                <ClientForm
                  name={name}
                  lastname={lastname}
                  gender={gender}
                  phone={phone}
                  doctype={doctype}
                  docnum={docnum}
                  inputChangeHandler={this.inputChangeHandler}
                  handleClickNext={this.handleClickNext}
                  handleClickPrev={this.handleClickPrev}
                />
              )}
              {page === 5 && (
                <Payment
                  selectedOptions={services}
                  selectedTime={time}
                  master={master}
                  selectedDate={selectedDate}
                  onSubmit={this.onSubmit}
                  handleClickNext={this.handleClickNext}
                  handleClickPrev={this.handleClickPrev}
                  doctorSpecialities={this.state.doctorSpecialities}
                />
              )}
              {isOpenModal && (
                <OnlineRecordModal
                  isOpenModal={isOpenModal}
                  onClose={this.toggleModal}
                />
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

OnlineRecord.propTypes = {
  appointments: PropTypes.array.isRequired,
  createAppointment: PropTypes.func.isRequired,
  loadFreeAppointments: PropTypes.func.isRequired,
  authWebApiUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  freeTimes: PropTypes.object,
  doctors: PropTypes.array.isRequired,
  loadDoctors: PropTypes.func.isRequired,
  busyDays: PropTypes.array,
  loadBusyDays: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    appointments: state.appointments,
    user: state.user,
    doctors: state.doctors,
    services: state.services,
    busyDays: state.busyDays,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createAppointment: (appointment) =>
      dispatch(appointmentActions.createAppointment(appointment)),
    loadFreeAppointments: (appointment) =>
      dispatch(appointmentActions.loadFreeAppointments(appointment)),
    authWebApiUser: (user) => dispatch(userActions.authWebApiUser(user)),
    loadDoctors: (doctor) => dispatch(doctorActions.loadDoctors()),
    loadBusyDays: (data) => dispatch(appointmentActions.loadBusyDays(data)),
  }
}

function getTimePart(date) {
  var h = (date.getHours() < 10 ? '0' : '') + date.getHours()
  var m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  return h + ':' + m
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineRecord)
