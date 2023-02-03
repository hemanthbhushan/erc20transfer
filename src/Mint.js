import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const { BigNumber } = require("ethers");
// import styles from "./Wallet.module.css";

function expandTo18Decimals(n) {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

const Mint = (props) => {
    // const [mintAmount, setMintAmount] = useState(second)


  const formik = useFormik({
    initialValues: {
      accountAddress: "",
      mintAmount: "",
      
    },
    validationSchema: Yup.object({
        accountAddress: Yup.string().required("Required"),
        mintAmount: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      
      
      await props.contract.mintToken(values.accountAddress, expandTo18Decimals(values.mintAmount));
      // console.log(values.accountAddress,values.mintAmount,"accounttttdetails")
    
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h3> Mint Tokens </h3>
          <label htmlFor="accountAddress">Account</label>
          <input
            id="accountAddress"
            className="form-control"
            type="text"
            {...formik.getFieldProps("accountAddress")}
          />
         
          <label htmlFor="burnAmount">Mint Amount</label>
          <input
            id="mintAmount"
            className="form-control"
            type="text"
            {...formik.getFieldProps("mintAmount")}
          />
          

          <button type="submit">Mint</button>
         
          
        </form>
      </div>
    </>
  );
};

export default Mint;
