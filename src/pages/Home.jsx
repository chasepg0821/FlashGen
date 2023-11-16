import { FloatButton, Steps } from "antd";
import React, { useEffect, useState } from "react";
import Welcome from "./sub-pages/Welcome";
import { StepBackwardFilled, StepForwardFilled } from "@ant-design/icons";

import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    getCA,
    getStatus,
    getStepNo,
    nextStep,
    prevStep
} from "../features/steps/stepsSlice";
import Thanks from "./sub-pages/Thanks";

const Home = () => {
    const stepNo = useSelector(getStepNo);
    const status = useSelector(getStatus);
    const canAdvance = useSelector(getCA);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const dispatch = useDispatch();

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const steps = [
        {
            title: "Welcome",
            content: <Welcome />,
            description: "Brief intro and confirmation of eligibility."
        },
        {
            title: "Build Your Deck",
            content: "Second-content",
            description: "Build a set of 10 cards."
        },
        {
            title: "Correctly Paraphrase",
            content: "Last-content",
            description: "Give correct paraphrases."
        },
        {
            title: "Incorrectly Paraphrase",
            content: "Last-content",
            description: "Give incorrect paraphrases."
        },
        {
            title: "Thank You!",
            content: <Thanks />,
            description: "The end of the study!"
        }
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        description: item.description
    }));

    const renderNavButtons = () => {
        return (
            <>
                {canAdvance && (
                    <FloatButton
                        icon={<StepForwardFilled />}
                        shape="square"
                        onClick={dispatch(nextStep())}
                        type="primary"
                        description="Next"
                        style={{
                            width: 128
                        }}
                    />
                )}
                {stepNo > 1 && stepNo !== 4 && (
                    <FloatButton
                        icon={<StepBackwardFilled />}
                        shape="square"
                        onClick={dispatch(prevStep())}
                        style={{
                            right: canAdvance ? 24 + 138 : 24,
                            width: 128
                        }}
                        description="Back"
                    />
                )}
            </>
        );
    };
    return (
        <div className={style.page_window}>
            <Steps
                status={status}
                current={stepNo}
                items={items}
                className={style.custom_steps}
                size={windowWidth < 1200 ? "small" : "default"}
                direction={windowWidth < 1000 ? "vertical" : "horizontal"}
            />
            <div className={style.content_window}>{steps[stepNo].content}</div>
            {renderNavButtons()}
            <FloatButton.BackTop shape="square" style={{ left: 24 }} />
        </div>
    );
};

export default Home;
