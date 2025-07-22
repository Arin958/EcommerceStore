import BrandInfo from "./BrandInfo";
import QuickLinks from "./QuickLinks";
import CustomerService from "./CustomerService";
import NewsLetter from "./NewsLetter";


const Footer = () => (
  <footer className="bg-gray-900 text-white pt-12 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <BrandInfo />
        <QuickLinks />
        <CustomerService />
        <NewsLetter />
      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} StyleHub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;