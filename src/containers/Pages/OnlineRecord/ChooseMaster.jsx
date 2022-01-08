import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import SearchIcon from '../../../components/kit/Icons/SearchIcon'
import Logotype from '../../../components/kit/Logo/Logotype'
import * as doctorActions from '../../../redux/actions/doctorActions'
import * as specialityActions from '../../../redux/actions/specialityActions'
import DoctorTab from '../../DoctorTab'
import DoctorList from '../doctors/DoctorList'
import SimpleAlert from './Alert/SimpleAlert'
import LoadingComponent from './LoadingComponent/LoadingComponent'

class ChooseMaster extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      inputSearch: '',
    }
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.props
      .loadSpecialities()
      .then(() => {
        this.setState({ isLoading: false })
        this.setState({ errorMessage: '' })
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'Ошибка загрузки специальностей: ' + error,
        })
      })

    this.props
      .loadDoctors()
      .then(() => {
        this.setState({ isLoading: false })
        this.setState({ errorMessage: '' })
      })
      .catch((error) => {
        this.setState({ errorMessage: 'Ошибка загрузки врачей: ' + error })
      })
  }

  componentWillReceiveProps(props) {
    this.setState({ errorMessage: props.errorMessage })
  }

  render() {
    return (
      <>
        {this.state.errorMessage && (
          <SimpleAlert
            severity="error"
            errorMessage={this.state.errorMessage}
          />
        )}
        <div className="choose-master-root">
          <div className="choose-master-root__title">
            <h3 className="title">Выберите врача</h3>
            <Logotype width="120" />
          </div>
          <label className="choose-master-root__search">
            <SearchIcon
              width="18"
              height="18"
              className="choose-master-root__search-icon"
            />
            <input
              onChange={(e) => {
                this.setState({
                  inputSearch: e.target.value.toLocaleLowerCase(),
                })
              }}
              type="text"
              placeholder="Поиск"
            />
          </label>
          <DoctorTab
            doctors={this.props.doctors}
            selectedSpeciality={this.state.selectedSpeciality}
            specialities={this.props.specialities}
          />
          {this.state.isLoading ? (
            <LoadingComponent />
          ) : (
            <DoctorList
              doctors={this.props.doctors}
              onSelectMaster={this.props.onSelectMaster}
              inputSearch={this.state.inputSearch}
            />
          )}
        </div>
      </>
    )
  }
}

ChooseMaster.propTypes = {
  specialities: PropTypes.array.isRequired,
  doctors: PropTypes.array.isRequired,
  loadSpecialities: PropTypes.func.isRequired,
  loadDoctors: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    specialities: state.specialities.map((speciality) => {
      return {
        ...speciality,
        doctors: state.doctors.filter((doctor) => {
          let allSpecialities = [doctor.SpecialityName].concat(
            doctor.AddSpecialities
          )
          return allSpecialities.find((el) => el === speciality.Name)
        }),
      }
    }),
    doctors: state.doctors.map((doctor) => {
      return {
        ...doctor,
        specialities: state.specialities.filter(
          (speciality) => speciality.Id === doctor.IdSpeciality
        ),
      }
    }),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadSpecialities: (speciality) =>
      dispatch(specialityActions.loadSpecialities()),
    loadDoctors: (doctor) => dispatch(doctorActions.loadDoctors()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMaster)
