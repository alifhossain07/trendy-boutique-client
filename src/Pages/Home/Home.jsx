import React from 'react';

import Banner from './Banner/Banner';
import ShopCategory from './ShopCategory/ShopCategory';
import BestSeller from './BestSeller/BestSeller';
import DealOfTheDay from './DealOfTheDay/DealOfTheDay';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <ShopCategory></ShopCategory>
            <BestSeller></BestSeller>
            <DealOfTheDay></DealOfTheDay>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;