import React from "react";

const ProfileTable = () => {

    const tableData = [
        {
            name: "Sunrise Agency",
            count1: 2000,
            category: "SMP",
            count2: 6000,
            date: "6 Feb 2023",
            status: "completed"
        },
        {
            name: "Another Agency",
            count1: 1500,
            category: "ABC",
            count2: 4500,
            date: "8 Feb 2023",
            status: "in progress"
        },
        {
            name: "XYZ Solutions",
            count1: 3000,
            category: "DEF",
            count2: 7500,
            date: "10 Feb 2023",
            status: "pending"
        },
        {
            name: "Global Innovations",
            count1: 1800,
            category: "GHI",
            count2: 5000,
            date: "12 Feb 2023",
            status: "completed"
        },
        {
            name: "Tech Ventures",
            count1: 2500,
            category: "JKL",
            count2: 6800,
            date: "15 Feb 2023",
            status: "in progress"
        }
    ];

    return (
        <table className="md:w-full w-[50rem]">
            <thead>
                <tr className="text-primary-color">
                    <th className="text-start py-3 pl-8">Brand Name</th>
                    <th className="text-start py-3">Rated</th>
                    <th className="text-start py-3">Category</th>
                    <th className="text-start py-3">Reach</th>
                    <th className="text-start py-3">Collaboration Date</th>
                    <th className="text-start py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                {tableData?.map((item, i) => (

                    <tr className="bg-primary-color table_data text-white">
                        <td className="py-3 pl-8">Sunrise Agency</td>
                        <td className="py-3">2K+</td>
                        <td className="py-3">SMP</td>
                        <td className="py-3">6000+</td>
                        <td className="py-3">6 Feb 2023</td>
                        <td className="py-3">completed</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProfileTable;
