import Path from "../path/path";
import './FormBegin.css'
import { BrowserRouter } from "react-router-dom";

function FormBegin() {

  return (
    <div className="all">
      <div className="comp">
        <div className="compe">
          <BrowserRouter>
            <Path />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}


export default FormBegin;