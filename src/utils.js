import Web3 from 'web3';
import weenusTokenJson from './abis/WeenusToken.json';


const getWeb3 = async () => {
 
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        // console.log("*******************@ Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        // const provider = new Web3.providers.HttpProvider(
        //   "http://localhost:9545"
        // );
        // const web3 = new Web3(provider);
        // console.log("****************************@ No web3 instance injected, using Local web3.");
        // resolve(web3);
        // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        resolve(undefined);
      }

      
    });
  });
};

const getContract =async (web3)=>{

   

  
      // Load Token
    const networkId =  await web3.eth.net.getId();
    // console.log("**@ network id is , ",networkId);
    // console.log("**@ network is , ",weenusTokenJson.abi)
    const weenusNetwork = weenusTokenJson.networks[networkId];


    if(weenusNetwork){

        const weenus= new web3.eth.Contract(weenusTokenJson.abi,weenusNetwork.address);
    //   console.log("**@ WEENUS INSIDE IS , ",weenus);
        weenus.address=weenusNetwork.address;
    
          return weenus;
    }
    else {
        window.alert("WEENUS TOKEN CONTRACT NOT FOUND ON CURRENT NETWORK , PLEASE CONNECT TO ROPSTEN NETWORK AND RELOAD");
        return undefined;
    }

    
  }


export { getWeb3,getContract };