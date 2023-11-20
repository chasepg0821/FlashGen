import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCards, updateCards } from "../../features/cards/cardsSlice";
import { cloneDeep, includes } from "lodash";

import style from "./cp.module.css";
import { Button, Card } from "antd";
import { nextStep } from "../../features/steps/stepsSlice";
import ReactCardFlip from "react-card-flip";

const CP = () => {
    const cards = useSelector(selectCards);
    const [cardsState, setCardsState] = useState(cards);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setCardsState(cards);
    }, [cards]);

    //Flash Card Controls
    const [currentCard, setCurrentCard] = useState(0);
    const [cardFlipped, setCardFlipped] = useState(false);

    const nextCard = () => {
        setCurrentCard((currentCard + 1) % cardsState.length);
        setCardFlipped(false);
    };

    const prevCard = () => {
        setCurrentCard(
            currentCard === 0 ? cardsState.length - 1 : currentCard - 1
        );
        setCardFlipped(false);
    };

    const updateCard = (key, index) => (e) => {
        const state = cloneDeep(cardsState);
        state[index] = {
            ...state[index],
            [key]: e.target.value
        };
        setCardsState(state);
    };

    //Page step controls (create or confirm)
    const [pageStep, setPageStep] = useState("create");

    const changeStep = (step) => {
        setPageStep(step);
        window.scrollTo(0, 0);
    };

    //Handle card submission to dataset
    const checkForEmptyFields = () => {
        const errors = [];
        cardsState.forEach((card, index) => {
            if (card.correctParaphrase === "") {
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

    const renderCreateCard = () => {
        return (
            <ReactCardFlip
                isFlipped={cardFlipped}
                infinite={true}
                flipDirection="vertical">
                <Card
                    title={`Card ${currentCard} Prompt`}
                    onClick={() => setCardFlipped(!cardFlipped)}>
                    <p>{cardsState[currentCard].prompt}</p>
                </Card>
                <Card
                    title={`Card ${currentCard} Answer`}
                    onClick={() => setCardFlipped(!cardFlipped)}>
                    <p>{cardsState[currentCard].answer}</p>
                </Card>
            </ReactCardFlip>
        );
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
                    <div className={style.input_group + " " + style.info}>
                        <h2>Card Info</h2>
                        <h3>Prompt:</h3>
                        <div className={style.display}>
                            {cardsState[index].prompt}
                        </div>
                        <h3>Answer:</h3>
                        <div className={style.display}>
                            {cardsState[index].answer}
                        </div>
                    </div>
                    <div className={style.input_group}>
                        <h3>Correct Paraphrase:</h3>
                        <textarea
                            className={style.input}
                            onBlur={() => dispatch(updateCards(cardsState))}
                            onChange={updateCard("correctParaphrase", index)}
                            value={card.correctParaphrase}
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
                <div
                    className={style.input_section}
                    key={index}
                    style={{
                        border: `1px solid ${
                            includes(errors, index) ? "red" : "#00000020"
                        }`
                    }}>
                    <div className={style.input_group + " " + style.info}>
                        <h2>Card Info</h2>
                        <h3>Prompt:</h3>
                        <div className={style.display}>
                            {cardsState[index].prompt}
                        </div>
                        <h3>Answer:</h3>
                        <div className={style.display}>
                            {cardsState[index].answer}
                        </div>
                    </div>
                    <div className={style.input_group}>
                        <h3>Correct Paraphrase:</h3>
                        <div className={style.display}>
                            {cardsState[index].correctParaphrase}
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
                    ? "Add Correct Paraphrases"
                    : "Confirm Your Entries"}
            </h1>
            {pageStep === "create" ? renderCreateCard() : renderConfirm()}
            {errors.length > 0 && (
                <p style={{ color: "red" }}>
                    All pairs must have a correct paraphrase added. Pairs that
                    are missing one are highlighted in red.
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

export default CP;
