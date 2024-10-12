import React from 'react';

import Banner from './Banner/Banner';
import ShopCategory from './ShopCategory/ShopCategory';
import BestSeller from './BestSeller/BestSeller';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <ShopCategory></ShopCategory>
            <BestSeller></BestSeller>
        </div>
    );
};

export default Home;