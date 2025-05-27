import React, { useState } from "react";
import { Menu as MenuIcon, X as CloseIcon, Bell } from "lucide-react";
import logo from "/src/assets/logo.png";
import telephone from "/src/assets/phone.gif";
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
        <i
          className="bx bx-menu xl:hidden block text-5xl cursor-pointer text-sky-400"
          id="menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></i>

        {/*Mobil Menu */}
        <div
          className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col gap-6 font-semibold text-lg transform transition-transform z-50 ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
            to={"/kampanyalar/kablonet"}
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
                <NavLink to={"/cihazlar"} onClick={handleLinkClick}>Modemler</NavLink>
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
                <NavLink to={"/"} onClick={handleLinkClick}>Paketler</NavLink>
              </li>
              <li className="p-3 hover:bg-sky-100 cursor-pointer">
                <NavLink to={"/"} onClick={handleLinkClick}>Cihazlar</NavLink>
              </li>
              <li className="p-3 hover:bg-sky-100 cursor-pointer">
                <NavLink to={"/"} onClick={handleLinkClick}>Frekans Listesi</NavLink>
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
            DİĞER HİZMETLER
            <span className="text-sky-400  hover:text-white">
              {activeMenu === "diger hizmetler" ? "▲" : "▼"}
            </span>
          </NavLink>

          {activeMenu === "diger hizmetler" && (
            <ul className="flex flex-col ml-4">
              <li className="p-3 hover:bg-sky-100 cursor-pointer">
                <NavLink to={"/"}>Kablo Ses</NavLink>
              </li>
              <li className="p-3 hover:bg-sky-100 cursor-pointer">
                <NavLink to={"/"}>Kablo Bulut</NavLink>
              </li>
              <li className="p-3 hover:bg-sky-100 cursor-pointer">
                <NavLink to={"/"}>Türksat Siber</NavLink>
              </li>
              <li className="p-3 hover:bg-sky-100 cursor-pointer">
                <NavLink to={"/"}>Eğitim Paketleri</NavLink>
              </li>
            </ul>
          )}

          <NavLink
            onClick={() =>
              setActiveMenu(activeMenu === "destek" ? null : "destek")
            }
            className="list-none w-[170px] p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer flex justify-between items-center"
          >
            DESTEK
            <span className="text-sky-400  hover:text-white">
              {activeMenu === "destek" ? "▲" : "▼"}
            </span>
          </NavLink>

          {activeMenu === "destek" && (
            <ul className="flex flex-col ml-4">
              <li className="p-3 hover:bg-sky-100 cursor-pointer">
                <NavLink to={"/"}>S.S.S</NavLink>
              </li>
            </ul>
          )}

          {/* Mobil Menu - Kampanyalar butonu */}
          <NavLink
            to="/kampanyalar"
            onClick={handleLinkClick}
            className="animated-button hover:scale-105 transition-all"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Kampanyalar
          </NavLink>
        </div>
      </div>

      <div
        className={`flex justify-center items-center text-white py-6 px-8 md:px-42 bg-[#000F73] drop-shadow-md h-[70px] ${!isMenuOpen ? "opacity-100" : "opacity-0"
          } hidden xl:flex`}
      >
        <NavLink to="/kampanyalar" className="list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
          KAMPANYALAR
        </NavLink>
        
        {/* KABLONET dropdown menüsü */}
        <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
         <NavLink  to={"/kampanyalar/kablonet"}>KABLONET</NavLink> 
          <ul className="absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
              <NavLink to={"/tarifeler"}>Tarifeler</NavLink>
            </li>
            <li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
              <NavLink to={"/cihazlar"}>Cihazlar</NavLink>
            </li>
          </ul>
        </div>

        {/* TELEVİZYON dropdown menüsü */}
        <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
          TELEVİZYON
          <ul className="absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
              <NavLink to={"/tarifeler"}>Paketler</NavLink>
            </li>
            <li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
              <NavLink to={"/"}>Servisler</NavLink>
            </li>
          </ul>
        </div>

        {/* DİĞER HİZMETLER menüsü */}
        <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
          DİĞER HİZMETLER
          <ul className="absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
              <NavLink to={"/"}>Kablo Ses</NavLink>
            </li>
            <li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
              <NavLink to={"/"}>Kablo Bulut</NavLink>
            </li>
          </ul>
        </div>

        {/* DESTEK menüsü */}
        <div className="relative group list-none w-[170px] text-center p-4 hover:bg-sky-400 hover:text-white hover:rounded-xl transition-all cursor-pointer">
          DESTEK
          <ul className="absolute left-0 w-[170px] mt-5 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <li className="p-3 hover:bg-sky-200 cursor-pointer hover:rounded-xl">
              <NavLink to={"/"}>S.S.S</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
