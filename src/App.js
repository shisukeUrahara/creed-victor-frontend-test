import React,{useState,useEffect} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {getWeb3,getContract} from './utils';
import Navbar from './Navbar';
import Wallet from './Wallet';

function App() {
  const [web3,setWeb3]=useState(undefined);
  const [accounts,setAccounts]=useState([]);
  const [weenus,setWeenus] = useState(undefined);
  const [tokenBalance,setTokenBalance]=useState(0);
  const [ethBalance,setEthBalance]= useState(0);
  const [pendingTransaction,setPendingTransaction] = useState('');

  const sendTokens= async function(transaction){
    // console.log("**@ the transaction before creating transaction is , ",transaction);
    // console.log("**@ the accounts arrauy is ,",accounts);
    // console.log("**@ the transaction is , ",transaction);
    await weenus.methods
      .transfer(transaction.to, web3.utils.toWei(transaction.amount))
      .send({from: accounts[0]})
      .on('transactionHash',async (tx)=>{
        // console.log("**@ pending tx is , ",tx);
        setPendingTransaction(tx);

      });

      const balance= await web3.eth.getBalance(accounts[0]);
      // console.log("**@ balance 1 is , ",balance);
      const ethBalance= web3.utils.fromWei(balance);
      // console.log("**@ eth balance is , ",ethBalance)
      setEthBalance(ethBalance);
      
 
      const tBalance= await weenus.methods.balanceOf(accounts[0]).call();
      // console.log("**@ tBalance is , ",tBalance.toString());
      const  tokenBalance= web3.utils.fromWei(tBalance);
      // console.log("**@ token balance is , ",tokenBalance)
 
      setTokenBalance(tokenBalance);

   
  }

  


  useEffect(()=>{

    const init= async ()=>{
     const web3= await getWeb3();
     setWeb3(web3);
     
     if(web3!==undefined){
       
    //  console.log("**@ web3 is , ",web3);
     const weenus = await getContract(web3);
    //  console.log("**@ weenus contract is , ",weenus);
     setWeenus(weenus);

     const accounts= await web3.eth.getAccounts();
    //  console.log("**@ accounts are , ",accounts);
     setAccounts(accounts);

    
     const balance= await web3.eth.getBalance(accounts[0]);
    //  console.log("**@ balance 1 is , ",balance);
     const ethBalance= web3.utils.fromWei(balance);
    //  console.log("**@ eth balance is , ",ethBalance)
     setEthBalance(ethBalance);
     

     if(weenus!==undefined){
      //  console.log("**@ selected account is , ",accounts[0]);
      //  console.log("**@ weenus contract is , ",weenus.methods.drip());
      const tBalance= await weenus.methods.balanceOf(accounts[0]).call();
      // console.log("**@ tBalance is , ",tBalance.toString());
      const  tokenBalance= web3.utils.fromWei(tBalance);
      // console.log("**@ token balance is , ",tokenBalance)
 
      setTokenBalance(tokenBalance);

      // await weenus.methods.drip().send({from:accounts[0]})

      setInterval( async ()=> {

        let newAccounts=await web3.eth.getAccounts();
        // console.log("**@ new account is , ",newAccounts);
        // console.log("**@ old account is , ",accounts);
    
        if (newAccounts[0] !== accounts[0]) {
          
    
          accounts[0] = newAccounts[0];
        setAccounts(newAccounts);

        const balance= await web3.eth.getBalance(accounts[0]);
    //  console.log("**@ balance 1 is , ",balance);
     const ethBalance= web3.utils.fromWei(balance);
    //  console.log("**@ eth balance is , ",ethBalance)
     setEthBalance(ethBalance);

     const tBalance= await weenus.methods.balanceOf(accounts[0]).call();
    //  console.log("**@ tBalance is , ",tBalance.toString());
     const  tokenBalance= web3.utils.fromWei(tBalance);
    //  console.log("**@ token balance is , ",tokenBalance);
     setTokenBalance(tokenBalance);

    
        }
        
      }, 300);
  
     }
     else{
       setTokenBalance(0)
     }
     }
    }


    init();

  },[])

  if(web3==undefined){
    return (
      
        <div className="App">
          <Navbar account={'0X'}></Navbar>
          <h1>METAMASK NOT FOUND ,</h1>
       <h1>METAMASK NOT  FOUND,</h1>
         <h1> PLEASE INSTALL AND CONNECT TO METAMASK PLUGIN</h1>
    
        </div>
    );
  }

else if( weenus !==undefined){
  return (
    <div className="App">
      <Navbar account={accounts[0]}></Navbar>
   <h1>Hello world</h1>
   <Wallet ethBalance={ethBalance} 
   tokenBalance={tokenBalance}
   sendTokens={sendTokens}
   pendingTransaction={pendingTransaction}
   ></Wallet>

    </div>
  );
}
else{
  // window.alert("WEENUS TOKEN CONTRACT NOT FOUND ON CURRENT NETWORK , PLEASE CONNECT TO ROPSTEN NETWORK 2")

  return (
    <div className="App">
      <Navbar account={accounts[0]}></Navbar>
      <h1>NO WEENUS TOKEN CONTRACT FOUND,</h1>
   <h1>NO WEENUS TOKEN CONTRACT FOUND,</h1>
     <h1> PLEASE CONNECT TO ROPSTEN NETWORK</h1>

    </div>
  )
}
  
}

export default App;
