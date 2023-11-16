import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, setStep } from "../../features/steps/stepsSlice";
import { Button } from "antd";

const Thanks = () => {
    const status = useSelector(getStatus);

    const dispatch = useDispatch();

    return (
        <div>
            {status === "error" ? "Not 18" : "Good!"}
            <Button
                onClick={() => {
                    dispatch(setStep(0));
                }}>
                Back
            </Button>
        </div>
    );
};

export default Thanks;
