import React, { useEffect, useState } from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';

export default function InputText(props) {
   
    return (
        <div>
            <Box style={{ padding: '10px', 'margin': '10px' }}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">{props.title}</InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        type="text"
                        value={props.inputText}
                        onChange={(e) => props.handleInputText(e.target.value)}
                    />
                   
                </FormControl>
            </Box >
        </div>
    )
}