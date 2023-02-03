import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const { BigNumber } = require("ethers");

// import styles from "./Wallet.module.css";

function expandTo18Decimals(n) {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

const Interactions = (props) => {
  const [transferHash, setTransferHash] = useState();
  const [approve, setApprove] = useState(false);

  const formik = useFormik({
    initialValues: {
      recieverAddress: "",
      sendAmount: "",
      approveAddress:"",
      approveAmount:""
    },
    validationSchema: Yup.object({
      recieverAddress: Yup.string().required("Required"),
      sendAmount: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let transferAmount = values.sendAmount;
      let recieverAddress = values.recieverAddress;
      
      let txt = await props.contract.transfer(recieverAddress, expandTo18Decimals(transferAmount));
     
      setTransferHash("Transfer confirmation hash: " + txt.hash);
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h3> Transfer Coins </h3>
          <label htmlFor="recieverAddress">Reciever Address</label>
          <input
            id="recieverAddress"
            className="form-control"
            type="text"
            {...formik.getFieldProps("recieverAddress")}
          />
         
          <label htmlFor="sendAmount">Send Amount</label>
          <input
            id="sendAmount"
            className="form-control"
            type="text"
            {...formik.getFieldProps("sendAmount")}
          />
          

          <button type="submit">Send</button>
         
          <div>{transferHash}</div>
        </form>
      </div>
    </>
  );
};

export default Interactions;
