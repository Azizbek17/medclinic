import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { BASE_URL } from '../../../global/Constants/Constants'
import { getPhotos, getNearestFreeTime } from '../../../constants.json'

const SharePage = () => {
  const [doctors, setDoctors] = useState([])

  axios({
    method: 'GET',
    headers: {
      Session_Id: localStorage.getItem('Session_Id'),
    },
    url: `${BASE_URL}api/Doctor/GetVisibleDoctors`,
    params: {
      isShowInSchedule: true,
      isShowPhoto: getPhotos,
      isAddNearestFreeTime: getNearestFreeTime,
    },
  }).then(({ data }) => {
    setDoctors(data.Data)
  })

  return (
    <div>
      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
          border: '10px solid #e1e1e1',
          borderRadius: '15px',
          marginTop: '50px',
          fontSize: '26px',
          textAlign: 'center',
        }}
      >
        Ссылки чтобы поделиться врачами
        {doctors.map((el, idx) => (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
              borderBottom: '10px solid #e1e1e1',
              padding: '0 20px',
            }}
          >
            <div key={idx}>{el.Name}</div>
            <div>{`${window.location.origin}/?doctorId="${el.Id}"`}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
          border: '10px solid #e1e1e1',
          borderRadius: '15px',
          marginTop: '50px',
          fontSize: '26px',
          textAlign: 'center',
        }}
      >
        Ссылки чтобы поделиться специальностями
        {doctors.map((el, idx) => (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
              borderBottom: '10px solid #e1e1e1',
              padding: '0 20px',
            }}
          >
            <div key={idx}>{el.SpecialityName}</div>
            <div>{`${window.location.origin}/?specialityId="${el.IdSpeciality}"`}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SharePage
