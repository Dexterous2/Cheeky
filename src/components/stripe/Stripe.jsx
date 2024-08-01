"use client"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import PaymentElement from './PaymentElement';

const Stripe = ({ setIsAddCard }) => {

    const stripePromis = loadStripe(`pk_test_51MtGgQJ8CQqp3LxfupUw8gK7n3sSJ8F9BbtScGkwvgr9K95hTLHCVVnoBsCzpPhT0NLrohwVgspG5e0P5YP0pw2Q00Z07Nk5OU`);

    const appearance = {
        theme: 'night',
        labels: 'hidden',
        variables: {
            color: 'grey',
            borderRadius: '50px',
            fontFamily: '--body-font-family: -apple-system, BlinkMacSystemFont, sans-serif',
            colorBackground: '#464646',
        },
        
    };

 

    return (
        <div className='fixed top-0 left-0 z-[300] h-screen w-full bg-[#ffffff96] flex justify-center items-center'>
            <div className='relative w-[600px] bg-primary-color text-white rounded-xl p-4 flex flex-col gap-8 h-fit overflow-auto'>
                <Elements stripe={stripePromis} options={{ appearance }} >
                    <PaymentElement setIsAddCard={setIsAddCard} />
                </Elements>
            </div>
        </div>
    )
}

export default Stripe
