'use client'
import styles from '@/components/components.module.scss';

const Card = (props) => {

    const gradient = {
        grad: 'linear-gradient(to right, #00b4b3, #00a7bc, #0099c1, #0089c2, #1078bc)',
        class: props.class
    }

    return (
        <div className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full h-[13rem] rounded-xl flex flex-col justify-center items-center gap-3`} style={{ backgroundImage: gradient.class === '' ? gradient.grad : gradient.class }}>
            {props.icon_1}
            <h2 className={`${props.color} text-xl flex`}>
                {props.h2_}
                <span className='text-sm flex justify-center items-center ms-4'>
                    {props.icon_2} {props.span}
                </span>
            </h2>
            <p className={`text-center ${props.color} mt-2 p-2`}> {props.p} </p>
        </div>
    );
}

export default Card;

// /////////////////////////////
// balance card
// /////////////////////////////
export const BalanceCard = (props) => {

    const gradient = {
        grad: 'linear-gradient(to right, #00b4b3, #00a7bc, #0099c1, #0089c2, #1078bc)',
        class: props.class
    }

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')
    const userID = userData?.user?._id

    const { data } = useGetUserWalletQuery(userID, {
        skip: !userID
    })

    return (
        <div className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full h-[20rem] md:h-[25rem] rounded-xl flex flex-col justify-around items-center gap-3`} style={{ backgroundImage: gradient.class === '' ? gradient.grad : gradient.class }}>
            <div className='flex justify-center items-center'>
                {props.icon_1} <h3 className='text-[#0797B7] text-2xl md:text-3xl font-semibold ms-4'> {props.title} </h3>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <h4 className='text-[#0797B7] text-lg font-medium'> {props.h4_1} </h4>
                <h2 className='text-[#0797B7]'> $ {data?.availableBalance[0] === undefined ? "0" : data?.availableBalance[0]} </h2>
                <h4 className='text-slate-400 text-lg font-medium'> {props.h4_2} </h4>
            </div>
            <div className='w-3/4'>
                <Button name={'View Wallet'} className={'w-[10.5rem] rounded-full'} />
            </div>
        </div>
    );
}

