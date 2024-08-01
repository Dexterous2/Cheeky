'use client'

import styles from "./page.module.scss";
import Button from "@/components/button/Button";
import { FaArrowRight } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// import required modules
import { Autoplay } from 'swiper/modules';
import VerticalSlide from "@/components/verticalslides/VerticalSlides";
import { AccordionPri } from "@/components/accordion/Accordion";
import { InputPri } from "@/components/input/Input";
import { TextareaPri } from "@/components/input/textarea";
import { SelectPri } from "@/components/input/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


export default function Home() {

	const router = useRouter();

	const padding_ = 'max-md:px-2 md:px-10 lg:px-20 xl:px-30';

	const slide_1 =
		[
			{
				id: 0,
				img: 'image/main/img_1.png',
				name: 'Yoona',
				category: 'Cosmetics'
			},
			{
				id: 1,
				img: 'image/main/img_2.png',
				name: 'Yoona',
				category: 'Food'
			},
			{
				id: 2,
				img: 'image/main/img_3.png',
				name: 'Shimate',
				category: 'Food'
			},
			{
				id: 3,
				img: 'image/main/img_4.png',
				name: 'Nahi',
				category: 'Fashion'
			},
			{
				id: 4,
				img: 'image/main/img_5.png',
				name: 'XuaShi',
				category: 'Fashion'
			},
			{
				id: 5,
				img: 'image/main/img_6.png',
				name: 'Cathay',
				category: 'Travel'
			},
			{
				id: 6,
				img: 'image/main/img_7.png',
				name: 'Rebecca',
				category: 'Food'
			},
			{
				id: 7,
				img: 'image/main/img_8.png',
				name: 'XuaShi',
				category: 'Food'
			},
			{
				id: 8,
				img: 'image/main/img_9.png',
				name: 'Yami',
				category: 'Sport'
			},
			{
				id: 9,
				img: 'image/main/img_9.png',
				name: 'Yami',
				category: 'Sport'
			},
			{
				id: 10,
				img: 'image/main/img_9.png',
				name: 'Yami',
				category: 'Sport'
			},
		]

	const array_faq =
		[
			{
				id: 1,
				question: 'How do I book an influencer on your platform?',
				answer: `On our platform, you can use the search tool to filter the list of influencers based on the industry or niche you're interested in. We provide detailed filters that help you identify individuals with expertise and alignment with your business goals.`
			},
			{
				id: 2,
				question: 'Which platform do you support?',
				answer: `On our platform, you can use the search tool to filter the list of influencers based on the industry or niche you're interested in. We provide detailed filters that help you identify individuals with expertise and alignment with your business goals.`
			},
			{
				id: 3,
				question: 'How can I find influencers that match my industry?',
				answer: `On our platform, you can use the search tool to filter the list of influencers based on the industry or niche you're interested in. We provide detailed filters that help you identify individuals with expertise and alignment with your business goals.`
			},
			{
				id: 4,
				question: 'How do I know if an influencer is a reliable choice?',
				answer: `On our platform, you can use the search tool to filter the list of influencers based on the industry or niche you're interested in. We provide detailed filters that help you identify individuals with expertise and alignment with your business goals.`
			},
			{
				id: 5,
				question: 'How will I make payments for booking an influencer?',
				answer: `On our platform, you can use the search tool to filter the list of influencers based on the industry or niche you're interested in. We provide detailed filters that help you identify individuals with expertise and alignment with your business goals.`
			},
			{
				id: 6,
				question: 'What are some tips for using an influencer booking platform?',
				answer: `On our platform, you can use the search tool to filter the list of influencers based on the industry or niche you're interested in. We provide detailed filters that help you identify individuals with expertise and alignment with your business goals.`
			},
		]

	const am = useRef(null)

	useIsomorphicLayoutEffect(() => {

		let ctx = gsap.context(() => {
			var tl = gsap.timeline({
				scrollTrigger: {
					trigger: am.current,
					pin: true,
					scrub: 2,
					start: "top top",
					// end: "50%+=500px",
					end: '30%'
				}
			})

			tl.to('#popup_1', { y: 0, opacity: 100, duration: 3, ease: 'power1.inOut' })
			tl.to('#popup_2', { y: 0, opacity: 100, duration: 3, ease: 'power1.inOut' })
		}, am)

		return () => ctx.revert();

	})

	const [open, setOpen] = useState(false);
	const handelOpen = () => {
		setOpen(!open);
	}

	return (
		<main ref={am} className={`${styles.main_} border--2 border-[red] w-full ${open === true ? 'h-screen' : 'h-full'} flex flex-col gap--10 overflow--hidden overflow-y--auto`}>

			<div className={`border--2 bg-[#fff] w-full h-screen fixed top-0 bottom-0 left-0 mt-0 z-10 ${open === true ? 'translate-y-[0vw] transition-all duration-500' : 'translate-y-[-5000vw] transition-all duration-500'}`}>
				<ul className="border--2 border-green-500 text-xl text-[#0099c1] font-semibold w-full h-full flex flex-col justify-center items-center gap-4 px-8">
					<Link onClick={() => setOpen(false)} href={'#home'}><li className="cursor-pointer"> Home </li></Link>
					<Link onClick={() => setOpen(false)} href={'#faq'}><li className="cursor-pointer"> FAQ </li></Link>
					<Link onClick={() => setOpen(false)} href={'#contact'}><li className="cursor-pointer"> Contact </li></Link>
				</ul>
			</div>

			<header id="home" className={`${styles.header_} sec_1 border--2 border-green-900 w-full ${padding_} pt-1 relative`}>

				<img src="image/main/top_1.png" alt="img.png" id="top_1" className="absolute left-0 top-[35%] max-md:top-[70%] max-lg:top-[75%]" />

				<nav className="border--2 border-teal-900 w-full h-[5rem] flex justify-between items-center">
					<div className="border--2 border-red-900 flex items-center h-full w-fit">
						<img src="image/main/logo.png" alt="img" className="max-md:w-[10rem] max-lg:w-[25rem] w-[15rem]" />
					</div>
					<ul className="border--2 border-green-500 text-[#fff] font-semibold w-full h-full max-md:hidden md:flex justify-center items-center gap-4 px-8">
						<Link href="#home"><li className="cursor-pointer"> Home </li></Link>
						<Link href="#faq"><li className="cursor-pointer"> FAQ </li></Link>
						<Link href="#contact"><li className="cursor-pointer"> Contact </li></Link>
					</ul>
					<div className="min-w-fit flex justify-center items-center max-md:hidden">
						<Link href={'/login'}>
							<h4 className="text-xl text-[#fff] font-medium me-10"> Login </h4>
						</Link>
						<div className="bg-[#fff] min-w-fit flex justify-center items-center p-2 rounded-lg px-5">
							<Button name={'Sign Up'} className={'px-3 py-2'} bgcolor={'#fff'} pClass={'text-[#1078bc] font-semibold'} />
							<FaArrowRight className="text-[#1078bc] text-xl" />
						</div>
					</div>
					<div className="min-w-fit max-md:flex justify-center items-center hidden">
						<div onClick={handelOpen} className="border-2 border-[#1078bc] bg-[#fff] cursor-pointer min-w-fit flex justify-center items-center p-2 rounded-lg px-3 py-3 z-50">
							<FaBars className="text-[#1078bc] text-2xl" />
						</div>
					</div>
				</nav>

				<div className="border--2 border-[olive] w-full grid grid-cols-1 lg:grid-cols-2 mt-14">

					<div className="border--2 border-purple-900 w-full flex flex-col justify-center max-md:items-center py-8 gap-6 max-lg:order-2">
						<p className="text-[#fff] font-semibold max-lg:text-center">INFLUENCER  BOOKING</p>
						<h4 className="text-[#fff] max-md:text-[2rem] max-lg:text-center max-xl:text-[3rem] text-[4rem] font-bold"> Find the perfect influencer for your campaign. </h4>
						<p className="text-[#fff] font-medium max-lg:text-center"> Engage with influential personalities who resonate with your brand's ethos and effectively engage your desired demographic. </p>
						<div className="flex max-lg:justify-center gap-3">
							<div className="w-fit flex justify-center items-center mt-4">
								<Button name={'Get Started'} className={'max-[430px]:px-5 px-14 py-4 bg-[#fff]'} bgcolor={'#fff'} pClass={'text-[#1078bc] font-semibold'} />
							</div>
							<div className="w-fit flex justify-center items-center mt-4 gap-3">
								<Button name={'How It Works?'} className={'max-[430px]:px-5 px-14 py-4 border-2 border-[#fff]'} bgcolor={'#fff'} pClass={'text-[#fff] font-semibold'} />
							</div>
						</div>
					</div>

					<div className="border--2 border-purple-900 w-full flex justify-center items-center relative max-lg:order-1">
						<img src="image/main/herosec_img.png" alt="img.png" className="h-full" />
						<img src="image/main/popup_1.png" alt='img' id="popup_1" className="absolute left-[0vw] w-[40%] translate-y-[2vw] opacity-0" />
						<img src="image/main/popup_2.png" alt='img' id="popup_2" className="absolute right-[0vw] bottom-5 w-[40%] translate-y-[2vw] opacity-0" />
					</div>

				</div>

			</header>

			<section className={`sec_2 border--2 border-red-900 w-full ${padding_} my-32`}>
				<div className="border-t-2 border-b-2 border-[fff]  w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					<div className="border--2 border-green-900 w-full max-md:h-[6rem] h-[10rem] flex flex-col justify-center items-center">
						<h1 className="text-[#fff]"> 15K </h1>
						<p className="font-semibold mt-2 text-[#fff]"> Happy Customers </p>
					</div>
					<div className="border--2 border-green-900 w-full max-md:h-[6rem] h-[10rem] flex flex-col justify-center items-center">
						<h1 className="text-[#fff]"> 150K </h1>
						<p className="font-semibold text-[#fff] mt-2"> Monthly Visitors </p>
					</div>
					<div className="border--2 border-green-900 w-full max-md:h-[6rem] h-[10rem] flex flex-col justify-center items-center">
						<h1 className="text-[#fff]"> 15 </h1>
						<p className="font-semibold text-[#fff] mt-2"> Countries Worldwide </p>
					</div>
					<div className="border--2 border-green-900 w-full max-md:h-[6rem] h-[10rem] flex flex-col justify-center items-center">
						<h1 className="text-[#fff]"> 100+ </h1>
						<p className="font-semibold text-[#fff] mt-2"> Pharmacies </p>
					</div>
				</div>
			</section>

			<section className={`sec_3 border--2 border-red-900 bg--[#DE812730] w-full ${padding_} mt-0 my-32 flex flex-col gap-8 relative`}>

				<img src="image/main/top_2.png" alt="img.png" className="w-[40%] absolute right-0 top-[35%] max-md:top-[70%] max-lg:top-[75%]" />

				<div className="border--2 border-purple-900 w-full flex flex-col justify-center max-md:items-center py-8 gap-2">
					<h4 className="text-[#fff] max-md:text-[2rem] text-center text-[3rem] font-bold"> Top influencers </h4>
				</div>

				<div className="border--2 border-[orange] w-full h-fit mb-10">
					<Swiper
						slidesPerView={9}
						spaceBetween={4}
						pagination={{
							clickable: true,
						}}
						autoplay={
							{
								delay: 1500,
								disableOnInteraction: false,
							}
						}
						loop={true}
						centeredSlides={true}
						grabCursor={true}
						breakpoints={{
							1280: {
								slidesPerView: 9,
							},
							1024: {
								slidesPerView: 8,
							},
							929: {
								slidesPerView: 8,
							},
							807: {
								slidesPerView: 7,
							},
							500: {
								slidesPerView: 5,
							},
							425: {
								slidesPerView: 4,
							},
							250: {
								slidesPerView: 3,
							},
						}}
						modules={[Autoplay]}
						className="mySwiper border--2 border-black"
					>
						{
							slide_1.map((item) => (
								<SwiperSlide key={item.id} className="border--2 border-green-900">

									<div className={`${styles.packages_} border--2 border-green-900 bg-[#DE8127] max-md:w--full w-fit flex flex-col justify-center items--center p-2 rounded-2xl`}>
										<div className="border--2 border-red-700">
											<img src={item.img} alt="img" className="w-[5rem]" />
										</div>
										<p className="text-center text-white mt-2" > {item.name} </p>
										<p className="text-center text-white mt-1" > {item.category} </p>
									</div>

								</SwiperSlide>
							))
						}
					</Swiper>
				</div>

				<div className="border--2 border-green bg-[#ffffff48] w-full max-lg:h-fit h-[20rem] flex max-lg:flex-col gap-8 rounded-xl overflow-hidden max-lg:p-2 p-5  mb-10">

					<div className="border--2 border-[red] max-lg:w-full min-w-[18rem] h-full rounded-xl overflow-hidden">
						<img src="image/main/img_.png" alt="img" className="w-full h-full object-cover" />
					</div>

					<div className="border--2 border-orange-700 w-full max-lg:h-fit h-full flex flex-col justify-center gap-4 max-lg:p-5">
						<h4 className="text-3xl font-medium text-white"> Cathay </h4>
						<div className="border--2 border-[green] flex w-fit gap-4">
							<div className="flex justify-start items-center w-fit">
								<FaFacebookF className="text-white text-2xl" />
								<span className="text-white text-xs ms-1"> 100k <br /> follower</span>
							</div>
							<div className="flex justify-start items-center w-fit">
								<FaTwitter className="text-white text-2xl" />
								<span className="text-white text-xs ms-2"> 100k <br /> follower</span>
							</div>
							<div className="flex justify-start items-center w-fit">
								<RiInstagramFill className="text-white text-2xl" />
								<span className="text-white text-xs ms-2"> 100k <br /> follower</span>
							</div>
						</div>
						<p className="text-white">
							I'm Cathay, content creator and influencer with a passion for exploring and sharing unique life experiences. My focus revolves around showcasing culture, travel, food, and lifestyle through my lens. <br />
							With a proven track record of creating engaging content and connecting naturally with my audience, I'm excited to collaborate with you. I believe my creativity can ignite interest in your brand or product...
						</p>
						<div className="w-full flex justify-between items-center flex-wrap">
							<div className="min-w-fit flex flex-wrap max-sm:justify-center max-sm:items-center max-sm:mt-3 gap-3">
								<h5 className="text-[#1078BC] bg-white font-semibold min-w-fit h-fit rounded-full px-4 py-2"> Food </h5>
								<h5 className="text-[#1078BC] bg-white font-semibold min-w-fit h-fit rounded-full px-4 py-2"> Travel </h5>
								<h5 className="text-[#1078BC] bg-white font-semibold min-w-fit h-fit rounded-full px-4 py-2"> LifeStyle </h5>
							</div>
							<div className="min-w-fit flex max-sm:justify-start justify-center items-center p-2 rounded-lg px-5 max-sm:mt-5">
								<Button name={'Contact Influencer'} className={'px-3 py-2'} bgcolor={'#fff'} pClass={'text-[#fff] font-semibold'} />
								<FaArrowRight className="text-[#fff] text-xl" />
							</div>
						</div>
					</div>

				</div>

				<div className="max-lg:hidden">
					<VerticalSlide />
				</div>
			</section>

			<section id="faq" className={`${styles.sec_4} border--2 border-red-900 w-full min-h--[40rem] ${padding_} my--32 mt-0 flex flex-col gap-8 relative z-50`}>

				<img src="image/main/top_3.png" alt="img.png" className="w-[40%] absolute left-0 top-[35%] max-md:top-[70%] max-lg:top-[75%]" />

				<div className="border--2 border-purple-900 w-full flex flex-col justify-center max-md:items-center py-8 gap-2">
					<h4 className="text-[#fff] max-md:text-[2rem] text-center text-[3rem] font-bold"> Frequently asked questions </h4>
				</div>
				<div className="container max-md:w-full max-lg:w-[40rem] w-[45rem] relative flex justify-center items-center">
					<img src="image/main/circle.gif" alt="img.fif" className="w-[90%] absolute opacity-[0.5] mix-blend-plus-lighter" />
					<AccordionPri array_faq={array_faq} className={`text-white w-fit text-lg no-underline hover:no-underline`} className_ans={`text-white`} />
				</div>
			</section>

			<section id="contact" className={`${styles.sec_5} border--2 border-red-900 w-full h-fit ${padding_} grid grid-cols-1 lg:grid-cols-2 mt-0 z-10 pt-40 py-20`}>

				<div className="border--2 border-purple-900 w-full flex flex-col justify-center items-center">
					<h4 className="text-[#fff] max-md:text-[2rem] max-lg:text-center text-[3.5rem] font-semibold">
						Let's discuss on something cool together
					</h4>
					<ul className="border--2 border-green-900 w-full flex flex-col max-lg:items-center max-lg:py-8 py-4 gap-5">
						<li className="text-base font-medium text-[#fff] flex items-center"> <FiPhone className="text-xl text-[#fff] me-2" /> (480) 555-0103</li>
						<li className="text-base font-medium text-[#fff] max-md:text-center flex"> <SlLocationPin className="max-[400px]:text-[1.9rem] md:text-2xl lg:text-2xl text-[#fff] me-2" /> 4517 Washington Ave. Manchester, Kentucky 39495</li>
						<li className="text-base font-medium text-[#fff] flex items-center"> <TfiEmail className="text-xl text-[#fff] me-2" /> debra.holt@example.com </li>
					</ul>
				</div>

				<form action="" className="border--2 border-green-950 mb-10 flex flex-col justify-center items-center gap-6">
					<div className={`max-md:w-full w-[60%]`}>
						<InputPri type={'text'} placeholder={'Your Name'} className={`${styles.input_} border-0 border-b-2 rounded-none focus:border-[#fff] shadow-none placeholder:text-white`} />
					</div>
					<div className={`max-md:w-full w-[60%]`}>
						<InputPri type={'email'} placeholder={'Your email'} className={`border-0 border-b-2 rounded-none focus:border-[#fff] shadow-none placeholder:text-white`} />
					</div>
					<div className="max-md:w-full w-[60%] h-full rounded-md">
						<TextareaPri placeholder={`Your message`} className={`border-0 border-b-2 h-[10rem] rounded-none shadow-none mt-2 transition-all placeholder:text-white`} />
					</div>
					<div className="max-md:w-full w-[60%] flex justify-start">
						<Button name={'Send message'} className={'px-14 py-4 border-2 border-white bg-[#fff]'} bgcolor={'#DE8127'} pClass={'text-[#00B4B3] font-semibold'} />
					</div>
				</form>

			</section>

			<footer className={`sec_6 border--2 border-red-900 bg-white w-full ${padding_} mb--8`}>
				<div className="border--2 border-[red] w-full flex justify-between max-lg:flex-col my-11 gap--5">
					<ul className="border--2 border-green-900 w-full flex flex-col max-lg:items-center gap-3">
						<li className="border--2 border-[red] text-lg font-bold text-[#252B42] w-full flex max-lg:justify-center">
							<img src="image/main/logo_dark.png" alt="img" className="w-[15rem] max-sm:ms-10" />
						</li>
						<li className="text-base font-medium text-[#737373] flex items-center mt-4">
							<p className="text-[#00B4B3] max-lg:text-center">
								Join millions of people who organize work <br /> and life with Cheeky.
							</p>
						</li>
					</ul>
					<ul className="border--2 border-green-900 w-full flex justify-end max-lg:justify-center max-sm:flex-col max-lg:mt-10 items-center gap-5">
						<li className="text-base font-medium text-[#00B4B3]"> FAQ </li>
						<li className="text-base font-medium text-[#00B4B3]">Support</li>
						<li className="text-base font-medium text-[#00B4B3]">Contact</li>
						<li className="text-base font-medium text-[#00B4B3]">
							<SelectPri />
						</li>
					</ul>
				</div>
				<div className="border--2 border-green-900 w-full py-2 flex items-center justify-between">
					<p className="text-[#BAC3CA] font-semibold">© Cheeky - All Rights Reserved </p>
					<div className="flex gap-2">
						<FaFacebook className="text-lg text-[#BAC3CA]" />
						<FaInstagram className="text-lg text-[#BAC3CA]" />
						<FaTwitter className="text-lg text-[#BAC3CA]" />
					</div>
				</div>
			</footer>

		</main>
	);
}
