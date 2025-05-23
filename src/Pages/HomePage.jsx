import React from "react";
import serit from "../assets/serit.png";
import aileboyu from "../assets/aileboyu.png";

function HomePage() {
  return (
    <div>
      <div className="relative mx-auto w-full h-[700px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="flex">
          <div className="max-w-prose text-left md:ml-[400px] ">
            <h1 className="text-[14px] md:text-[50px] font-bold text-white ">
              Aile Boyu Fiber Kampanyası
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              <ul className="text-[14px] md:text-[20px] text-[#2F3F8E]" >
                <li>Kolay Başvuru</li>
                <li>Hızlı Kurulum</li>
                <li>Fırsayı Yakala</li>
              </ul>
            </p>

            <div className="mt-4 flex gap-4 sm:mt-6">
              <a
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#2F3F8E]"
                href="#"
              >
                Başvuru
              </a>

              <a
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="max-w-prose ml-auto mr-[10px] md:mr-[400px]">
            <img src={aileboyu} className="w-[300px]" />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center -mt-[90px] items-center text-white py-6 px-8 md:px-42 drop-shadow-md h-[100px]">
      <div className="flex justify-center items-center bg-white rounded-md w-[1200px] h-[150px] m-3">
        
      </div>
</div>
    </div>
  );
}

export default HomePage;
