import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, setStatus } from "../../features/steps/stepsSlice";
import { Button } from "antd";
import style from "./welcome.module.css";
import { CheckCircleOutlined } from "@ant-design/icons";
import { selectCards } from "../../features/cards/cardsSlice";
import { getCPEvals, getIPEvals } from "../../features/stats/statsSlice";

const Thanks = () => {
    const status = useSelector(getStatus);
    const cards = useSelector(selectCards);
    const ipEvals = useSelector(getIPEvals);
    const cpEvals = useSelector(getCPEvals);

    const dispatch = useDispatch();

    const submitData = async () => {
        const data = {
            cards: cards,
            IPEvals: ipEvals,
            CPEvals: cpEvals
        };
        await fetch("https://flash-gen.azurewebsites.net/api/send-pairs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).catch((e) => {
            console.log(e);
        });

        dispatch(setStatus("finish"));
    };

    const renderError = () => {
        return (
            <p className={style.welcome_message}>
                It looks like you don't meet the age requirements to participate
                in the study. We appreciate the time you took!
            </p>
        );
    };

    const renderSuccess = () => {
        return (
            <>
                <p className={style.welcome_message}>
                    As of this moment, we have only sent your responses to our
                    model. No information has been saved. We appreciate your
                    time and effort, and want to use your inputs for our
                    research.
                </p>
                <p className={style.welcome_message}>
                    If you consent to us storing your
                    <b> responses and model predictions </b> please click the
                    button below:
                </p>
                <p
                    style={{
                        color: "red"
                    }}>
                    Reminder: Even if you choose to send this data, no personal
                    information (unless in the inputs you provided) will be
                    stored.
                </p>
                <Button type="primary" onClick={submitData}>
                    I Agree
                </Button>
            </>
        );
    };

    const renderDone = () => {
        return (
            <>
                <p className={style.welcome_message}>
                    Your responses have been recorded!
                </p>
                <div
                    style={{
                        color: "green"
                    }}>
                    <CheckCircleOutlined
                        style={{
                            fontSize: "150%"
                        }}
                    />
                </div>
            </>
        );
    };

    const renderPageContent = () => {
        switch (status) {
            case "finish":
                return renderDone();
            case "process":
                return renderSuccess();
            default:
                return renderError();
        }
    };

    return (
        <>
            <h1>Thank you for taking part in the FlashGen Alpha Study!</h1>
            {renderPageContent()}
        </>
    );
};

export default Thanks;
