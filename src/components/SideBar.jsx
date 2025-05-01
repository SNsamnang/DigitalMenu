import { useTranslation } from "react-i18next";

const SideBar = ({ isOpen, toggleSidebar, closeSidebar }) => {
  const { i18n } = useTranslation();

  return (
    <>
      {/* Sidebar Component */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-center bg-orange-400 items-center p-4 border-b border-gray-200">
          <img className="w-28" src="/anachak/logo.png" alt="Logo" />
        </div>

        {/* Sidebar Content */}
        <div className="w-80 p-4 py-10 space-y-3 text-center text-wrap">
          <div className="w-full flex items-center justify-center px-4">
            <span className="w-10 h-10 rounded-full border-2 border-orange-400 bg-white flex items-center justify-center cursor-pointer">
              <i className="fas fa-location-dot text-orange-400 text-2xl"></i>
            </span>
          </div>
          <h2 className="text-center font-bold text-2xl text-green-600">
            Nham Salmon
          </h2>
          <p className="text-center text-sm text-gray-500">
            Indulge in our delicious homemade pizzas, topped with your favorite
            ingredients.
          </p>
          <div className="flex justify-center gap-2">
            {["telegram-plane", "youtube", "tiktok", "facebook-messenger"].map(
              (icon, index) => (
                <span
                  key={index}
                  className="w-10 h-10 rounded-full border-2 border-orange-400 bg-white flex items-center justify-center cursor-pointer"
                >
                  <i className={`fab fa-${icon} text-orange-400 text-2xl`}></i>
                </span>
              )
            )}
          </div>
          <div className="flex justify-center gap-2 pt-6">
            <span className="w-10 h-10 rounded-full border-2 border-orange-400 bg-white flex items-center justify-center cursor-pointer">
              <i className="fas fa-phone text-orange-400 text-2xl"></i>
            </span>
            <p className="text-2xl text-green-600">068 809 810</p>
          </div>
        </div>
      </div>

      {/* Overlay to close sidebar */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
};

export default SideBar;
