import Axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { PAYMENT, PAYMENT_EMAIL } from "../../../Utils/Routes";
import "./PaymentFormBasic.css";
import {
  FaCcVisa,
  FaCreditCard,
  FaUserAlt,
  FaCalendarAlt,
  FaCalendar,
} from "react-icons/fa";

// The use of this page is to send an email to the user, verify validate the information of payment form, and if valid then it is 
// navigated to the payment success page
export default function PaymentFormBasic(props) {
  const [currency, setCurrency] = useState("Rupee");
  let history = useHistory();
  const email = "gr957124@dal.ca";
  const subject = "Payment Successful";
  const text = "Dear Customer, \n\nThe payment for your order on Anaha was successful.\n\nRegards\nAnaha Helpdesk";
  const price = props.price;

  // Function to send an email to a user
  const sendSuccessMail = (event) => {
    console.log("Sending Email");
   
    // console.log(location.state);
    Axios.post(PAYMENT_EMAIL, {
      email: email,
      subject: subject,
      text: text,
    });
  };

  const addToList = (event) => {
    event.preventDefault();
    console.log("Clicked on Payment Button");
    console.log("Amount is --"+price);  
    setCurrency('Rupee');
    Axios.post(PAYMENT, {
      userId: "Guru",
      paymentType: "Credit Card",
      paymentAmount: price,
      currency: currency,
      paymentStatus: "Payment Successful",
    });
    sendSuccessMail();
    history.push("/paymentSuccess");
  };

  return (
    <div className="payment__form__container">
      <div>
        <div className="container">
          <div className="wrapper">
            <form onSubmit={addToList} action="" method="post">
              <div className="input_group">
                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Name on Card"
                    class="name"
                    pattern="[A-Za-z ]{2,25}"
                    title="Alphabetic Characters, Range: 2 to 25 characters is allowed"
                    required
                  />
                  <div href="/" target="_blank" aria-label="Facebook">
                    <FaUserAlt className="icon" />
                  </div>
                </div>
              </div>
              <div className="input_group">
                <div class="input_box">
                  <input
                    type="text"
                    name=""
                    className="name"
                    pattern="^[1-9]([0-9]{12,18})"
                    placeholder="Credit Card Number"
                    required
                    title="Starting number should not be 0. Range: 13 to 19 characters"
                  />
                  <FaCreditCard class="icon" />
                </div>
              </div>
              <div className="input_group">
                <div className="input_box">
                  <div id="Cvv">
                    <input
                      type="text"
                      name=""
                      className="name"
                      placeholder="CVC"
                      pattern="([0-9]{1,3})"
                      required
                      title="Numbers only. Range: 3 characters maximum"
                    />
                    <FaCcVisa class="icon" />
                  </div>
                </div>
              </div>
              <div className="input_group">
                <div className="input_box">
                  <div id="Exp_month">
                    <input
                      type="text"
                      placeholder="Exp Month"
                      required
                      class="name"
                      pattern="([1-12]{1,2})"
                      title="Please enter a valid month number as input[1-12]"
                    />
                    <FaCalendarAlt class="icon" />
                  </div>
                </div>
              </div>
              <div className="input_group">
                <div className="input_box">
                  <div className="input_box" id="Exp_year">
                    <input
                      type="text"
                      placeholder="Exp Year"
                      required
                      class="name"
                      pattern="(^[2][0-9]{3})"
                      title="Please enter a valid year[2021"
                    />
                    <FaCalendar class="icon" />
                  </div>
                </div>
              </div>
              <div className="input_group">
                <div className="input_box">
                  <button type="submit">PAY NOW</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
