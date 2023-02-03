import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const { BigNumber } = require("ethers");
// import styles from "./Wallet.module.css";

function expandTo18Decimals(n) {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

const Balance = (props) => {

  const [balance, setBalance] = useState(null)

  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  }


  const formik = useFormik({
    initialValues: {
      accountAddress: "",
    
      
    },
    validationSchema: Yup.object({
        accountAddress: Yup.string().required("Required"),
        
    }),
    onSubmit: async (values, { resetForm }) => {
      let accountAddress = values.accountAddress;
     
      

      let balanceBigN =  await props.contract.balanceOf(accountAddress);
    let balanceNumber = balanceBigN.toString();

    let tokenDecimals = await props.contract.decimals();

    let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);

    setBalance(tokenBalance);
      
     
    
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h3> Balance of user </h3>
          <label htmlFor="accountAddress">Account</label>
          <input
            id="accountAddress"
            className="form-control"
            type="text"
            {...formik.getFieldProps("accountAddress")}
          />
         
          
          

          <button type="submit">Check user balance</button>
         
          
        </form>
        balance :{balance}
      </div>
    </>
  );
};

export default Balance;
