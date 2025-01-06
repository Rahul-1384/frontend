import React from "react";
import hero from '../images/hero-bg.png';

const Hero = () => {
    return (
        <div>
            <img  src={hero}  alt="Hero-bg"  useMap="#workmap" className="w-full h-auto object-cover img-fluid" />       
            
            <map name="workmap">
                <area shape="rect" coords="740,450,800,560" href="https://example.com/profile" alt="Person Sitting" />
            </map>
        </div>
    );
}

export default Hero;
