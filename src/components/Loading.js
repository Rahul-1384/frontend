import React from "react";
import './loading.css';
import loadingLogo from '../images/loading-logo.jpg';

const Loading = () => {
    return(
        <div className="flex justify-center items-center h-[100vh] w-[100vw]">
            <img src={loadingLogo} alt="Loading Logo" className="logo w-[7rem] h-[8rem] mix-blend-hard-light"/>
            <span className="loading-text zero font-extrabold text-3xl ml-7">R</span>
            <span className="loading-text one font-extrabold text-3xl">e</span>
            <span className="loading-text two font-extrabold text-3xl">B</span>
            <span className="loading-text three font-extrabold text-3xl">o</span>
            <span className="loading-text four font-extrabold text-3xl">o</span>
            <span className="loading-text five font-extrabold text-3xl">k</span>

        </div>
    );
}
export default Loading;