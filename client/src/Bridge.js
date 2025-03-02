import "./App.css";
import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import redlc_iconn from "./assets/images/redlc_iconn.png"
import logo from "./assets/images/logomig.png";
import { FcLeft } from "react-icons/fc";
import ICOLOGO from "./assets/images/redLc_Coin_2.png";
import bgimg from "./assets/images/bg.jpg";
import bgmain from "./assets/images/modal-bg.png";
import Swal from "sweetalert2";
import "./css.scss"
import walletdisconnect from "./assets/images/Wallet-disconnect.png";
import {
  connectToMetamask, get_operator, get_Owner, GET_ustdr_address, set_operator, set_owner, switchingToRLC,
} from "./utils/metamask";

import { PulseLoader } from "react-spinners";


function Bridge() {
  const darkRed = "#BB0012";
  const [walletData, setWalletData] = useState({
    chainId: null,
    account: null,
    balance: null,
  });
  const [sendloader, setsendloader] = useState(false)
 const [token_of_usdt_r,set_token_of_usdt_r] =useState("0x73E84bFD35C3f1537A72180D1481E1eABf64B70b")
 const USDT_R_Recevier = "0xb4493F76871a79a59EA2D089D2A62F53589bCD0a"   // RLC
  const [operator, setoperator] = useState("")
  const [Owner, setOwner] = useState("")
  const [Current_operator,set_Current_operator]=useState("")
  useEffect(() => {
    if (!window.ethereum) {

      toast.error("Please Install metamask", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        zindex: 1
      })
    }
  }, [])

  useEffect(() => {
    if(window.ethereum)
    {
    connectToMetamaskFunc();
    GET_ustdr_address(USDT_R_Recevier).then((address)=>{
      set_token_of_usdt_r(address)
      get_operator(token_of_usdt_r).then((x)=>{
        set_Current_operator(x)
      })
    })
  
  }
  }, [])

  const connectToMetamaskFunc = () => {

    connectToMetamask()
      .then((resp) => {
        setTimeout(() => {

        }, 1000)
        setWalletData(resp);
      })
      .catch((error) => {
        setTimeout(() => {

        }, 1000)
        setWalletData(error);
      });
  };

  const disconnectWallet = () => {


    setWalletData({ chainId: null, account: null, balance: null });
  };

useEffect(()=>{
  if(window.ethereum)
  {
  window.ethereum.on("accountsChanged", async (accounts) => {
    connectToMetamaskFunc()
    console.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
  if (window.ethereum) {
    window.ethereum.on('chainChanged', () => {
      const chainId = window.ethereum.chainId
      setWalletData((prev) => {
        return { ...prev, chainId: chainId }
      })
    })
  }
}
},[])
  const main_page_function = () => {

    return (
      <div
        className="main-div"
        style={{
          marginTop: 20,
           backgroundColor:"#381717"  ,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: 30,
          borderRadius: 20,
        }}
      >
        <div className="pt-2"></div>
        <h2 style={{textAlign:'center' }}>Set operator</h2>
        <hr />


      
        <div className="my-4">
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <p style={{ fontSize: "large", fontWeight: "bold" }} >
            Current operator: {Current_operator}
            </p> 
          </div>
          <div className="row p-2  " 
          
          style={{ display: "flex", justifyContent: "center" ,height:"50px", }}>
<div className=" input-rounder flex-input-cntnr" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
<input
              onChange={(e) => {
                      setoperator(e.target.value)   
              }} 
              name="SendingPrice"
              value={operator}
              className="form-control1 my-input "
              aria-label="Amount (to the nearest dollar)"
              placeholder={"Enter Address"}
              type="text"
              required
              style={{backgroundColor:"transparent" }}
            />

              </div>
              
</div>

      <div className="pt-4" ></div>
          <div className="full-div input-rounder">
      

 <div className="full-div input-rounder"
              >
              <button
                onClick={() => {
                  if(operator && walletData?.account )
                  {
                            if(walletData?.chainId!="0xa33")
                            { 
                             switchingToRLC().then(()=>{
                              set_operator(token_of_usdt_r,operator).then(()=>{
                               setoperator("")
                                
                              Swal.fire(
                                  'Operator set',
                                  '',
                                  'success'
                                )
                                // window.location.reload()
                                get_operator(token_of_usdt_r).then((x)=>{
                                  set_Current_operator(x)
                                })  
                              }).catch(()=>{
                                Swal.fire(
                                  'Only owner can change the current operator',
                                  '',
                                  'error'
                                )
                              })
                             })

                            }
                            else if(walletData?.chainId=="0xa33")
                            {
                               
                              set_operator(token_of_usdt_r,operator).then(()=>{
                                setoperator("")
                                Swal.fire(
                                  'Opeator set',
                                  '',
                                  'success'
                                )
                                // window.location.reload()
                                get_operator(token_of_usdt_r).then((x)=>{
                                  set_Current_operator(x)
                                })  
                              }).catch(()=>{
                                Swal.fire(
                                  'Only owner can change the current operator',
                                  '',
                                  'error'
                                )
                              })
                            }
                 
                  }
                }}
                className={sendloader ? "my-button1" : "my-button1"}
              >
                {
                  sendloader ?
                    <PulseLoader style={{ color: "white" }} size="11" />
                    :
                    <div
                      className="flexDisplay"
                      style={{ justifyContent: "center" }}
                    >
                    Change operator
                    </div>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }


  const header = () => {
    return (
      <nav
      >
        <div
          style={{
            padding: 15,
            paddingBottom: 0,
          }}
        >

          <div className="row">
            <a className=" col-md-6 nav-left" href="/">
              {/* <img width={130} src={logo} alt="LOGO" /> */}
            </a>
            <div style={{ top: 10 }} className="col-md-6 nav-right">
              <ul
                className="nav-btn-list"
              >
                {walletData?.account ? (
                  <>
                    <li
                      onClick={() => {
                        copy(walletData.account);
                        toast.success("Address copied successfully", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          zindex: 1
                        })
                      }}
                    >
                      <a
                        style={{ background: darkRed }}
                        href="javascript:void(0);"
                      >
                        <img src={walletdisconnect} className="mr-2" />
                        {walletData?.account.slice(0, 4)}...{" "}
                        {walletData?.account.slice(-4)}
                      </a>
                    </li>

                    <li>
                      <a
                        style={{ background: darkRed }}
                        href="javascript:void(0);"
                        onClick={disconnectWallet}
                      >
                        <img src={walletdisconnect}
                          className="mr-2"
                        />
                        Disconnect
                      </a>
                    </li>
                  </>
                ) : (<>
                  {
                    window.ethereum ?
                      <li className="login-item serch">
                        <a
                          style={{ background: darkRed }}
                          href="javascript:void(0);"
                          onClick={connectToMetamaskFunc}
                        >
                          <img src={walletdisconnect} className="mr-2" />
                          Connect Wallet
                        </a>
                      </li> : <></>
                  }</>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }
  return (
    <>

      <main>
        <div className="ico-main-inner"
         style={{
          backgroundImage: `url(${bgimg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        >
          {header()}
         {main_page_function()}    
        </div>
      </main>
    </>
  );
}

export default Bridge;

const CrossIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
      width={25}
      height={25}
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};