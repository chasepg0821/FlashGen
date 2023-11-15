import { Steps } from "antd";
import React, { useState } from "react";
import Welcome from "./sub-pages/Welcome";

const steps = [
    {
        title: "Welcome",
        content: <Welcome />
    },
    {
        title: "Build Your Deck",
        content: "Second-content"
    },
    {
        title: "Correctly Paraphrase",
        content: "Last-content"
    },
    {
        title: "Incorrectly Paraphrase",
        content: "Last-content"
    },
    {
        title: "Thank You!",
        content: "Last-content"
    }
];

const items = steps.map((item) => ({
    key: item.title,
    title: item.title
}));

const Home = ({ children }) => {
    const [stepNo, setStepNo] = useState(0);
    const [canAdvance, setCanAdvance] = useState(false);

    const handleChangeAdvancable = () => {
        setCanAdvance(!canAdvance);
    };

    const next = () => {
        setStepNo(stepNo + 1);
        setCanAdvance(false);
    };

    const prev = () => {
        setStepNo(stepNo - 1);
    };

    const renderNavButtons = () => {
        return (
            <div className="nav-button-container">
                {canAdvance && <button onClick={next}>Next</button>}
                {stepNo > 0 && <button onClick={prev}>Previous</button>}
            </div>
        );
    };
    return (
        <div>
            <Steps current={stepNo} items={items} />
            {children}
        </div>
    );
};

export default Home;
