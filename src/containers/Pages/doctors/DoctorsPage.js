import React from 'react'
import { connect } from 'react-redux'
import * as doctorActions from '../../../redux/actions/doctorActions'
import PropTypes from 'prop-types'
import DoctorsList from './DoctorList'

class DoctorsPage extends React.Component {
  componentDidMount() {
    this.props.loadDoctors().catch((error) => {
      alert('Loading doctors failed: ' + error)
    })
  }

  render() {
    return <DoctorsList doctors={this.props.doctors} />
  }
}

DoctorsPage.propTypes = {
  doctors: PropTypes.array.isRequired,
  loadDoctors: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    doctors: state.doctors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadDoctors: (doctor) => dispatch(doctorActions.loadDoctors()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsPage)
