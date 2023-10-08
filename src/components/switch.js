import React, { useEffect, useState } from 'react';
import '../styles/main.scss';
import { Box } from '@mui/material';

function StyledSwitch(props) {

  const handleToggle = () => {
    props.setIsDebit(props.isDebit === true ? false : true);
  };

  return (
    <Box style={{ padding: '10px', 'margin': '10px' }}>
      <div className='toggle-container'>
        <span className={`option ${props.isDebit === false ? 'active' : ''}`} onClick={handleToggle}>CREDIT</span>
        <span className={`option ${props.isDebit === true ? 'active' : ''}`} onClick={handleToggle} >DEBIT</span>
      </div>
    </Box >
  );
}

export default StyledSwitch;
