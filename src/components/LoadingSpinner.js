import DotLoader from "react-spinners/DotLoader";
import React from "react";
import {usePromiseTracker} from "react-promise-tracker";

const LoadingSpinner = () => {
    const { promiseInProgress } = usePromiseTracker();

    if (promiseInProgress) {
        return (
            <div className="d-flex justify-content-center">
                <DotLoader size={150}/>
            </div>
        );
    }
    return null;
}

export default LoadingSpinner;
