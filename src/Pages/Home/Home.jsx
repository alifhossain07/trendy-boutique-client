import React from 'react';
import Marquee from "react-fast-marquee";

import Banner from './Banner/Banner';
import ShopCategory from './ShopCategory/ShopCategory';
import BestSeller from './BestSeller/BestSeller';
import DealOfTheDay from './DealOfTheDay/DealOfTheDay';
import Testimonial from './Testimonial/Testimonial';
import BlackSale from './BlackSale/BlackSale';

const Home = () => {
    return (
        <div className=''>
        <div className="w-full py-4 bg-blue-600 text-white">
      <Marquee speed={150} gradient={false}>
        <span className="mx-4 text-lg tracking-wider font-para ml-48 mr-48">
          Shop Above $200 and get 40% Discount on Every Item You Buy
        </span>
        <span className="mx-4 text-lg tracking-wider font-para ml-48 mr-48">
          50% Discount on All Acceccories For A Limited Time!
        </span>
        
      </Marquee>
    </div>
            <Banner></Banner>
            <ShopCategory></ShopCategory>
            <BlackSale></BlackSale>
            <BestSeller></BestSeller>
            <DealOfTheDay></DealOfTheDay>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;