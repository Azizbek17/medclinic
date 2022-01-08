import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setDoctorTabs } from '../redux/actions/doctorTabsAction'

const DoctorTab = ({ doctors, specialities }) => {
  const dispatch = useDispatch()

  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlSpecialityId = parseInt(
      urlParams.get('specialityId') &&
      urlParams.get('specialityId').replace(/"/g, '')
    )
    const urlSpeciality = specialities.find((speciality) => {
      return speciality.Id === urlSpecialityId
    })
    urlSpeciality && dispatch(setDoctorTabs(urlSpeciality.Name))
  }, 400)

  const setDoctorTabHandler = (e) => {
    dispatch(setDoctorTabs(e.target.value.toLowerCase()))
  }

  const doctorTab = useSelector(
    (s) => s.doctorTabsReducer.doctorTab
  ).toLowerCase()

  return (
    <div className="choose-master-root__tabs">
      <Link to={'/'}>
        <button
          className={`${doctorTab === 'все' ? 'active' : ''
            } btn choose-master-root__tab`}
          onClick={setDoctorTabHandler}
          value={'все'}
        >
          Все
        </button>
      </Link>
      {doctors.map((doctor, idx) => {
        const speciality = doctor.SpecialityName.toLowerCase()
        return (
          <Link to={`/`}>
            <button
              className={`${doctorTab === speciality ? 'active' : ''
                } btn choose-master-root__tab`}
              onClick={setDoctorTabHandler}
              value={speciality}
              id={doctor.IdSpeciality}
              key={idx}
            >
              {doctor.SpecialityName}
            </button>
          </Link>
        )
      })}
    </div>
  )
}

export default DoctorTab
