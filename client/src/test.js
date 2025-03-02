import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,useNavigate , Navigate   } from "react-router-dom";
function Rout()
{
    const navigate = useNavigate();
    return(
        navigate('/UST')
        ) 
}
export default Rout;
