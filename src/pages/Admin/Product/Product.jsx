import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Accordion from "../../../components/Accordion";
import HeaderTable from "../../../components/HeaderTable";
import ContentTableProduct from "../../../components/ContentTableProduct";
import Pagination from "../../../components/pagination";
import CardMenu from "../../../components/CardMenu"; // Import CardMenu component
// Import Supabase client
import { getProducts } from "../../../controller/product/productController";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const itemsPerPage = 8; // Set items per page to 8
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleMenuClick = (menuItem) => {
    console.log("Selected Menu:", menuItem);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const productNameMatch =
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const ownerNameMatch =
      product.Shop?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;
    return productNameMatch || ownerNameMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="fas fa-spinner fa-spin text-4xl mb-2 text-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-slate-100 flex">
      {/* Sidebar */}
      {isSidebarOpen && (
        <>
          <div className="absolute top-0 left-0 lg:w-[20%] md:w-[35%] sm:w-[50%] w-[60%] h-full z-50 bg-slate-200 shadow-lg">
            <Accordion onMenuClick={handleMenuClick} />
          </div>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          ></div>
        </>
      )}
      {/* Main Dashboard */}
      <div className="flex-1 bg-white h-screen flex flex-col">
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          className="sticky top-0 z-50"
        />
        {/* Content */}
        <div className="flex-1 w-full overflow-auto scrollbar-hide">
          {/* Header Search & Add button */}
          <div className="w-full px-4 py-2 flex items-center justify-between sticky z-10 top-[-1px] bg-white">
            <input
              placeholder="Search By product name or owner"
              className="h-10 w-[40%] bg-slate-200 rounded-md focus:outline-[1px] focus:outline-orange-400 p-3 text-sm lg:text-base"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Link to="/admin/add-product">
              <button className="bg-orange-400 text-white px-4 py-2 rounded-lg text-sm lg:text-base">
                <i className="fas fa-add mr-3"></i>Add Product
              </button>
            </Link>
          </div>
          {/* Table Content */}
          <div className="w-full px-4 lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px] pb-5">
            {/* Conditionally render HeaderTable and ContentTable for larger screens */}
            <div className="hidden sm:block">
              <HeaderTable
                columns={[
                  { name: "No", width: "w-[5%] text-xs lg:text-sm" },
                  { name: "Owner", width: "w-[15%] text-xs lg:text-sm" },
                  { name: "Products", width: "w-[25%] text-xs lg:text-sm" },
                  { name: "Product Type", width: "w-[10%] text-xs lg:text-sm" },
                  { name: "Price", width: "w-[10%] text-xs lg:text-sm" },
                  { name: "Discount", width: "w-[10%] text-xs lg:text-sm" },
                  { name: "Status", width: "w-[10%] text-xs lg:text-sm" },
                  { name: "Action", width: "w-[15%] text-xs lg:text-sm" },
                ]}
              />

              <ContentTableProduct
                products={paginatedProducts}
                // Pass roles if needed
              />
            </div>
            {/* Conditionally render CardMenu for smaller screens */}
            <div className="block sm:hidden">
              <CardMenu products={paginatedProducts} />
            </div>
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
