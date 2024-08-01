import React, { useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import Button from '../button/Button'
import Field from '../inputFIeld/Field'
import Image from 'next/image'
import { MdEditSquare } from 'react-icons/md'
import { getCookie } from 'cookies-next'
import { useAddSingleProductMutation, useEditProductMutation } from '@/redux/products/product'
import ResponseToast from '../toast/Toast'

const AddServices = ({ closeModal, editModal, updateData, modalHeading }) => {
    const [addService, setAddService] = useState({
        title: updateData?.products?.title || "",
        desc: updateData?.products?.desc || "",
        price: updateData?.products?.price || "",
        location: updateData?.products?.location || "",
        imageURL: "",
        serviceType: updateData?.products?.serviceType || ""
    })

    const { title, desc, price, location, imageURL, serviceType } = addService

    const handleAddService = (e) => {
        const value = e.target.name === 'price' ? (e.target.value === '' ? null : Number(e.target.value)) : e.target.value;
        setAddService({
            ...addService,
            [e.target.name]: value
        });
    }

    // Get User Detail From Cookies
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const userID = userData?.user?._id

    const Thumbnail = updateData?.products?.thumbnail

    // Handle Profile Images Picker
    const profileImgHandler = (e) => {
        setAddService(prev => ({
            ...prev,
            imageURL: e.target.files[0]
        }));
    };

    // Add Post API
    const [addPost, { isLoading }] = useAddSingleProductMutation()



    // Handle Add Post API
    const handleAddPost = async (e) => {
        e.preventDefault()
        try {
            if (title === "" || desc === "" || price === null || location === "" || imageURL === "" || serviceType === "") {
                return ResponseToast({ message: "Please fill all the fields" })
            }

            // Handle Data With FormData
            const formData = new FormData()
            formData.append('title', title)
            formData.append('desc', desc)
            formData.append('price', price)
            formData.append('location', location)
            formData.append('imageURL', imageURL)
            formData.append('serviceType', serviceType)

            const res = await addPost({
                userID: userID,
                data: formData
            })

            if (!res.error) {
                closeModal(false)
                ResponseToast({ res })
            }

        } catch (error) {
            ResponseToast({ message: "Error Adding Post" })
        }
    }

    // Handle Edit Post API
    const [editPost, { isLoading: editProductLoading }] = useEditProductMutation()


    // Handle PATCH Post API
    const handleUpdatePost = async (e) => {
        e.preventDefault()
        try {
            if (title === "" || desc === "" || price === null || location === "" || serviceType === "") {
                return ResponseToast({ message: "Please fill all the fields" })
            }

            // Handle Data With FormData
            const formData = new FormData()
            formData.append('title', title)
            formData.append('desc', desc)
            formData.append('price', price)
            formData.append('location', location)
            formData.append('imageURL', imageURL)
            formData.append('serviceType', serviceType)

            const res = await editPost({
                userID: userID,
                data: formData,
                productID: updateData?.products?._id,
            })

            if (!res.error) {
                closeModal(false)
                ResponseToast({ res })
            }

        } catch (error) {
            ResponseToast({ message: "Error Adding Post" })
        }
    }

    return (
        <div className='fixed top-0 left-0 z-[300] h-screen w-full bg-[#ffffff96] flex justify-center items-center'>
            <div className='relative w-[600px] bg-primary-color text-white rounded-xl p-4 flex flex-col gap-8 xl:h-auto h-[95vh] overflow-auto'>
                <div className='flex justify-between items-center'>
                    <h2>{modalHeading}</h2>
                    <GiCancel size={32} className='cursor-pointer active:scale-[.98]' onClick={closeModal} />
                </div>
                <form className='flex flex-col gap-3' onSubmit={!editModal ? handleAddPost : handleUpdatePost}>
                    <div className='relative flex items-center justify-center flex-col'>

                        {Thumbnail && !imageURL ?
                            <Image src={Thumbnail} width={170} height={160} className='rounded-lg  border-2 border-white w-[12rem] h-[12rem]' alt='no img found' />
                            : imageURL ?
                                <Image src={URL?.createObjectURL(imageURL)} width={170} height={160} className='rounded-lg  border-2 border-white w-[12rem] h-[12rem]' alt='no img found' /> : <Image src={"/image/dummy/images.png"} width={170} height={160} className='rounded-lg  border-2 border-white w-[12rem] h-[12rem]' alt='no img found' />
                        }

                        <input type='file' accept=".jpg, .jpeg, .png" className='hidden' id='serviceImg' onChange={profileImgHandler} />

                        <label htmlFor='serviceImg'>
                            <div className='p-3 rounded-full'>

                                <p className='py-4 px-8 cursor-pointer text-center bg-white text-primary-color rounded-lg active:scale-[.99]'>Edit Thumbnail</p>

                            </div>
                        </label>

                    </div>
                    <div className='flex gap-3 justify-center'>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Title</label>
                            <Field type='text' placeHolder="Enter Title" name="title" value={title} onChange={handleAddService} />
                        </span>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Description</label>
                            <Field type='text' placeHolder="Enter Description" name="desc" value={desc} onChange={handleAddService} />
                        </span>
                    </div>
                    <div>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Post Type</label>
                            <select className='text-black rounded-xl outline-none p-4 bg-[#F0F0F0]'
                                name='serviceType' value={serviceType} onChange={handleAddService}>
                                <option value="" disabled>Select Post Type</option>
                                <option value="Facebook Post">Facebook Post</option>
                                <option value="Instagram Post">Instagram Post</option>
                                <option value="Twitter Post">Twitter Post</option>
                                <option value="Tiktok Post">Tiktok Post</option>
                            </select>

                        </span>
                    </div>
                    <div className='flex gap-3 justify-center'>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Price</label>
                            <Field type='number' placeHolder="Price" value={price} onChange={handleAddService} name="price" />
                        </span>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Address</label>
                            <Field type='text' placeHolder="Enter Your Address" name="location" value={location} onChange={handleAddService} />
                        </span>
                    </div>

                    <Button name={!editModal ? "Add" : "Update"} bgcolor={"bg-white"} pClass={"text-primary-color"} isLoading={!editModal ? isLoading : editProductLoading} />
                    {/* <Button name={"Add Post"} bgcolor={"bg-white"} pClass={"text-primary-color"} isLoading={isLoading} /> */}
                </form>
            </div>

        </div>

    )
}

export default AddServices