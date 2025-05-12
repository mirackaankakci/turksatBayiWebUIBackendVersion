import React, { useState } from 'react';
import { Menu as MenuIcon, X as CloseIcon, Bell } from 'lucide-react';
import logo from '/src/assets/logo.png'
import telephone from '/src/assets/phone.gif'
import '/src/index.css';
import './ResponsiveMenu.css' // Tailwind direktiflerini içeren dosya


export default function ResponsiveMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className='w-full h-full absolute bg-gradient-to-r from-blue-400 to-emerald-400'>
      <header>
        <div className='flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md h-[100px]'>
          <a href='#'>
            <img src={logo} alt="Logo" className='w-24 hover:scale-125 transition-all' />
          </a>

          <div className='hidden xl:flex items-center gap-6 w-[500px] justify-end'>

            <img src={telephone} alt="Logo" className='w-9 hover:scale-125 transition-all' style={{ marginRight: "-17px" }} />

            <div className='flex flex-col' style={{ color: "#328AC7" }}>
              <b >Bizi Arayın</b>
              <b><a href='tel:0850 806 60 00' className='text-lg font-semibold '>0850 806 60 00</a></b>

            </div>


            <a href="#" className="animated-button hover:scale-105 transition-all">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Başvur
            </a>

          </div>
          <i className='bx bx-menu xl:hidden block text-5xl cursor-pointer text-sky-400' id='menu-icon' onClick={() => setIsMenuOpen(!isMenuOpen)}></i>






          {/*Mobil Menu */}
          <div className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col  gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
          >
            <li className='list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer'>KAMPANYALAR</li>
            <li
              onClick={() => setActiveMenu(activeMenu === 'kablonet' ? null : 'kablonet')}
              className='list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer flex justify-between items-center'
            >
              KABLONET
              <span className='text-sky-400  hover:text-white'>{activeMenu === 'kablonet' ? '▲' : '▼'}</span>
            </li>

            {activeMenu === 'kablonet' && (
              <ul className='flex flex-col ml-4'>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Tarifeler</li>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Modemler</li>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Paketler</li>
              </ul>
            )}



            
            <li
              onClick={() => setActiveMenu(activeMenu === 'televizyon' ? null : 'televizyon')}
              className='list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer flex justify-between items-center'
            >
              KABLO TV
              <span className='text-sky-400  hover:text-white'>{activeMenu === 'televizyon' ? '▲' : '▼'}</span>
            </li>

            {activeMenu === 'televizyon' && (
              <ul className='flex flex-col ml-4'>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Paketler</li>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Cihazlar</li>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Frekans Listesi</li>
              </ul>
            )}
            


            <li
              onClick={() => setActiveMenu(activeMenu === 'diger hizmetler' ? null : 'diger hizmetler')}
              className='list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer flex justify-between items-center'
            >
              DİĞER HİZMETLER
              <span className='text-sky-400  hover:text-white'>{activeMenu === 'diger hizmetler' ? '▲' : '▼'}</span>
            </li>

            {activeMenu === 'diger hizmetler' && (
              <ul className='flex flex-col ml-4'>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Kablo Ses</li>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Kablo Bulut</li>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Türksat Siber</li>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>Eğitim Paketleri</li>
              </ul>
            )}




<li
              onClick={() => setActiveMenu(activeMenu === 'destek' ? null : 'destek')}
              className='list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer flex justify-between items-center'
            >
              DESTEK
              <span className='text-sky-400  hover:text-white'>{activeMenu === 'destek' ? '▲' : '▼'}</span>
            </li>

            {activeMenu === 'destek' && (
              <ul className='flex flex-col ml-4'>
                <li className='p-3 hover:bg-sky-100 cursor-pointer'>S.S.S</li>
              </ul>
            )}



            <a href="#" className="animated-button hover:scale-105 transition-all">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Başvur
            </a>

            <a href="#" className="animated-button hover:scale-105 transition-all">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Kampanyalar
            </a>
          </div>



        </div>



       
        <div className={`flex justify-center items-center text-white py-6 px-8 md:px-42 bg-[#000F73] drop-shadow-md h-[70px] ${!isMenuOpen ? 'opacity-100' : 'opacity-0'
          } hidden xl:flex`}>


          <li className='list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer'>KAMPANYALAR</li>
          <li className='relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer'>
            TELEVİZYON
            <ul className='absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10'>
              <li className='p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl' >Paketler</li>
              <li className='p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl'>Servisler</li>
            </ul>
          </li>
          <li className='list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer'>İNTERNET</li>
          <li className='list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer'>DİĞER HİZMETLER</li>
          <li className='list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer'>DESTEK</li>

        </div>
      </header>
    </div>
  );
}