// /////////////////////////////
// line chart
// /////////////////////////////
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CardChart = (props) => {

    const gradient = {
        grad: 'linear-gradient(to right, #00b4b3, #00a7bc, #0099c1, #0089c2, #1078bc)',
        class: props.class
    }

    return (
        <div className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full h-full rounded-xl flex flex-col justify-center items-center gap-3`} style={{ backgroundImage: gradient.class === '' ? gradient.grad : gradient.class }}>

            <div className='border--2 border-red-800 w-full h--[3rem] flex justify-between p-4 pb-0'>
                <h3 className={`text-[#0797B7] max-[318px]:text-lg text-2xl font-semibold`}> {props.title} </h3>

                <select name="" id="" className='outline-none bg-[#0797B7] max-[318px]:text-xs text-sm text-white rounded-xl p-1'>
                    {
                        props.months.map((er, index) => (
                            <option value={er} key={index}> {er} </option>
                        ))
                    }
                </select>
            </div>

            <ResponsiveContainer width="100%" height="99%" className={'p-4 ps-0'}>
                <LineChart
                    width={500}
                    height={300}
                    data={props.data_1}
                    margin={{
                        top: 0,
                        right: 10,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: 'silver' }} />
                    <YAxis tick={{ fill: 'silver' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="pv" stroke="#0797B7" activeDot={{ r: 8 }} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}


// /////////////////////////////
// line chart
// /////////////////////////////
import { AreaChart, Area } from 'recharts';
import Button from '../button/Button';

export const CardAreaChart = (props) => {

    const gradient = {
        grad: 'linear-gradient(to right, #00b4b3, #00a7bc, #0099c1, #0089c2, #1078bc)',
        class: props.class
    }

    return (
        <div className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full h-full rounded-xl flex flex-col justify-center items-center gap-3`} style={{ backgroundImage: gradient.class === '' ? gradient.grad : gradient.class }}>

            <div className='border--2 border-red-800 w-full h--[3rem] flex max-[400px]:flex-col justify-between items-center p-4 pb-0'>
                <h3 className={`text-[#fff] max-[480px]:text-lg text-2xl font-semibold`}> {props.title} </h3>

                <select name="" id="" className='outline-none bg-[#fff] max-[480px]:text-xs text-sm text-[#0797B7] rounded-xl p-1'>
                    {
                        props.months.map((er, index) => (
                            <option value={er} key={index}> {er} </option>
                        ))
                    }
                </select>
            </div>

            <ResponsiveContainer width="100%" height="99%" className={'p-4 ps-0'}>
                <AreaChart
                    width={500}
                    height={300}
                    data={props.data_1}
                    margin={{
                        top: 0,
                        right: 10,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="pv" stroke="#fff" activeDot={{ r: 5 }} strokeWidth={2} fill='#ffffff80' />
                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}


// /////////////////////////////
// pie chart
// /////////////////////////////
import { PieChart, Pie, Cell } from 'recharts';
export const CardPieChart = (props) => {

    const gradient = {
        grad: 'linear-gradient(to right, #00b4b3, #00a7bc, #0099c1, #0089c2, #1078bc)',
        class: props.class
    }

    const data = [
        { name: 'In-Account', value: 500 },
        { name: 'Withdrawn', value: 1000 },
        { name: 'Unapproved', value: 500 },
    ];

    const COLORS = ['#24BFBE', '#FFF', '#560BAD'];

    const CustomLegend = ({ payload }) => {
        return (
            <ul className='border--2 border-red-900 w-full flex flex-wrap justify-center gap-2 mb-3'>

                <li className='w-full flex justify-center text-white mb-2 mt-2'>
                    <p>Category</p>
                </li>

                {payload.map((entry, index) => (
                    <li key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: entry.color, marginRight: '5px' }} />
                        <span className='text-white ms-1'>{entry.value}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full max-[340px]:h-[57%] max-sm:h-[55%] h-[53%] rounded-xl flex flex-col justify-center items-center gap-3 max-sm:p-0 max-md:p-2 lg:p-1 xl:p-2`} style={{ backgroundImage: gradient.class === '' ? gradient.grad : gradient.class }}>

            <div className='border--2 border-red-800 w-full h-fit flex flex-col justify-between items--center p-4 pb-0'>
                <p className={`text-[#fff] font-normal mb-1`}> January, 21 </p>
                <h3 className={`text-[#fff] max-[480px]:text-lg text-2xl font-semibold`}> Total Cashflow </h3>
            </div>

            <ResponsiveContainer width="100%" height="99%" className={'border--2 border-green-700 pt-0'}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="47%"
                        labelLine={false}
                        outerRadius={100}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>

        </div>
    );

}


// /////////////////////////////
// payment card
// /////////////////////////////

import { RiVisaLine } from "react-icons/ri";
import { MdOutlineWifi } from "react-icons/md";
import { BsSim } from "react-icons/bs";

export const PaymentCard = (props) => {

    const gradient = {
        grad: 'linear-gradient(to right, #00b4b3, #00a7bc, #0099c1, #0089c2, #1078bc)',
        class: props.class
    }

    // Getting user data from cookies
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const userName = userData.user.name
    const userID = userData.user._id
    const role = userData?.user?.role[0]

    // Get Card Details API
    const getCardDetail = useGetCardDetailQuery({ userID: userID }, { skip: !userID })
    const cardData = getCardDetail?.data
    const cardLoading = getCardDetail?.isLoading

    const validateCard = useValidateCardQuery(userID, {
        skip: !userID
    })
    // remove Card API
    const [removeCard, { isLoading }] = useRemoveCardMutation()

    // Hanlde Remove Card
    const handleRemoveCard = async () => {
        try {

            const res = await removeCard({ userID })

            ResponseToast({ res })

            if (!res.error) {
                getCardDetail.refetch()
            }

        } catch (error) {
            ResponseToast({ message: "Error Removing Card" })
        }
    }


    return (
        <div className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full h--[13rem] rounded-xl flex max-xl:flex-wrap max-xl:flex-col-reverse justify-center items-center gap-3 py-5 px-6 max-md:p-2 `} style={{ backgroundImage: gradient.class === '' ? gradient.grad : gradient.class }}>

            <div className='border--2 border-[olive] w-full h-full flex flex-col justify-center items-start gap-2 max-xl:mt-3 max-xl:items--center'>
                <h3 className='text-[#0797B7] text-lg'>Card Details</h3>
                <p className='text-[#0797B7]'>Name: {userName}</p>
                <p className='text-[#0797B7]'>
                    {validateCard.data !== false ?
                        role === "brandOwner" ? "Card Brand: " + cardData?.paymentMethod
                            ?.card?.brand : "Card Brand: " + cardData?.cards[0]?.brand
                        :
                        "Card Brand: Visa"
                    }

                </p>
                <p className='text-[#0797B7]'> {
                    validateCard.data !== false ?
                        role === "brandOwner" ? "Card number: **** ****" + cardData?.paymentMethod
                            ?.card?.last4 : "Card number: **** ****" + cardData?.cards[0]?.last4 : "Card number: 0123 4567 9875"

                }
                </p>
                <p className='text-[#0797B7]'>
                    {validateCard.data !== false ?
                        role === "brandOwner" ? "Expiry:" + cardData?.paymentMethod?.card?.exp_month + "/" + cardData?.paymentMethod?.card?.exp_year : "Expiry:" + cardData?.cards[0]?.exp_month + "/" + cardData?.cards[0]?.exp_year : "Expiry: 12/26"
                    }
                </p>
                <div className='mt-3'>
                    {validateCard.data ?
                        <Button name={'Remove card'} onClick={handleRemoveCard} isLoading={isLoading} isLoadingName={"Removing Card"} /> :
                        <Button name={'Add card'} onClick={() => props.setIsAddCard(true)} />
                    }
                </div>
            </div>
            <div className={`${styles.credit_card_d} border--2 border-[olive] w-full h-[14rem] rounded-xl relative`}>
                <RiVisaLine className='text-white text-7xl max-[390px]:text-6xl absolute top-2 left-8 max-[390px]:left-3' />
                <div className='absolute bottom-5 left-8 max-[390px]:left-3'>
                    <h4 className='text-lg max-[390px]:text-base text-white'>
                        {validateCard.data !== false ?
                            role === "brandOwner" ? "**** ****" + cardData?.paymentMethod
                                ?.card?.last4 : "**** **** " + cardData?.cards[0]?.last4 : "0123 4567 9875"
                        }
                    </h4>
                    <div className='mt-1 flex gap-3 justify-between'>
                        <p className='text-sm max-[390px]:text-xs text-white'>
                            {userName}
                        </p>
                        <p className='text-sm max-[390px]:text-xs text-white'> {validateCard.data !== false ?
                            role === "brandOwner" ? cardData?.paymentMethod
                                ?.card?.exp_month + "/" + cardData?.paymentMethod
                                    ?.card?.exp_year : cardData?.cards[0]?.exp_month + "/" + cardData?.cards[0]?.exp_year : "12/26"
                        } </p>
                    </div>
                </div>
                <MdOutlineWifi className='text-[#ffffff8f] text-4xl max-[390px]:text-3xl absolute right-7 top-20 rotate-90 max-[390px]:right-3' />
                <BsSim className='text-[#ffffff8f] text-4xl max-[390px]:text-3xl absolute right-7 bottom-5 rotate-90 max-[390px]:right-3' />
            </div>
        </div>
    );
}

// /////////////////////////////
// bar chart
// /////////////////////////////
import { BarChart, Bar, Rectangle } from 'recharts';
import ProfileTable from '../profileTable/ProfileTable';
import { DataTablePri } from '../dataTable/DataTable';

export const CardBarChart = (props) => {

    const gradient = {
        grad: 'radial-gradient(circle, #00d1d0, #00bcd3, #00a6d2, #0090ca, #1078bc)',
        class: props.class
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip bg-transparent hover:bg-white fill-none">
                    <p className="label bg-white rounded-md p-2 text-[#0797B7]">{`${label} : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full h-[20rem] rounded-xl flex flex-col justify-center items-center gap-3 p-4 max-sm:p-1`} style={{ backgroundImage: gradient.class === '' ? gradient.grad : gradient.class }}>

            <div className='border--2 border-red-800 w-full h--[3rem] flex max-[400px]:flex-col justify-between items-center p-4 pb-0'>
                <h3 className={`text-[#fff] max-[480px]:text-lg text-2xl font-semibold`}> {props.title} </h3>
            </div>

            <ResponsiveContainer width="100%" height="99%" className={'max-sm:p-1 ps-0'}>
                <BarChart
                    width={500}
                    height={300}
                    data={props.data_1}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" axisLine={false} tick={{ fill: 'white', stroke: '0' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="pv" fill="transparent" stroke="white" radius={10} barSize={35} activeBar={<Rectangle fill="white" stroke="" />} />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}


// /////////////////////////////
// table card
// /////////////////////////////

import { columns_wallet } from '../dataTable/columns';
import { getCookie } from 'cookies-next';
import { useGetUserWalletQuery } from '@/redux/wallet/Wallet';
import { useGetCardDetailQuery, useRemoveCardMutation, useValidateCardQuery } from '@/redux/card/Card';
import ResponseToast from '../toast/Toast';

export const TableCard = (props) => {

    const gradient = {
        grad: 'linear-gradient(to right, #00b4b3, #00a7bc, #0099c1, #0089c2, #1078bc)',
        class: props.class
    }

    return (
        <div className={`${styles.card} ${props.class} p-2 rounded-xl`} >
            <div className='border--2 border-red-800 w-full h--[3rem] flex max-[400px]:flex-col justify-between items-center p-2  pb-0'>
                <h3 className={`text-[#0797B7] max-[480px]:text-lg text-2xl font-semibold`}> {props.title} </h3>
            </div>
            <DataTablePri
                className={`text-[#0797B7] hover:bg-[#0797B7] hover:text-[#fff]`}
                header_row_className={``}
                table_head_className={`text-[#0797B7]`}
                table_title={''}
                columns={props.tableHead ? props.tableHead : columns_wallet}
                data={props?.table_data}
            />
        </div>
    );
}