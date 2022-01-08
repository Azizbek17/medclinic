import React from 'react';

const SelectedDoctor = ({ master, doctorSpecialities }) => {
  return (
    <div>
      <div className="d-flex choose-master-root__master justify-content-start align-items-center">
        <div className="choose-master-root__avatar">
          {master.charAt().toUpperCase()}
        </div>
        <div className="d-flex flex-column">
          <div className="choose-master-root__master-name">
            {master.toLowerCase()}
          </div>
          <p className="choose-master-root__speciality">
            {doctorSpecialities[0].Name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SelectedDoctor;