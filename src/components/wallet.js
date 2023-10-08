
import React from 'react'
import '../styles/main.scss'
import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Divider } from '@mui/material';
import BalanceInput from './inputBalance';
import TextInput from './inputText';


function InitialWallet(props) {
  const [inputText, setInputText] = useState('');
  const [amount, setAmount] = useState(0)

  const handleKeyDown = (e) => {
    // Prevent entry of the minus sign (-) in the input
    if (e.key === '-') {
      e.preventDefault();
    }
  };
  const handleAmountChange = (e) => {
    // Ensure the input value is not negative
    console.log(e.target.value)
    const inputValue = e.target.value;

    if (parseFloat(inputValue) >= 0 || inputValue === '') {
      setAmount(parseFloat(inputValue));
    }
  };
  const handleInputText = (text)=>{
    setInputText(text)
    props.setError('')
  }
  return (
    <div className="home-page">
      <h1 className="label-text">Setup A Wallet</h1>
      <Divider />
      <Box style={{display:'flex',padding:'10px',margin:'0px', justifyContent:'center'}}>
      <span style={{color:'red',  }}>{props.error}</span>
      </Box>
      <TextInput inputText={inputText} title={"Username"} handleInputText={handleInputText}  />
      <BalanceInput amount={amount} handleAmountChange={handleAmountChange}/>
      <Box style={{ padding: '10px', 'margin': '10px' }} >
        <button type="button"  onClick={() => props.handleInitializeWallet(inputText, amount)}>
          Setup Wallet
        </button>
      </Box>
    </div>
  )
}

export default InitialWallet
