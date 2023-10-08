import React, { useLayoutEffect, useState, useEffect } from 'react';
import '../styles/main.scss';
import TransactionForm from '../components/transactions';
import Header from '../components/header';
import InitialWallet from '../components/wallet';
import request  from '../utils/request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function HomePage(props) {
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(0)
    const [walletInitialized, setWalletInitialized] = useState(false);
    const [walletId, setWalletId] = useState('');
    const [error, setError] = useState('')
    const [option,setOption] = useState('transactions')

    useEffect(() => {
        let storedWalletId = localStorage.getItem("walletId")
        console.log("stored wallet", storedWalletId)
        if (!storedWalletId) {
            setWalletInitialized(false)
        } else {
            let walletId = JSON.parse(storedWalletId)
            getWalletDetails(walletId)
        }
    }, [])

    const getWalletDetails = async(walletId) =>{
        let options = {
            url : `http://localhost:9094/wallet/${walletId}`,
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            data:{}
        }
        let data = await request(options)
        data  = data.data[0]
        let { balance, name } = data
        setBalance(balance)
        setUsername(name)
        setWalletInitialized(true)
        setWalletId(data._id)

    }
    const setupBalance = async(username, balance) => {
        let options = {
            url : 'http://localhost:9094/setup',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                name: username,
                balance:balance
            }
        }
        console.log("options:",options)
        let res = await request(options)
        console.log("resss",res)
        return res
    }

    const handleInitializeWallet = async(username, balance) => {
        if (!username) {
            setError("enter username !")
        } else {
            // call api 
            let data  = await setupBalance(username,balance)
            if(data && !data.success){
                setError(data.error)
            } else {
                toast.success("Wallet setup success",{autoClose: 2000,hideProgressBar: true })
                localStorage.setItem("walletId", JSON.stringify(data.id))
                setWalletId(data.id)
                setBalance(balance)
                setUsername(username)
                setWalletInitialized(true);
            }
        }
    };
    const handleMenuChange = (option)=>{
        setOption(option)
        props.history.push('/transactions')
    }

    return (
        <>
         <ToastContainer/>
            {!walletInitialized ? (<div>
                <InitialWallet
                    username={username}
                    initialBalance={balance}
                    handleInitializeWallet={handleInitializeWallet}
                    error={error}
                    setError={setError}
                /></div>) : <div>
                <Header
                    walletId={walletId}
                    balance={balance}
                    username={username}
                    option={option}
                    handleMenuChange={handleMenuChange}
                />
                
                <TransactionForm
                walletId={walletId}
                setBalance={setBalance}
                />

            </div>}
        </>

    );
}


export default HomePage

