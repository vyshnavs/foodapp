import React from 'react';
import HeroSection from '../components/homepagecomp/HeroSection';
import LiveFood from '../components/homepagecomp/LiveFood';
import EmergencyZones from '../components/homepagecomp/EmergencyZone';
import TrendCommunities from '../components/homepagecomp/TrendCommunities';
import TrendFoods from '../components/homepagecomp/TrendFoods';
import TrendDonors from '../components/homepagecomp/TrendDonors';
import Footer from '../components/homepagecomp/Footer';
const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <LiveFood/>
            <EmergencyZones/>
            <TrendCommunities/>
            <TrendFoods/>
            <TrendDonors/>
            <Footer/>
        </div>
        
    );
};

export default HomePage;