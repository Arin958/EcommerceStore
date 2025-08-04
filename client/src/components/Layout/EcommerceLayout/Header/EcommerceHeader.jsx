import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import Icons from "./Icons";
import { Menu, X } from "lucide-react";

const Header = ({ onSearchToggle, cartDrawerOpen, notificationBar, onCartDrawerToggle, onNotificationToggle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-sm bg-white/90">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Logo />
          <DesktopNav />
          <Icons 
            onSearchClick={() => setSearchOpen(!searchOpen)} 
          onCartClick={onCartDrawerToggle}
          onNotificationClick={onNotificationToggle}
            searchOpen={searchOpen}
          />
        </div>

        <SearchBar 
          searchOpen={searchOpen} 
          onClose={() => setSearchOpen(false)}
        />
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;