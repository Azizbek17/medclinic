import React from 'react';
import { Link } from 'react-router-dom';
import './home-page-btn.scss'

const HomePageBtn = ({onClick}) => {
  return (
    <Link to='/' onClick={onClick} className='home-page-btn'>Назад</Link>
  );
};

export default HomePageBtn;