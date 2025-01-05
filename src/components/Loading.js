import React from "react";
import loadingLogo from '../images/loading-logo.jpg';

const Loading = () => {
    return(
        <div className="bg-danger w-25 mt-lg-5 m-auto">
            <img src={loadingLogo} alt="Loading Logo" className="w-100 text-center"/>
        </div>
    );
}
export default Loading