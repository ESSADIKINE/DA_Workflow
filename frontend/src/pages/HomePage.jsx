import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <AboutUs />
            <Testimonials />
            <CallToAction />
            <Footer />
        </div>
    );
};

export default Home;
