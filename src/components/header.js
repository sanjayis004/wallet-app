import React from 'react';
import '../styles/main.scss'; 
import axios from 'axios';
import Divider from '@mui/material/Divider';
import DownloadIcon from '@mui/icons-material/Download';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Header({walletId, username, balance, option, handleMenuChange }) {
  const downloadCSVFile = async () => {
    try {
      const response = await axios.get(`http://localhost:9094/download/${walletId}`, {
        responseType: 'text',
      });
      const jsonData = response.data
      let jsonDataArr = jsonData.split('\n')
      jsonDataArr.pop()
      const headers = Object.keys(JSON.parse(jsonDataArr[0]));
      const csvRows = [headers.join(',')];
      jsonDataArr.forEach((obj) => {
        obj = JSON.parse(obj)
        const values = headers.map((header) => obj[header]);
        csvRows.push(values.join(','));
      });

      const csvBlob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(csvBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Download Failed",error)
    }

  }

  return (
    <header className="header">
      <ToastContainer/>
      <div className="container">
        <div className="header-content">
          <div className="welcome">
            <span className="welcome-text">Welcome, {username}</span>
          </div>
          <Divider orientation="vertical" color="white" flexItem />
          <button key="button1" className="option-button" onClick={() => handleMenuChange('home')} > {option.toUpperCase()}</button>
          <div>
            {option === 'home' ? <div><button key="button2" className="download-button" onClick={downloadCSVFile} ><DownloadIcon />{"DOWNLOAD"}</button></div> : ''}
          </div>
          <div className="wallet">
            <span className="wallet-text">Balance:</span>
            <span className="wallet-balance"> ₹ {parseFloat(balance).toFixed(4)}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

