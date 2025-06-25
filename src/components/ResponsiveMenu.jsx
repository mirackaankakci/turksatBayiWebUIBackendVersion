import React, { useState } from "react";
import { Menu as MenuIcon, X as CloseIcon, Bell, Phone } from "lucide-react";
import logo from "/assets/logo.png";
import telephone from "/assets/phone.gif";
import "/src/index.css";
import "./ResponsiveMenu.css";
import { NavLink } from "react-router-dom";

export default function ResponsiveMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  // Herhangi bir linke tıklandığında menüyü kapatan yeni fonksiyon
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[100px] bg-gradient-to-r z-50">
        <div className="flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md h-[100px] z-50">
          <NavLink to={"/"}>
            <img
              src={logo}
              alt="Logo"
              className="w-24 hover:scale-125 transition-all"
            />
          </NavLink>

          <div className="hidden xl:flex items-center gap-6 w-[500px] justify-end">
            <img
              src={telephone}
              alt="Logo"
              className="w-9 hover:scale-125 transition-all"
              style={{ marginRight: "-17px" }}
            />

            <div className="flex flex-col" style={{ color: "#328AC7" }}>
              <b>Bizi Arayın</b>
              <b>
                <a href="tel:0850 806 60 00" className="text-lg font-semibold ">
                  0850 806 60 00
                </a>
              </b>
            </div>

            <a
              href="/hemenbasvur"
              className="animated-button hover:scale-105 transition-all"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Hemen Başvur
            </a>
          </div>
          
          {/* Mobil görünümde menü butonu ve başvur butonu yan yana */}
          <div className="xl:hidden flex items-center gap-3">
            {/* Hemen Başvur Butonu - Mobil */}
            <a
              href="/hemenbasvur"
              className="animated-button hover:scale-105 transition-all"
              style={{ padding: '10px 7px', fontSize: '14px' }}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Hemen Başvur
            </a>
            
            {/* Menü butonu - İkon düzeltildi */}
            <button
              className="flex items-center justify-center w-12 h-12 text-sky-400 hover:text-sky-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menüyü Aç/Kapat"
            >
              {isMenuOpen ? (
                // Kapatma ikonu (X)
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              ) : (
                // Hamburger menü ikonu
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobil Menu - Düzeltildi */}
          <div
            className={`absolute xl:hidden top-[100px] left-0 w-full bg-white shadow-lg transform transition-all duration-300 ease-in-out z-40 ${
              isMenuOpen 
                ? "translate-y-0 opacity-100 visible" 
                : "-translate-y-full opacity-0 invisible"
            }`}
          >
            <div className="flex flex-col gap-0 font-semibold text-lg border-t border-gray-200">
              
              {/* Kampanyalar */}
              <NavLink
                to="/kampanyalar"
                onClick={handleLinkClick}
                className="block px-6 py-4 hover:bg-sky-400 hover:text-white transition-all border-b border-gray-100"
              >
                KAMPANYALAR
              </NavLink>

              {/* Kablonet */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => {
                    setActiveMenu(activeMenu === "kablonet" ? null : "kablonet");
                  }}
                  className="w-full flex justify-between items-center px-6 py-4 hover:bg-sky-400 hover:text-white transition-all text-left"
                >
                  <NavLink to="/kampanyalar/kablonet" onClick={handleLinkClick}>
                    KABLONET
                  </NavLink>
                  <span className="text-sky-400 ml-2">
                    {activeMenu === "kablonet" ? "▲" : "▼"}
                  </span>
                </button>

                {activeMenu === "kablonet" && (
                  <div className="bg-gray-50">
                    <NavLink 
                      to="/tarifeler" 
                      onClick={handleLinkClick}
                      className="block px-10 py-3 hover:bg-sky-100 border-b border-gray-200"
                    >
                      Tarifeler
                    </NavLink>
                    <NavLink 
                      to="/cihazlar" 
                      onClick={handleLinkClick}
                      className="block px-10 py-3 hover:bg-sky-100"
                    >
                      Cihazlar
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Kablo TV */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => {
                    setActiveMenu(activeMenu === "televizyon" ? null : "televizyon");
                  }}
                  className="w-full flex justify-between items-center px-6 py-4 hover:bg-sky-400 hover:text-white transition-all text-left"
                >
                  <NavLink to="/kampanyalar/kablotv" onClick={handleLinkClick}>
                    KABLO TV
                  </NavLink>
                  <span className="text-sky-400 ml-2">
                    {activeMenu === "televizyon" ? "▲" : "▼"}
                  </span>
                </button>

                {activeMenu === "televizyon" && (
                  <div className="bg-gray-50">
                    <NavLink 
                      to="/kablotv/paketler" 
                      onClick={handleLinkClick}
                      className="block px-10 py-3 hover:bg-sky-100 border-b border-gray-200"
                    >
                      Paketler
                    </NavLink>
                    <NavLink 
                      to="/kablotv/cihazlar" 
                      onClick={handleLinkClick}
                      className="block px-10 py-3 hover:bg-sky-100 border-b border-gray-200"
                    >
                      Cihazlar
                    </NavLink>
                    <NavLink 
                      to="/kablotv/frekans-listesi" 
                      onClick={handleLinkClick}
                      className="block px-10 py-3 hover:bg-sky-100"
                    >
                      Frekans Listesi
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Kablo Ses */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => {
                    setActiveMenu(activeMenu === "diger hizmetler" ? null : "diger hizmetler");
                  }}
                  className="w-full flex justify-between items-center px-6 py-4 hover:bg-sky-400 hover:text-white transition-all text-left"
                >
                  <NavLink to="/kampanyalar/kabloses" onClick={handleLinkClick}>
                    KABLO SES
                  </NavLink>
                  <span className="text-sky-400 ml-2">
                    {activeMenu === "diger hizmetler" ? "▲" : "▼"}
                  </span>
                </button>

                {activeMenu === "diger hizmetler" && (
                  <div className="bg-gray-50">
                    <NavLink 
                      to="/kablotv/tarifeler" 
                      onClick={handleLinkClick}
                      className="block px-10 py-3 hover:bg-sky-100"
                    >
                      Tarifeler
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Servisler */}
              <NavLink
                to="/servisler"
                onClick={handleLinkClick}
                className="block px-6 py-4 hover:bg-sky-400 hover:text-white transition-all border-b border-gray-100"
              >
                SERVİSLER
              </NavLink>

              {/* İletişim */}
              <NavLink
                to="/iletişim"
                onClick={handleLinkClick}
                className="block px-6 py-4 hover:bg-sky-400 hover:text-white transition-all border-b border-gray-100"
              >
                İLETİŞİM
              </NavLink>

              {/* Telefon Butonu */}
              <div className="p-4">
                <a 
                  className="animated-button hover:scale-105 transition-all w-full text-center block" 
                  href="tel:08508066000"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  0850 806 60 00
                </a>
              </div>
            </div>
          </div>

          {/* Overlay - Menü açıkken arka planı karartır */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          )}
        </div>

        {/* Desktop Menu - Alt Bar */}
        <div
          className={`flex justify-center items-center text-white py-6 px-8 md:px-42 bg-[#000F73] drop-shadow-md h-[70px] ${
            !isMenuOpen ? "opacity-100" : "opacity-0"
          } hidden xl:flex`}
        >
          <NavLink to="/kampanyalar" className="list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
            Kampanyalar
          </NavLink>

          {/* KABLONET dropdown menüsü */}
          <NavLink to={"/kampanyalar/kablonet"}>
          <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
           Kablonet
            <ul className="absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <NavLink to={"/tarifeler"}><li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
               Tarifeler
              </li></NavLink>
               <NavLink to={"/cihazlar"}><li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
               Cihazlar
              </li></NavLink>
            </ul>
          </div>
          </NavLink>

          {/* TELEVİZYON dropdown menüsü */}
          <NavLink to={"/kampanyalar/kablotv"}>
          <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
              Kablo TV
            <ul className="absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <NavLink to={"/kablotv/paketler"}> <li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
               Paketler
              </li></NavLink>
               <NavLink to={"/kablotv/cihazlar"}><li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
               Cihazlar
              </li></NavLink>
               <NavLink to={"/kablotv/frekans-listesi"}><li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
               Frekans Listesi
              </li></NavLink>
            </ul>
          </div>
          </NavLink>

          {/* DİĞER HİZMETLER menüsü */}
            <NavLink to={"/kampanyalar/kabloses"}>
          <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
          Kablo Ses
            <ul className="absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <NavLink to={"/kablotv/tarifeler"}><li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
                Tarifeler
              </li></NavLink>

            </ul>
          </div></NavLink>

          <NavLink to="/servisler" className="list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
            Servisler
          </NavLink>
          <NavLink to="/iletişim" className="list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
            İletişim
          </NavLink>
        </div>
      </nav>
      
      {/* Mobil Sabit "Hemen Ara" Butonu */}
      <div className="xl:hidden fixed bottom-5 right-5 z-50">
        <a 
          href="tel:08508066000" 
          className="flex items-center justify-center gap-1 w-auto h-12 px-3 bg-green-600 text-white rounded-full shadow-xl animate-pulse hover:bg-green-700 transition-all"
          aria-label="Hemen Ara"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="font-semibold text-sm">HEMEN ARA</span>
        </a>
      </div>
      
      {/* Mobil Sabit "Hemen Başvur" Butonu */}
      <div className="xl:hidden fixed bottom-5 left-5 z-50">
        <a 
          href="/hemenbasvur" 
          className="flex items-center justify-center gap-1 w-auto h-12 px-3 bg-[#2F3D8D] text-white rounded-full shadow-xl animate-pulse hover:bg-[#354394] transition-all"
          aria-label="Hemen Başvur"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="font-semibold text-sm">HEMEN BAŞVUR</span>
        </a>
      </div>
    </>
  );
}
