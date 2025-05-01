# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Password Supabase: sj5XDyZUH9V5W7zZ

API Key supabase: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbGNoamJ3cHl3YnFzc291bm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMDM2MzksImV4cCI6MjA1NzU3OTYzOX0.bU7UKxaX\_-aT2Aif5E4-4n5_Z59MlMAC2ExVIPzQ3eE


{/* Table Content */}
          <div className="w-full px-4 lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px] pb-5">
            {/* Table for larger screens */}
            <div className="hidden sm:block">
              <HeaderTable
                columns={[
                  { name: "No", width: "w-[5%] text-xs lg:text-sm" },
                  { name: "Owner", width: "w-[15%] text-xs lg:text-sm" },
                  { name: "Products", width: "w-[25%] text-xs lg:text-sm" },
                  { name: "Category", width: "w-[10%] text-xs lg:text-sm" },
                  { name: "Price", width: "w-[10%] text-xs lg:text-sm" },
                  { name: "Discount", width: "w-[10%] text-xs lg:text-sm" },
                  { name: "Status", width: "w-[10%] text-xs lg:text-sm" },
                  { name: "Action", width: "w-[15%] text-xs lg:text-sm" },
                ]}
              />
              <ContentTable products={paginatedProducts} />
            </div>

            {/* Card menu for smaller screens */}
            <div className="block sm:hidden">
              {loading ? <p>Loading...</p> : paginatedProducts.map((product, index) => (
                <CardMenu key={index} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
