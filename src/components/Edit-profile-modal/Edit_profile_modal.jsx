import React, { useEffect, useState } from 'react'
import { GiCancel } from "react-icons/gi";
import Field from '../inputFIeld/Field';
import Button from '../button/Button';
import { getCookie, setCookie } from 'cookies-next';
import { MdCancel } from "react-icons/md";
import { useUpdateUserMutation } from '@/redux/user/user';
import ResponseToast from '../toast/Toast';


const Edit_profile_modal = ({ closeModal, userDataAPI }) => {
    // Get User Detail From Cookies
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const userName = userDataAPI?.data?.user?.name
    const Description = userDataAPI?.data?.user?.description
    const Categories = userDataAPI?.data?.user?.categories
    const Email = userDataAPI?.data?.user?.email
    const role = userData?.user?.role?.[0]
    const userAddress = userData?.user?.address
    const zipCode = userData?.user?.zipCode

    // State For Update User
    const [userDetail, setUserDetail] = useState({
        name: userName,
        email: Email,
        address: userAddress || "",
        zipcode: zipCode || "",
        password: "",
        description: Description
    })

    // const [categories, setCategories] = useState(Categories);

    // const [allCategories, setAllCategories] = useState([
    //     "Musician",
    //     "Artist",
    //     "Writer",
    //     "Photographer",
    //     "Dancer",
    //     "Actor",
    //     "Chef",
    // ]);

    // useEffect(() => {
    //     const filteredCategories = allCategories.filter(category => !categories.includes(category));
    //     setAllCategories(filteredCategories);
    // }, [categories]);

    const handleUserDetail = (e) => {
        setUserDetail({ ...userDetail, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setUserDetail(prevUserDetail => ({
            ...prevUserDetail,
            name: userName
        }));
    }, [userName]);

    const { name, email, address, zipcode, password, description } = userDetail

    // Update profile
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const handleUpdateProfile = async () => {
        try {
            const res = await updateUser({
                userID: userData?.user?._id,
                data: {
                    name: userDetail.name,
                    email: userDetail.email,
                    address: userDetail.address,
                    zipCode: userDetail.zipcode,
                    password: userDetail.password,
                    categories: categories,
                    description: userDetail.description
                }
            })
            ResponseToast({ res });

            const cookie = userData
            if (cookie) {
                setCookie("cheeky", { user: res?.data?.updatedUser })
            }
            if (!res.error) {
                closeModal()
            }
        } catch (error) {
            ResponseToast({ message: "Internal Server Error" })

        }
    }

    // const handleCategories = (e) => {
    //     setCategories((prevCategories) => {
    //         return [...prevCategories, e.target.value];
    //     });
    // }

    // const handleFilterCategories = (itemName) => {
    //     setCategories((prevCategories) => (prevCategories.filter(category => category !== itemName)));
    // }

    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([
        "Musician",
        "Artist",
        "Writer",
        "Photographer",
        "Dancer",
        "Actor",
        "Chef",
    ]);

    const handleCategories = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory !== "") {
            setCategories([...categories, selectedCategory]);
        }
    };

    const handleFilterCategories = (itemName) => {
        if (categories.includes(itemName)) {
            // Category is already selected, remove it
            setCategories(prevCategories => prevCategories.filter(category => category !== itemName));
        } else {
            // Category is not selected, add it
            setCategories([...categories, itemName]);
        }
    };

    return (
        <div className='fixed top-0 left-0 z-[300] h-screen w-full bg-[#ffffff96] flex justify-center items-center'>
            <div className='relative w-[600px] bg-primary-color text-white rounded-xl p-4 flex flex-col gap-8 xl:h-auto h-[95vh] overflow-auto'>
                <div className='flex justify-between items-center'>
                    <h2>Edit Profile</h2>
                    <GiCancel size={32} className='cursor-pointer active:scale-[.98]' onClick={closeModal} />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-3 justify-center'>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Name</label>
                            <Field type='text' placeHolder="Enter Your Name" name="name" value={name} onChange={handleUserDetail} />
                        </span>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Email</label>
                            <Field type='email' placeHolder="Enter Your Email" name="email" value={email} onChange={handleUserDetail} disabled />
                        </span>
                    </div>
                    <div className='flex gap-3 justify-center'>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Address</label>
                            <Field type='text' placeHolder="Enter Your Address" value={address} onChange={handleUserDetail} name="address" />
                        </span>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>ZipCode</label>
                            <Field type='number' placeHolder="Enter Your ZipCode" name="zipcode" value={zipcode} onChange={handleUserDetail} />
                        </span>
                    </div>
                    {role === "Influencer" &&
                        // <div className='flex gap-3 flex-col'>
                        //     <label>Category</label>
                        //     <select
                        //         className='text-black rounded-xl outline-none p-4 bg-[#F0F0F0]'
                        //         name='categories'
                        //         value={categories[0] || ''}
                        //         onChange={handleCategories}
                        //     >
                        //         <option value="" >Select Category</option>
                        //         {allCategories?.map((item, i) => (
                        //             <option value={item} key={i}>{item}</option>
                        //         ))}
                        //     </select>

                        //     {categories.length > 0 &&
                        //         <div className='flex gap-2 flex-wrap'>

                        //             {categories?.map((item, i) => (
                        //                 <div key={i} className='bg-white text-primary-color flex gap-2 text-center rounded-lg p-2 justify-center items-center'>
                        //                     {item}
                        //                     <MdCancel className='cursor-pointer' onClick={() => handleFilterCategories(item)} />

                        //                 </div>
                        //             ))}
                        //         </div>
                        //     }
                        // </div>
                        <div className='flex gap-3 flex-col'>
                            <label>Category</label>
                            <select
                                className='text-black rounded-xl outline-none p-4 bg-[#F0F0F0]'
                                name='categories'
                                value={categories[0] || ''}
                                onChange={handleCategories}
                            >
                                <option value="">Select Category</option>
                                {allCategories.map((item, i) => (
                                    <option value={item} key={i}>{item}</option>
                                ))}
                            </select>

                            {categories.length > 0 && (
                                <div className='flex gap-2 flex-wrap'>
                                    {categories.map((item, i) => (
                                        <div key={i} className='bg-white text-primary-color flex gap-2 text-center rounded-lg p-2 justify-center items-center'>
                                            {item}
                                            <MdCancel className='cursor-pointer' onClick={() => handleFilterCategories(item)} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    }
                    <span className='flex flex-col gap-2 w-full'>
                        <label>Password</label>
                        <Field type='password' placeHolder="Enter Your New password" name="password" value={password} onChange={handleUserDetail} />
                    </span>
                    <div className='flex flex-col gap-3'>
                        <label>Description</label>
                        <Field type='textarea' placeHolder="Description" col={6} row={6} styles={{ color: "black" }} name="description" value={description} onChange={handleUserDetail} />
                    </div>
                    <Button name={"Update"} bgcolor={"bg-white"} pClass={"text-primary-color"} onClick={handleUpdateProfile} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}

export default Edit_profile_modal
