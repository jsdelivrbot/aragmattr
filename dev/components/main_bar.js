import React, { Component } from 'react';
import Logo from './logo';
import Button from '../containers/add_button';

const MainBar = () => {
  return (
    <div className="main-bar">
      <Logo />
      <Button />
    </div>
  );
}

export default MainBar;
