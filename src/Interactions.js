import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import styles from "./Wallet.module.css";

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
      let approveAmount = values.approveAmount;
      let approveAddress = values.approveAddress;
      let txt = await props.contract.transfer(recieverAddress, transferAmount);
      let approved = await props.contract.approve(approveAddress,approveAmount);
      setApprove(approved)
      console.log(txt);
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
          <h3> Send Amount </h3>
          <label htmlFor="sendAmount">Send Amount</label>
          <input
            id="sendAmount"
            className="form-control"
            type="text"
            {...formik.getFieldProps("sendAmount")}
          />
          <label htmlFor="approveAddress">Approve Address </label>
          <input
            id="approveAddress"
            className="form-control"
            type="text"
            {...formik.getFieldProps("approveAddress")}
          />
           <label htmlFor="approveAddress">Approve Amount </label>
          <input
            id="approveAmount"
            className="form-control"
            type="text"
            {...formik.getFieldProps("approveAmount")}
          />

          <button type="submit">Send</button>
          {
            approve?
            <h4>approved</h4>:<h4>not Approved</h4>
          }
          <div>{transferHash}</div>
        </form>
      </div>
    </>
  );
};

export default Interactions;
