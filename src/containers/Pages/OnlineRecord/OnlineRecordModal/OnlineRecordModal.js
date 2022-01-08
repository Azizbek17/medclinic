import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import React from 'react'
import Logotype from '../../../../components/kit/Logo/Logotype'
import '../index.scss'
import { centerName } from './../../../../constants.json'

const OnlineRecordModal = ({ isOpenModal, onClose }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="online-record-modal"
      open={isOpenModal}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenModal}>
        <div className={'online-record-modal__paper'}>
          <Logotype width="120" />
          <h2 className="online-record-modal__title">
            Заявка на запись успешно отправлена!
          </h2>
          <p className="online-record-modal__subtitle">
            В течении 5 минут менеджер клиники {centerName} свяжется с Вами для
            подтверждения записи
          </p>
          <button className={'btn online-record-modal__btn'} onClick={onClose}>
            OK
          </button>
        </div>
      </Fade>
    </Modal>
  )
}

export default OnlineRecordModal
