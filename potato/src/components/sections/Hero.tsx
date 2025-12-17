import banner from "../../assets/banner.jpg"
import logo_arrow from "../../assets/icon_arrow.svg"

export const Hero = () => {
  return (
  <div className="relative h-[450px] w-full isolate flex flex-col items-center justify-center overflow-hidden bg-gray-50">
      <div>
        {/* 背景图 */}
        <img
          src={banner}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        {/* 玻璃层 */}
        <div className="absolute inset-0 -z-10 bg-white/10 backdrop-blur-[4px]" />
      </div>

      <div className="flex flex-col items-center gap-y-2">
        <p className="text-sm/20 text-white">
          <strong className="font-semibold text-4xl">GalleryShow 2025</strong>
        </p>
        <a
          href="#projects"
          className=" group inline-flex items-center gap-x-2 rounded-full
    bg-gray-900 px-15 py-3 text-md font-semibold text-white
    transition-all duration-300
    hover:bg-pink-500
    hover:ring-2 hover:ring-white
    hover:shadow-[0_0_20px_rgba(255,255,255,0.9)]"
        >
          Get started <span aria-hidden="true"> <img src={logo_arrow} className="h-8 w-auto" /> </span>
        </a>
      </div>

    
    </div>
  );
};
