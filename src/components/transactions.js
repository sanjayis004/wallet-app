import React, { useState } from 'react';
import styled from 'styled-components';
import StyledSwitch from './switch';
import request from '../utils/request';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import BalanceInput from './inputBalance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput  from './inputText'
import SubmitButton  from './submitButton';
import '../styles/main.scss'

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TransactionBox = (props) => {
  console.log(props)
  const [isDebit, setIsDebit] = useState(false); // Default to credit
  const [amount, setAmount] = useState(0)
  const [inputText, setInputText] = useState('');
  const [description, setDescription] = useState('')


  const executeTransaction = async (amountValue, isDebit) => {
    let options = {
      method: 'post',
      url: `http://localhost:9094/transact/${props.walletId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        amount: isDebit ? -amountValue : amountValue,
        description: description == '' ? 'gift' : description
      }
    };

    console.log("options:", options)
    let data = await request(options)
    console.log(data)
    data = data.data
    let balance = parseFloat(data.balance)
    props.setBalance(balance)
    toast.success("Transaction successful!", { autoClose: 2000, hideProgressBar: true })
  }

  const handleSubmit = async () => {
    // Handle the form submission here, including the "isDebit" and "amount" values
    console.log("amount in handle submit..", amount)
    if (parseFloat(amount) <= 0) {
      toast.error("Amount should be greater than 0!")
    } else {
      await executeTransaction(parseFloat(amount), isDebit)
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
  const handleDescriptionChange = (e) => {
    console.log(e.target.value)
    const inputValue = e.target.value;
    setDescription(inputValue)
  }
  
  const handleInputText = (text)=>{
    setInputText(text)
  }

  return (
    <div className='page-container'>
      <div  className='box-container'>
        <ToastContainer />
        <h2 className='header-title'>Execute Transaction</h2>
        <Divider />
        {/* <Box style={{ padding: '10px', 'margin': '10px' }}>
          <div className='toggle-container'> */}
            <StyledSwitch isDebit={isDebit} setIsDebit={setIsDebit} />
          {/* </div>
        </Box > */}
        <BalanceInput amount={amount} handleAmountChange={handleAmountChange}/>
        <TextInput inputText={inputText} title={"description"} handleInputText={handleInputText}/>
        <SubmitButton handleSubmit={handleSubmit} buttonLable={"SUBMIT"}/>
      </div>
    </div>
  );
};

export default TransactionBox;


// 1. session in backedn
// 2. this pages css to amin scss
// 3. remove all inline css
// 4. return true valid or not
