import React, { useState } from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';

export default function BalanceInput(props) {
    const handleKeyDown = (e) => {
        if (e.key === '-') {
          e.preventDefault();
        }
      };
    

    return (
        <div>
            <Box style={{ padding: '10px', 'margin': '10px' }}>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              startAdornment={<InputAdornment position="start">₹</InputAdornment>}
              type="number"
              pattern="[0-9]*"
              placeholder="Enter amount"
              value={props.amount}
              onChange={(e) => props.handleAmountChange(e)}
              onKeyDown={handleKeyDown}
            />
          </FormControl>

        </Box >

        </div>
        

    )
    
}