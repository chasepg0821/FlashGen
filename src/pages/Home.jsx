import { FloatButton, Steps } from "antd";
import React, { useState } from "react";
import Welcome from "./sub-pages/Welcome";
import { StepBackwardFilled, StepForwardFilled } from "@ant-design/icons";

import style from "./home.module.css";

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
        content: "Last-content",
        description: "The end of the study!"
    }
];

const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description
}));

const Home = () => {
    const [stepNo, setStepNo] = useState(1);
    const [stepStatus, setStepStatus] = useState("process");
    const [canAdvance, setCanAdvance] = useState(true);

    const handleChangeAdvancable = () => {
        setCanAdvance(!canAdvance);
    };

    const next = () => {
        setStepNo(stepNo + 1);
        setCanAdvance(false);
    };

    const prev = () => {
        setStepNo(stepNo - 1);
        setCanAdvance(false);
    };

    const handleStepStatus = (status) => {
        setStepStatus(status);
    };

    const renderNavButtons = () => {
        return (
            <>
                {canAdvance && (
                    <FloatButton
                        icon={<StepForwardFilled />}
                        shape="square"
                        onClick={next}
                        type="primary"
                        description="Next"
                        style={{
                            width: 128
                        }}
                    />
                )}
                {stepNo > 0 && (
                    <FloatButton
                        icon={<StepBackwardFilled />}
                        shape="square"
                        onClick={prev}
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
                status={stepStatus}
                current={stepNo}
                items={items}
                className={style.custom_steps}
            />
            <div className={style.content_window}>{steps[stepNo].content}</div>
            {renderNavButtons()}
            <FloatButton.BackTop shape="square" style={{ left: 24 }} />
        </div>
    );
};

export default Home;
