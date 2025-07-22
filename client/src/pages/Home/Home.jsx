import HeroSection from "../../components/Home/HeroSection";
import PromotionalBanners from "../../components/Home/PromotionalBanner";
import Testimonials from "../../components/Home/Testimonial";
import BestSellers from "../../components/Product/BestSeller";
import NewArrival from "../../components/Product/NewArrival";
import Trending from "../../components/Product/Trending";

const EcommerceHomepage = () => {
  return (
    <div className="">
      <HeroSection />
      <NewArrival limit={4} />
      <BestSellers limit={8} />
      <PromotionalBanners />
      <Trending limit={8} />
      <Testimonials />
    </div>
  );
};

export default EcommerceHomepage;
