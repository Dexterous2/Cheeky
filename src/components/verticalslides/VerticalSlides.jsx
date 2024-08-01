import { useEffect } from 'react';
import gsap from 'gsap';
import { FaFacebookF } from 'react-icons/fa';
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import Button from '../button/Button';

const VerticalSlide = () => {

    const arey_1 =
        [
            {
                id: 0,
                img: 'image/main/s_1_img.png',
                name: 'Na-na',
                followersFb: '100',
                followersTw: '100',
                followersIn: '100',
                category_1: 'Fashion',
                category_2: 'Travel',
                category_3: 'Lifestyle',
            },
            {
                id: 1,
                img: 'image/main/s_2_img.png',
                name: 'Na',
                followersFb: '100',
                followersTw: '100',
                followersIn: '100',
                category_1: 'Fashion',
                category_2: 'Travel',
                category_3: 'Lifestyle',
            },
            {
                id: 2,
                img: 'image/main/s_3_img.png',
                name: 'Na',
                followersFb: '100',
                followersTw: '100',
                followersIn: '100',
                category_1: 'Fashion',
                category_2: 'Travel',
                category_3: 'Lifestyle',
            },
            {
                id: 3,
                img: 'image/main/s_4_img.png',
                name: 'Na',
                followersFb: '100',
                followersTw: '100',
                followersIn: '100',
                category_1: 'Fashion',
                category_2: 'Travel',
                category_3: 'Lifestyle',
            },
        ]

    const arey_2 =
        [
            {
                id: 0,
                img: 'image/main/s_s_1_img.png',
                name: 'Na-na',
                followersFb: '100',
                followersTw: '100',
                followersIn: '100',
                category_1: 'Fashion',
                category_2: 'Travel',
                category_3: 'Lifestyle',
            },
            {
                id: 1,
                img: 'image/main/s_s_2_img.png',
                name: 'Na',
                followersFb: '100',
                followersTw: '100',
                followersIn: '100',
                category_1: 'Fashion',
                category_2: 'Travel',
                category_3: 'Lifestyle',
            },
            {
                id: 2,
                img: 'image/main/s_s_3_img.png',
                name: 'Na',
                followersFb: '100',
                followersTw: '100',
                followersIn: '100',
                category_1: 'Fashion',
                category_2: 'Travel',
                category_3: 'Lifestyle',
            },
            {
                id: 3,
                img: 'image/main/s_s_4_img.png',
                name: 'Na',
                followersFb: '100',
                followersTw: '100',
                followersIn: '100',
                category_1: 'Fashion',
                category_2: 'Travel',
                category_3: 'Lifestyle',
            },
        ]

    useEffect(() => {
        const additionalY = { val: 0 };
        let offset = 0;
        const cols = gsap.utils.toArray(".col_digi");

        cols.forEach((col, i) => {
            const div_ = col.childNodes;

            // SET ANIMATION
            div_.forEach((item) => {
                let columnHeight = item.parentElement.clientHeight;
                let direction = i % 2 !== 0 ? "+=" : "-="; // Change direction for odd columns

                gsap.to(item, {
                    y: direction + Number(columnHeight / 2),
                    duration: 20,
                    repeat: -2,
                    ease: "none",
                    modifiers: {
                        y: gsap.utils.unitize((y) => {
                            if (direction === "+=") {
                                offset += additionalY.val;
                                y = (parseFloat(y) - offset) % (columnHeight * 0.5);
                            } else {
                                offset += additionalY.val;
                                y = (parseFloat(y) + offset) % -Number(columnHeight * 0.5);
                            }

                            return y;
                        }),
                    },
                });
            });
        }, []);

        // Cleanup the animation on component unmount
        return () => {
            gsap.killTweensOf('.col_digi *');
        };
    }, []);

    return (
        <div className='border--2 border-[red] flex justify-between w-full h-[40rem] overflow-hidden'>

            <div className="col_digi border--2 border-purple-700 w-full h-full flex flex-col gap-4 p-5">

                {
                    arey_1.map((item) => (
                        <div key={item.id} className="border--2 border-green bg-[#ffffff48] w-full min-h-[15vw] flex gap-7 rounded-xl overflow-hidden p-[0.75vw]">
                            <div className="border--2 border-[red] min-w-[13vw] h-full rounded-xl flex overflow-hidden">
                                <img src={item.img} alt="img" className="w-full h-full object-cover" />
                            </div>
                            <div className="border--2 border-orange-700 w-full h-full flex flex-col justify-center gap-[0.75vw]">
                                <h4 className="text-[1.25vw] font-medium text-white mt-[0.75vw]"> {item.name} </h4>
                                <div className="border--2 border-[green] flex w-fit gap-4">
                                    <div className="flex justify-start items-center w-fit">
                                        <FaFacebookF className="text-white text-[1.5vw]" />
                                        <span className="text-white text-[0.75vw] ms-1"> {item.followersFb} <br /> follower</span>
                                    </div>
                                    <div className="flex justify-start items-center w-fit">
                                        <FaTwitter className="text-white text-[1.5vw]" />
                                        <span className="text-white text-[0.75vw] ms-2"> {item.followersTw} <br /> follower</span>
                                    </div>
                                    <div className="flex justify-start items-center w-fit">
                                        <RiInstagramFill className="text-white text-[1.5vw]" />
                                        <span className="text-white text-[0.75vw] ms-2"> {item.followersIn} <br /> follower</span>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-between items--center">
                                    <div className="w-fit flex gap-3">
                                        <h5 className="text-[#1078BC] text-[0.875vw] bg-white font-semibold w-fit h-fit rounded-full px-[1vw] py-[0.5vw]"> {item.category_1} </h5>
                                        <h5 className="text-[#1078BC] text-[0.875vw] bg-white font-semibold w-fit h-fit rounded-full px-[1vw] py-[0.5vw]"> {item.category_2} </h5>
                                        <h5 className="text-[#1078BC] text-[0.875vw] bg-white font-semibold w-fit h-fit rounded-full px-[1vw] py-[0.5vw]"> {item.category_3} </h5>
                                    </div>
                                    <div className="w-fit flex justify-center items-center p-2 rounded-lg px-5">
                                        <Button name={'Contact Influencer'} className={'px-[0.75vw] py-[0.5vw]'} bgcolor={'#fff'} pClass={'text-[#fff] font-semibold'} />
                                        <FaArrowRight className="text-[#fff] text-[1.25vw]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className="col_digi border--2 border-purple-700 w-full h-full flex flex-col gap-4 p-5">

                {
                    arey_2.map((item) => (
                        <div key={item.id} className="border--2 border-green bg-[#ffffff48] w-full min-h-[15vw] flex gap-7 rounded-xl overflow-hidden p-[0.75vw]">
                            <div className="border--2 border-[red] min-w-[13vw] h-full rounded-xl flex overflow-hidden">
                                <img src={item.img} alt="img" className="w-full h-full object-cover" />
                            </div>
                            <div className="border--2 border-orange-700 w-full h-full flex flex-col justify-center gap-[0.75vw]">
                                <h4 className="text-[1.25vw] font-medium text-white mt-[0.75vw]"> {item.name} </h4>
                                <div className="border--2 border-[green] flex w-fit gap-4">
                                    <div className="flex justify-start items-center w-fit">
                                        <FaFacebookF className="text-white text-[1.5vw]" />
                                        <span className="text-white text-[0.75vw] ms-1"> {item.followersFb} <br /> follower</span>
                                    </div>
                                    <div className="flex justify-start items-center w-fit">
                                        <FaTwitter className="text-white text-[1.5vw]" />
                                        <span className="text-white text-[0.75vw] ms-2"> {item.followersTw} <br /> follower</span>
                                    </div>
                                    <div className="flex justify-start items-center w-fit">
                                        <RiInstagramFill className="text-white text-[1.5vw]" />
                                        <span className="text-white text-[0.75vw] ms-2"> {item.followersIn} <br /> follower</span>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-between items--center">
                                    <div className="w-fit flex gap-3">
                                        <h5 className="text-[#1078BC] text-[0.875vw] bg-white font-semibold w-fit h-fit rounded-full px-[1vw] py-[0.5vw]"> {item.category_1} </h5>
                                        <h5 className="text-[#1078BC] text-[0.875vw] bg-white font-semibold w-fit h-fit rounded-full px-[1vw] py-[0.5vw]"> {item.category_2} </h5>
                                        <h5 className="text-[#1078BC] text-[0.875vw] bg-white font-semibold w-fit h-fit rounded-full px-[1vw] py-[0.5vw]"> {item.category_3} </h5>
                                    </div>
                                    <div className="w-fit flex justify-center items-center p-2 rounded-lg px-5">
                                        <Button name={'Contact Influencer'} className={'px-[0.75vw] py-[0.5vw]'} bgcolor={'#fff'} pClass={'text-[#fff] font-semibold'} />
                                        <FaArrowRight className="text-[#fff] text-[1.25vw]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default VerticalSlide;