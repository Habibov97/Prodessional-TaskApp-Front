'use client';
import { FaSearch } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
export default function Navbar() {
  return (
    <header className="px-[75px] py-[20px]  bg-[#f8f8f8] shadow-md/10">
      <nav className="max-w-[1200px] mx-auto  flex justify-between items-center">
        <div className="text-3xl font-bold text-red-500">
          Dash<span className="text-[#333]">board</span>
        </div>

        <div className="relative max-w-[700px] w-full ">
          <input
            type="text"
            placeholder="Search your task here..."
            className="py-[10px] px-[15px] h-[34px]  w-full bg-white shadow-md rounded-md"
          />
          <div className="absolute flex justify-center items-center w-[34px] h-full top-0 right-0 bg-red-500 text-white rounded-md">
            <FaSearch />
          </div>
        </div>
        <div className="flex gap-[5px] items-center">
          <div className="flex items-center justify-center  w-[34px] h-[34px] text-[#f3f3f3] bg-red-500 rounded-md">
            <IoMdNotificationsOutline className="text-xl" />
          </div>
          <div className="flex items-center justify-center  w-[34px] h-[34px] text-[#f3f3f3] bg-red-500 rounded-md">
            <FaCalendarAlt className="text-md" />
          </div>
        </div>

        <div className="flex flex-col gap-[0.5px]">
          <div>Tuesday</div>
          <div className="text-blue-500">datetime</div>
        </div>
      </nav>
    </header>
  );
}
