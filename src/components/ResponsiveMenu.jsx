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
              Başvur
            </a>
          </div>
          
          {/* Mobil görünümde menü butonu ve başvur butonu yan yana */}
          <div className="xl:hidden flex items-center gap-3">
            {/* Hemen Başvur Butonu - Mobil (hazır olan animated-button sınıfını kullanarak) */}
            <a
              href="/hemenbasvur"
              className="animated-button hover:scale-105 transition-all"
              style={{ padding: '10px 7px', fontSize: '14px' }}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Başvur
            </a>
            
            {/* Menü butonu */}
            <i
              className="bx bx-menu text-4xl cursor-pointer text-sky-400"
              id="menu-icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            ></i>
          </div>

          {/*Mobil Menu */}
          <div
            className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col gap-6 font-semibold text-lg transform transition-transform z-50 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
          >
            {/* Mobil Menu - Kampanyalar linki */}
            <NavLink
              to="/kampanyalar"
              onClick={handleLinkClick}
              className="list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
              KAMPANYALAR
            </NavLink>

            <NavLink
              onClick={() => {
                setActiveMenu(activeMenu === "kablonet" ? null : "kablonet");
                // Eğer zaten açıksa ve tekrar tıklanırsa kapatacak, 
                // ama başka sayfaya yönlendirmeyecek
              }}
              href={"/kampanyalar/kablonet"}
              className="list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer flex justify-between items-center"
            >
              KABLONET
              <span className="text-sky-400 hover:text-white">
                {activeMenu === "kablonet" ? "▲" : "▼"}
              </span>
            </NavLink>

            {activeMenu === "kablonet" && (
              <ul className="flex flex-col ml-4">
                <li className="p-3 hover:bg-sky-100 cursor-pointer">
                  <NavLink to={"/tarifeler"} onClick={handleLinkClick}>Tarifeler</NavLink>
                </li>
                <li className="p-3 hover:bg-sky-100 cursor-pointer">
                  <NavLink to={"/cihazlar"} onClick={handleLinkClick}>Cihazlar</NavLink>
                </li>
              </ul>
            )}

            <NavLink
              onClick={() => {
                setActiveMenu(activeMenu === "televizyon" ? null : "televizyon");
              }}
              className="list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer flex justify-between items-center"
            >
              KABLO TV
              <span className="text-sky-400 hover:text-white">
                {activeMenu === "televizyon" ? "▲" : "▼"}
              </span>
            </NavLink>

            {activeMenu === "televizyon" && (
              <ul className="flex flex-col ml-4">
                <li className="p-3 hover:bg-sky-100 cursor-pointer">
                  <NavLink to={"/kablotv/paketler"} onClick={handleLinkClick}>Paketler</NavLink>
                  
                </li>
                <li className="p-3 hover:bg-sky-100 cursor-pointer">
                  <NavLink to={"/kablotv/cihazlar"} onClick={handleLinkClick}>Cihazlar</NavLink>
                </li>
                <li className="p-3 hover:bg-sky-100 cursor-pointer">
                  <NavLink to={"/kablotv/frekans-listesi"} onClick={handleLinkClick}>Frekans Listesi</NavLink>
                </li>
              </ul>
            )}

            <NavLink
              onClick={() =>
                setActiveMenu(
                  activeMenu === "diger hizmetler" ? null : "diger hizmetler"
                )
              }
              className="list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer flex justify-between items-center"
            >
              KABLO SES
              <span className="text-sky-400  hover:text-white">
                {activeMenu === "diger hizmetler" ? "▲" : "▼"}
              </span>
            </NavLink>

            {activeMenu === "diger hizmetler" && (
              <ul className="flex flex-col ml-4">
                <li className="p-3 hover:bg-sky-100 cursor-pointer">
                  <NavLink to={"/kablotv/tarifeler"}>Tarifeler</NavLink>
                </li>

              </ul>
            )}

            <NavLink
              to="/servisler"
              onClick={handleLinkClick}
              className="list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
              SERVİSLER
            </NavLink>

            <NavLink
              to="/i̇letisim"
              onClick={handleLinkClick}
              className="list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
              İLETİŞİM 
            </NavLink>

            {/* Mobil Menu - Kampanyalar butonu */}

              <span></span>
              <span></span>
              <span></span>
              <span></span>
               <a className="animated-button hover:scale-105 transition-all" href="tel:08508066000" >0850 806 60 00</a>
      
          </div>
        </div>

        <div
          className={`flex justify-center items-center text-white py-6 px-8 md:px-42 bg-[#000F73] drop-shadow-md h-[70px] ${!isMenuOpen ? "opacity-100" : "opacity-0"
            } hidden xl:flex`}
        >
          <NavLink to="/kampanyalar" className="list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
            Kampanyalar
          </NavLink>

          {/* KABLONET dropdown menüsü */}
          <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
            <NavLink to={"/kampanyalar/kablonet"}>Kablonet</NavLink>
            <ul className="absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <NavLink to={"/tarifeler"}><li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
               Tarifeler
              </li></NavLink>
               <NavLink to={"/cihazlar"}><li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
               Cihazlar
              </li></NavLink>
            </ul>
          </div>

          {/* TELEVİZYON dropdown menüsü */}
          <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
              <NavLink to={"/kampanyalar/kablotv"}>Kablo TV</NavLink>
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

          {/* DİĞER HİZMETLER menüsü */}
          <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
            <NavLink to={"/kampanyalar/kabloses"}>Kablo Ses</NavLink>
            <ul className="absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <NavLink to={"/kablotv/tarifeler"}><li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
                Tarifeler
              </li></NavLink>

            </ul>
          </div>

          <NavLink to="/servisler" className="list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
            Servisler
          </NavLink>
          <NavLink to="/i̇letisim" className="list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
            İletişim
          </NavLink>
        </div>
      </nav>
      
      {/* Mobil Sabit "Hemen Ara" Butonu - Daha büyük ve yazılı */}
      <div className="xl:hidden fixed bottom-5 right-5 z-50">
        <a 
          href="tel:08508066000" 
          className="flex items-center justify-center gap-2 w-auto h-16 px-5 bg-green-600 text-white rounded-full shadow-xl animate-pulse hover:bg-green-700 transition-all"
          aria-label="Hemen Ara"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="font-bold">HEMEN ARA</span>
        </a>
      </div>
    </>
  );
}
