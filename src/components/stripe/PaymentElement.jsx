"use client"
import React, { useEffect, useState } from 'react'
import styles from "./payment.module.css";
import Button from '../button/Button';
import { MdOutlineCancel } from "react-icons/md";
import { getCookie } from 'cookies-next';
import { useCreateCardMutation } from '@/redux/card/Card';
import ResponseToast from '../toast/Toast';
import Field from '../inputFIeld/Field';
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PaymentElement = ({ setIsAddCard }) => {
    const [cardFields, setCardFields] = useState({
        userID: "",
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
    })


    const stripe = useStripe()
    const element = useElements()


    const { number, exp_month, exp_year, cvc } = cardFields

    // Styles
    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderRadius: "10px",
        backgroundColor: "white",
        color: "var(--primary-color)"
    }

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')
    const userID = userData?.user?._id

    useEffect(() => {
        setCardFields({ ...cardFields, userID: userID })
    }, [])

    const [addPaymentCard, { isLoading }] = useCreateCardMutation();

    const savePaymentMethod = async () => {
        try {
            if (userData.user.role.includes('Influencer')) {
                const isEmpty = Object.values(cardFields).some(field => field === "")
                if (isEmpty || exp_month > 12) {
                    return ResponseToast({ message: "Please enter valid details" })
                }

                const res = await addPaymentCard({
                    userID: userID,
                    number: parseInt(number.split("-").join("")),
                    exp_month: exp_month,
                    exp_year: exp_year,
                    cvc: cvc,
                })
                ResponseToast({ res });
                return setIsAddCard(false);
            } else {

                const cardElement = element.getElement(CardNumberElement, CardCvcElement, CardExpiryElement)

                const payment_method = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                });
                const token = await stripe.createToken(cardElement)
                const res = await addPaymentCard({
                    userID: userID,
                    payment_method: payment_method.paymentMethod.id,
                    tokenID: token.token.id,
                })
                ResponseToast({ res });
                setIsAddCard(false);
            }

        } catch (error) {
            console.log(error)
            // ResponseToast({ message: "Error While Saving Payment Method" })
            ResponseToast({ res: error })
        }
    }

    let style = {
        base: {
            color: 'black',
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }

    };

    return (
        <div className={styles.paymentWrapper}>
            <div className={styles.cardWrapper}>
                <div>
                    <div className="flex items-center justify-center text-light mb-4">
                        <h2> Add Your Card </h2>
                    </div>
                </div>
                {
                    userData.user.role.includes("Influencer") ?
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-1'>
                                <label style={{ color: "white", paddingLeft: "0.5rem" }}>Card Number</label>

                                <Field
                                    placeHolder="9876-5432-1234-5678"
                                    customClass="rounded-full px-4 py-3 outline-none"
                                    type='text'
                                    value={number}
                                    name="number"
                                    onChange={(e) => setCardFields({ ...cardFields, number: e.target.value.slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1-') })}
                                />

                            </div>

                            <div className={` flex flex-col gap-2`}>
                                <div style={{ width: "100%" }} className='flex flex-col gap-1'>
                                    <label style={{ color: "white", paddingLeft: "0.5rem" }}>CVC</label>

                                    <Field placeHolder={"357"} customClass="rounded-full px-4 py-3 outline-none" type='number' value={cvc} name="cvc" onChange={(e) => setCardFields({ ...cardFields, cvc: e.target.value.slice(0, 3) })} maxLength={3} />
                                </div>
                                <div style={{ width: "100%" }} className='flex gap-2'>
                                    <span>
                                        <label style={{ color: "white", paddingLeft: "0.5rem" }}>Expiry month</label>
                                        {exp_month > 12 ?
                                            <span className='flex flex-col gap-1'>
                                                <Field placeHolder={"05"} customClass="rounded-full px-4 py-3 outline-none border-red-500 text-red-500" type='number' maxLength={2} value={exp_month} name="exp_month" onChange={(e) => setCardFields({ ...cardFields, exp_month: e.target.value.slice(0, 2) })} />
                                                <small className='text-red-500'>Please enter valid date</small>
                                            </span>
                                            :
                                            <Field placeHolder={"05"} customClass="rounded-full px-4 py-3 outline-none" type='number' maxLength={2} value={exp_month} name="exp_month" onChange={(e) => setCardFields({ ...cardFields, exp_month: e.target.value.slice(0, 2) })} />
                                        }
                                    </span>
                                    <span>
                                        <label style={{ color: "white", paddingLeft: "0.5rem" }}>Expiry Year</label>

                                        <Field placeHolder={"25"} customClass="rounded-full px-4 py-3 outline-none" type='number' maxLength={"2"} value={exp_year} name="exp_year" onChange={(e) => setCardFields({ ...cardFields, exp_year: e.target.value.slice(0, 4) })} pattern="\d*" />

                                    </span>
                                </div>
                            </div>

                            <div className={`flex gap-4 justify-center mt-2 ${styles.stripe_btn}`} >
                                <Button onClick={savePaymentMethod} isLoading={isLoading} isLoadingName={"Adding Card"} name={'Add Card'} style={buttonStyle} bgcolor={"bg-white"} />
                                <Button name={'Cancel'} style={buttonStyle} bgcolor={"bg-white"} onClick={() => setIsAddCard(false)} />
                            </div>
                        </div> :
                        <div>
                            {/* <CardElement /> */}
                            <div className='mb-4 flex flex-col gap-1'>
                                <label style={{ color: "white", paddingLeft: "0.5rem" }} className='font-semibold'>Card Number :</label>
                                <div className={styles.stripe_fields}>
                                    <CardNumberElement options={{ style: style }} />
                                </div>
                            </div>
                            <div className={` flex flex-col gap-4`}>
                                <div style={{ width: "100%" }} className=' flex flex-col gap-1'>
                                    <label className='font-semibold' style={{ color: "white", paddingLeft: "0.5rem" }}>CVC :</label>
                                    <div className={styles.stripe_fields}>
                                        <CardCvcElement options={{ style: style }} />
                                    </div>
                                </div>
                                <div style={{ width: "100%" }} className='mb-4 flex flex-col gap-1'>
                                    <label className='font-semibold' style={{ color: "white", paddingLeft: "0.5rem" }}>Expiry Date :</label>
                                    <div className={styles.stripe_fields}>
                                        <CardExpiryElement options={{ style: style }} />
                                    </div>
                                </div>
                            </div>
                            <div className={`flex justify-center gap-4 mt-6 `} >
                                <Button onClick={savePaymentMethod} isLoading={isLoading} isLoadingName={"Adding Card"} name={'Add Card'} style={buttonStyle} bgcolor={"bg-white"} />
                                <Button name={'Cancel'} style={buttonStyle} bgcolor={"bg-white"} onClick={() => setIsAddCard(false)} />
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default PaymentElement
