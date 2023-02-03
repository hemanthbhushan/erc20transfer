import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const { BigNumber } = require("ethers");
// import styles from "./Wallet.module.css";

function expandTo18Decimals(n) {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

const Burn = (props) => {


  const formik = useFormik({
    initialValues: {
      accountAddress: "",
      burnAmount: "",
      
    },
    validationSchema: Yup.object({
        accountAddress: Yup.string().required("Required"),
        burnAmount: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let accountAddress = values.accountAddress;
      let burnAmount = values.burnAmount;
      
      let txt = await props.contract.burnToken(accountAddress, expandTo18Decimals(burnAmount));
     
    
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h3> Burn Tokens </h3>
          <label htmlFor="accountAddress">Account</label>
          <input
            id="accountAddress"
            className="form-control"
            type="text"
            {...formik.getFieldProps("accountAddress")}
          />
         
          <label htmlFor="burnAmount">Burn Amount</label>
          <input
            id="burnAmount"
            className="form-control"
            type="text"
            {...formik.getFieldProps("burnAmount")}
          />
          

          <button type="submit">Burn</button>
         
          
        </form>
      </div>
    </>
  );
};

export default Burn;
