import React, {useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function Wallet({ethBalance,tokenBalance,sendTokens,pendingTransaction}) {
    const [transaction,setTransaction]=useState(undefined);


    const submit = async function(e,transaction){
    // console.log("**@ submit method called");
    // prevent full page reload
    e.preventDefault();
    // console.log("**@ the transaction being sent to createTransaction is , ",transaction);
    sendTokens(transaction);
    }

    const updateTransaction= async function(e,field){
    //  console.log("**@ update transaction called for field , ",field);
       // getting value from the form field
       const value=e.target.value;
       setTransaction({...transaction,[field]:value});
    //    console.log("**@ update transaction called for field ,",field)
    //    console.log("**@ transaction now is , ",transaction);
     
    }

    return (
        <div className="wallet">
            <h3>ETH Balance <span>{ethBalance}</span> </h3>
            <h3>  WEENUS TOKEN  Balance <span>{tokenBalance}</span> </h3>

            <div className="jumbotron">
        <h1 className='text-center'>Send Tokens</h1>
        <form action="" onSubmit={e => submit(e,transaction)}>

        <div className="form-group">
        <label htmlFor="amount"><h3>Amount</h3></label>
        <input type="text" id="amount" onChange={e=>updateTransaction(e,'amount')}  className='form-control' />
        </div>

        <div className="form-group">
        <label htmlFor="to"><h3>To</h3></label>
       <input type="text" id="to" onChange={e=>updateTransaction(e,'to')} className='form-control' />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        
        <div className="form -group ">
        <label className=""><h3>Pending Transaction</h3></label>
                <input
                  type="text"
                  className="form-control form-control-lg "
                  placeholder="Pending Tx"
                  disabled
                  value={pendingTransaction}
                  
                />

                </div>
       
        
        </form>
        </div>
        </div>
    )

    
}

export default Wallet
