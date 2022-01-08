import PropTypes from 'prop-types'
import React from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import SelectServiceOption from './SelectServiceOption'
import './selectService.scss'

const SelectService = ({ onSelect, categories, services, selectedOptions }) => {
  if (categories.length === 0) return <LoadingComponent />
  else {
    return categories.map((category) => {
      let filteredServices = []
      filteredServices = services.sort((a, b) => {
        if (a.Name > b.Name) {
          return 1
        }
        if (a.Name < b.Name) {
          return -1
        }
        return 0
      })
      let totalCount = 0
      for (let some of selectedOptions) {
        if (filteredServices.some((el) => el.Id === some.Id)) {
          totalCount++
        }
      }
      return (
        <div className="select-service-root">
          <h4 className="select-service-root__title">
            Все услуги врача <span>({totalCount})</span>
          </h4>
          {filteredServices &&
            filteredServices.map((el, idx) => (
              <SelectServiceOption
                onSelect={onSelect}
                item={el}
                key={idx}
                isChecked={selectedOptions.some((it) => it.Id === el.Id)}
              />
            ))}
        </div>
      )
    })
  }
}

SelectService.propTypes = {
  categories: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
}

export default SelectService
