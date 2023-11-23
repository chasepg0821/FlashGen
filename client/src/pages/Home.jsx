import { FloatButton, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Welcome from "./sub-pages/Welcome";
import style from "./home.module.css";
import { useSelector } from "react-redux";
import { getStatus, getStepNo } from "../features/steps/stepsSlice";
import Thanks from "./sub-pages/Thanks";
import BAD from "./sub-pages/BAD";
import CP from "./sub-pages/CP";
import IP from "./sub-pages/IP";

const Home = () => {
    const stepNo = useSelector(getStepNo);
    const status = useSelector(getStatus);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
            content: <BAD />,
            description: "Build a set of 10 cards."
        },
        {
            title: "Correctly Paraphrase",
            content: <CP />,
            description: "Give correct paraphrases."
        },
        {
            title: "Incorrectly Paraphrase",
            content: <IP />,
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

    return (
        <div className={style.page_window}>
            <Helmet>
                <title>{`FlashGen Alpha | Step ${stepNo + 1}`}</title>
            </Helmet>
            <Steps
                status={status}
                current={stepNo}
                items={items}
                className={style.custom_steps}
                size={windowWidth < 1200 ? "small" : "default"}
                direction={windowWidth < 1000 ? "vertical" : "horizontal"}
            />
            <div className={style.content_window}>{steps[stepNo].content}</div>
            <FloatButton.BackTop shape="square" style={{ left: 24 }} />
        </div>
    );
};

export default Home;
