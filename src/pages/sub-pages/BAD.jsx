import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCards, updateCards } from "../../features/cards/cardsSlice";
import { cloneDeep, includes } from "lodash";

import style from "./bad.module.css";
import { Button } from "antd";
import { nextStep } from "../../features/steps/stepsSlice";

const BAD = () => {
    const cards = useSelector(selectCards);
    const [cardsState, setCardsState] = useState(cards);
    const [errors, setErrors] = useState([]);
    const [pageStep, setPageStep] = useState("create");

    const dispatch = useDispatch();

    useEffect(() => {
        setCardsState(cards);
    }, [cards]);

    const changeStep = (step) => {
        setPageStep(step);
        window.scrollTo(0, 0);
    };

    const updateCard = (key, index) => (e) => {
        const state = cloneDeep(cardsState);
        state[index] = {
            ...state[index],
            [key]: e.target.value
        };
        setCardsState(state);
    };

    const checkForEmptyFields = () => {
        const errors = [];
        cardsState.map((card, index) => {
            if (card.prompt === "" || card.answer === "") {
                errors.push(index);
            }
        });
        setErrors(errors);
        return errors.length;
    };

    const submitCards = () => {
        const errorNo = checkForEmptyFields();

        if (errorNo === 0 && pageStep === "create") {
            changeStep("confirm");
        } else if (pageStep === "confirm") {
            dispatch(nextStep());
        }
    };

    const renderCreate = () => {
        return cardsState.map((card, index) => {
            return (
                <div
                    className={style.input_section}
                    key={index}
                    style={{
                        border: `1px solid ${
                            includes(errors, index) ? "red" : "#00000020"
                        }`
                    }}>
                    <div className={style.input_group}>
                        <h3>Prompt:</h3>
                        <textarea
                            className={style.input}
                            onBlur={() => dispatch(updateCards(cardsState))}
                            onChange={updateCard("prompt", index)}
                            value={card.prompt}
                            maxLength={125}
                        />
                    </div>
                    <div className={style.input_group}>
                        <h3>Answer:</h3>
                        <textarea
                            className={style.input}
                            onBlur={() => dispatch(updateCards(cardsState))}
                            onChange={updateCard("answer", index)}
                            value={card.answer}
                            maxLength={125}
                        />
                    </div>
                </div>
            );
        });
    };

    const renderConfirm = () => {
        return cardsState.map((card, index) => {
            return (
                <div className={style.input_section} key={index}>
                    <div className={style.input_group}>
                        <h3>Prompt:</h3>
                        <div
                            className={style.display}
                            style={{ fontSize: "1.25rem" }}>
                            {cardsState[index].prompt}
                        </div>
                    </div>
                    <div className={style.input_group}>
                        <h3>Answer:</h3>
                        <div className={style.display}>
                            {cardsState[index].answer}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className={style.page}>
            <h1>
                {pageStep === "create"
                    ? "Create Your Deck"
                    : "Confirm Your Entries"}
            </h1>
            {pageStep === "create" ? renderCreate() : renderConfirm()}
            {errors.length > 0 && (
                <p style={{ color: "red" }}>
                    All pairs must have a prompt and an answer. Pairs that are
                    missing one are highlighted in red.
                </p>
            )}
            <div>
                {pageStep === "confirm" && (
                    <Button
                        className={style.control_button}
                        onClick={() => changeStep("create")}>
                        Go Back
                    </Button>
                )}
                <Button
                    className={style.control_button}
                    type="primary"
                    onClick={submitCards}>
                    {pageStep === "create" ? "Continue" : "Confirm"}
                </Button>
            </div>
        </div>
    );
};

export default BAD;
