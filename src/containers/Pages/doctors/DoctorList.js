import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const DoctorList = ({ doctors, onSelectMaster, inputSearch }) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlDoctorId = parseInt(
      urlParams.get('doctorId') && urlParams.get('doctorId').replace(/"/g, '')
    )
    const urlDoctor = doctors.find((doctor) => {
      return doctor.Id === urlDoctorId
    })
    if (urlDoctor) {
      onSelectMaster(urlDoctor.Name, urlDoctor.Id, urlDoctor.DefaultTime, [
        {
          id: urlDoctor.Id,
          name: urlDoctor.SpecialityName,
        },
      ])
    }
  }, [doctors, onSelectMaster])
  const selectedSpeciality = useSelector(
    (s) => s.doctorTabsReducer.doctorTab
  ).toLowerCase()

  return doctors
    .filter((doctor) => doctor.Name.toLowerCase().includes(inputSearch))
    .sort((a, b) => {
      if (a.Name > b.Name) {
        return 1
      }
      if (a.Name < b.Name) {
        return -1
      }
      return 0
    })
    .map((doctor) => {
      const date = new Date(doctor.NearestFreeTime)
      const options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
      }
      let specialities = doctors.find(
        (doc) => doc.Id === doctor.Id
      ).specialities
      if (
        selectedSpeciality === 'все' ||
        selectedSpeciality === doctor.SpecialityName.toLowerCase()
      ) {
        return (
          <div
            key={doctor.Id}
            className="choose-master-root__master"
            onClick={() =>
              onSelectMaster(
                doctor.Name,
                doctor.Id,
                doctor.DefaultTime,
                specialities
              )
            }
          >
            <div className="d-flex">
              <div className="choose-master-root__avatar">
                {doctor.Photo ? (
                  <img
                    src={`data:image/png;base64,${doctor.Photo}`}
                    alt=""
                    style={{
                      width: '78px',
                      height: '78px',
                      borderRadius: '15px',
                      border: 'none',
                    }}
                  />
                ) : (
                  doctor.Name.charAt().toUpperCase()
                )}
              </div>
              <div className="d-flex flex-column">
                <div className="choose-master-root__master-name">
                  {doctor.Name.toLowerCase()}
                </div>
                <p className="choose-master-root__speciality">
                  {doctor.SpecialityName}
                </p>
                {doctor.NearestFreeTime ? (
                  <div className="choose-master-root__time">
                    <p>
                      Ближ. прием {`${date.toLocaleDateString('ru', options)}`}
                    </p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        )
      } else {
        return ''
      }
    })
}

DoctorList.propTypes = {
  doctors: PropTypes.array,
}

export default DoctorList
