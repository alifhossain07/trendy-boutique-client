import React from 'react';

import Banner from './Banner/Banner';
import ShopCategory from './ShopCategory/ShopCategory';
import BestSeller from './BestSeller/BestSeller';
import DealOfTheDay from './DealOfTheDay/DealOfTheDay';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <ShopCategory></ShopCategory>
            <BestSeller></BestSeller>
            <DealOfTheDay></DealOfTheDay>
        </div>
    );
};

export default Home;