import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import GeneralButton from '../../../components/kit/GeneralButton/GeneralButton'
import SelectService from './SelectService/SelectService.jsx'
import * as serviceActions from '../../../redux/actions/serviceActions'
import SimpleAlert from './Alert/SimpleAlert'
import LoadingComponent from './LoadingComponent/LoadingComponent'
class ChooseMedService extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      isLoading: true,
    }
  }

  componentDidMount() {
    let data = {
      DateFrom: this.props.startDateTime,
      DateTo: this.props.endDateTime,
      IdDoctor: this.props.doctorId,
      ByDoctor: true,
    }

    this.props
      .loadServicesByDoctor(data)
      .then((services) => {
        this.setState({ isLoading: false })
        this.setState({ errorMessage: '' })
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'Ошибка загрузки услуг по врачу: ' + error,
        })
      })
  }

  componentWillReceiveProps(props) {
    this.setState({ errorMessage: props.errorMessage })
  }

  onSelectServiceVariant = (id) => {
    const services = this.props.selectedOptions
    if (services.includes(id)) {
      const index = services.indexOf(id)
      services.splice(index, 1)
    } else {
      services.push(id)
    }
    this.setState({ services })
  }

  render() {
    const disabled = this.props.selectedOptions < 1
    return (
      <>
        {this.state.isLoading ? (
          <LoadingComponent errorMessage={this.state.errorMessage} />
        ) : (
          <>
            {this.state.errorMessage && (
              <SimpleAlert
                severity="error"
                errorMessage={this.state.errorMessage}
              />
            )}
            <div className="service-variant-root">
              <h3 className="service-variant-root__title title">
                Выберите услугу
              </h3>
              <SelectService
                onSelect={this.onSelectServiceVariant}
                categories={this.props.doctorSpecialities}
                services={this.props.services}
                selectedOptions={this.props.selectedOptions}
              />
              <div className="d-flex mt-30">
                <GeneralButton
                  className="mr-10"
                  title="Назад"
                  onClick={this.props.handleClickPrev}
                />
                <GeneralButton
                  title="Далее"
                  disabled={disabled}
                  onClick={this.props.handleClickNext}
                />
              </div>
            </div>
          </>
        )}
      </>
    )
  }
}

ChooseMedService.propTypes = {
  services: PropTypes.array,
  loadServicesByDoctor: PropTypes.func.isRequired,
}

// eslint-disable-next-line
Array.prototype.distinct = function (item) {
  var results = []
  for (var i = 0, l = this.length; i < l; i++)
    if (!item) {
      if (results.indexOf(this[i]) === -1) results.push(this[i])
    } else {
      if (results.indexOf(this[i][item]) === -1) results.push(this[i][item])
    }
  return results
}

function mapStateToProps(state) {
  return {
    //categories: state.services.distinct('SpecialityName'),
    services: state.services.slice(0, 100),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadServicesByDoctor: (service) =>
      dispatch(serviceActions.loadServicesByDoctor(service)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMedService)
