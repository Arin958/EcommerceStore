import { useState } from "react";
import { Outlet } from "react-router-dom";

import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header/EcommerceHeader";
import Footer from "./Footer/EcommerceFooter";
import CartDrawer from "../../Cart/CartDrawer";

const EcommerceLayout = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AnnouncementBar />
      <Header
        searchOpen={searchOpen}
        onSearchToggle={() => setSearchOpen(!searchOpen)}
        cartDrawerOpen={cartDrawerOpen}
        onCartDrawerToggle={() => setCartDrawerOpen(!cartDrawerOpen)}
      />

      <CartDrawer isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default EcommerceLayout;
