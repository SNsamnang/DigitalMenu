import { useTranslation } from "react-i18next";
import { anachakCate, anachakMenus, anachakSaleType } from "../data/anachak";
import { useRef, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";

const Menu = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar State
  const categoryRefs = useRef([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Toggle Language Function
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "km" : "en";
    i18n.changeLanguage(newLang);
  };

  // Scroll to the category
  const scrollToCategory = (index) => {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle category click (scroll to section and update state)
  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
    scrollToCategory(index);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter menus based on search term
  const filteredMenus = anachakMenus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm)
  );

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close Sidebar when clicking outside
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Detect active category while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 260; // Adjust for header height

      categoryRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setSelectedCategory(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const ScrollTop = () => {
    scroller.scrollTo("top", {
      duration: 2000,
      delay: 100,
      smooth: "easeInOutQuart",
    });
  };
  return (
    <div className="flex justify-center items-start">
      <div id="top" className="w-full bg-white font-khmer">
        {/* Sidebar Component */}
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
          className="z-50" // Ensure sidebar has higher z-index
        />
        {/* Navbar */}
        <div className="fixed top-0 w-full bg-white z-10">
          <nav className="p-3 bg-orange-400 top-0 w-full relative z-10 ">
            <div className="flex justify-between items-start p-3">
              <div className="flex items-center space-x-3">
                <span
                  onClick={toggleSidebar}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center cursor-pointer"
                >
                  <i className="fas fa-bars text-orange-400 text-xl"></i>
                </span>
              </div>
              <img className="w-32" src="/anachak/logo.png" alt="Logo" />
              <button onClick={toggleLanguage}>
                {i18n.language === "en" ? (
                  <img
                    src="/anachak/engflag.png"
                    className="h-7 w-7 rounded-full cursor-pointer"
                    alt="English Flag"
                  />
                ) : (
                  <img
                    src="/anachak/khflag.png"
                    className="h-7 w-7 rounded-full cursor-pointer"
                    alt="Khmer Flag"
                  />
                )}
              </button>
            </div>

            {/* Search Input Positioned at Bottom-Center */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-10/12 sm:w-8/12 md:w-7/12 lg:w-6/12">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 cursor-pointer">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder={i18n.language === "en" ? "Search" : "ស្វែងរក"}
                className="w-full h-10 pl-9 pr- py-1 border rounded-full ring-1 outline-none ring-orange-400 focus:ring-1 focus:ring-orange-400"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </nav>

          {/* Menu Category Navigation */}
          <div
            id="menu"
            className="m-auto lg:w-10/12 sm:w-11/12 md:w-11/12 flex w-full space-x-3 overflow-x-auto whitespace-nowrap py-3 pl-3 pr-3 scrollbar-hide mt-5 z-10"
          >
            {anachakCate.map((item, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(i)}
                className={`font-normal bg-slate-200 text-[18px] rounded-full min-w-24 h-10 px-1 py-1 flex justify-center items-center text-orange-400
                ${
                  selectedCategory === i
                    ? "border-[2px] border-orange-400"
                    : "border border-transparent hover:border-orange-400"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        {/* Menu Items */}
        <div className="m-auto lg:w-10/12 sm:w-11/12 md:w-11/12 mt-64">
          <div className="w-full px-3 pt-3">
            <img
              className="w-full rounded-2xl"
              src="/anachak/cover.png"
              alt="Cover"
            />
          </div>

          <main className="flex flex-col bg-slate-100">
            {anachakCate.map((a, i) => (
              <div
                key={i}
                ref={(el) => (categoryRefs.current[i] = el)}
                className="w-full scroll-mt-64"
              >
                <div className="flex items-center justify-start bg-white mb-[2px] py-3">
                  <h2 className="mx-3 text-2xl font-bold text-orange-400">
                    {a.name}
                  </h2>
                </div>
                {/* Card Menu */}
                {filteredMenus
                  .filter((b) => b.productType === a.name)
                  .map((b, j) => (
                    <Link to={`/details/${b.id}`} key={j} className="w-full">
                      <div className="w-full h-36 lg:h-48 sm:h-44 md:h-44 bg-white mt-[2px] grid grid-cols-4 gap-2 px-3">
                        <div className="col-span-1 py-4 relative">
                          {b.discount > 0 && (
                            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-400 text-white text-[12px] absolute top-2 left-[-8px]">
                              {b.discount}%
                            </span>
                          )}
                          <img
                            src={b.image}
                            alt={b.image}
                            className="h-24 w-24 lg:h-36 sm:h-32 md:h-32 lg:w-36 sm:w-32 md:w-32 rounded-2xl object-cover"
                          />
                        </div>
                        <div className="col-span-2 py-3 px-3">
                          <div className="flex items-center">
                            <p className="text-[12px] lg:text-[15px] sm:text-[14px] md:text-[14px] text-orange-400 float-left">
                              ID:00{b.id}
                            </p>
                            <span className="ml-2 px-2 py-[1px] uppercase font-bold text-[8px] bg-orange-400 text-white rounded-2xl">
                              {anachakSaleType.find(
                                (sale) => sale.name === b.category
                              )?.value || ""}
                            </span>
                          </div>
                          <p className="text-[14px] lg:text-[17px] sm:text-[16px] md:text-[16px] font-bold text-green-600">
                            {b.name}
                          </p>
                          <p className="text-[10px] lg:text-[13px] sm:text-[12px] md:text-[12px]">
                            {b.description}
                          </p>
                        </div>
                        <div className="col-span-1 flex items-start justify-center py-5">
                          {b.discount > 0 ? (
                            <>
                              <h3 className="font-normal line-through text-gray-600">
                                ${b.price}
                              </h3>
                              <h3 className="font-bold text-orange-400 ml-3">
                                $
                                {(
                                  b.price -
                                  b.price * (b.discount / 100)
                                ).toFixed(2)}
                              </h3>
                            </>
                          ) : (
                            <h3 className="font-bold text-orange-400">
                              ${b.price}
                            </h3>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
          </main>
        </div>
        {/* Scroll to Top Button */}
        <div className="w-full h-36 flex items-center justify-center px-4">
          <span
            onClick={ScrollTop}
            className="w-10 h-10 transition-all rounded-full border-2 border-orange-400 bg-white flex items-center justify-center cursor-pointer"
          >
            <i className="fa-solid fa-chevron-up text-orange-400 text-2xl"></i>
          </span>
        </div>
        {/* Create by Anachark */}
        <div className="w-full bg-white p-3 text-center">
          <div className="text-xl text-gray-400 font-bold">
            Created by{" "}
            <a
              href="https://www.facebook.com/anachak.dev"
              target="_blank"
              className="text-orange-400"
              rel="noopener noreferrer"
            >
              <div className="w-full flex items-center justify-center p-3">
                <img
                  className="w-12 rounded-full"
                  src="/anachak/image.png"
                  alt="Anachak"
                />
              </div>
              <span className="text-[12px] text-black font-normal">
                Digital Menu
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
