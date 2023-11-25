import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCards, updateCards } from "../../features/cards/cardsSlice";
import { cloneDeep, includes } from "lodash";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import "./cards.css";
import style from "./paraphrase.module.css";
import { Button, Card } from "antd";
import { nextStep } from "../../features/steps/stepsSlice";
import ReactCardFlip from "react-card-flip";
import { getCPEvals, updateCP } from "../../features/stats/statsSlice";

const CP = () => {
    const cards = useSelector(selectCards);
    const evals = useSelector(getCPEvals);
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

    const fetchResults = async () => {
        const data = {
            cards: cardsState
        };
        await fetch(
            "https://flash-gen.azurewebsites.net/api/make-comparison?key=correctParaphrase",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        )
            .then((resp) => {
                if (!resp.ok) {
                    throw Error(resp.status);
                }
                return resp.json();
            })
            .then((data) => {
                dispatch(updateCP(data.evaluations));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const submitCards = () => {
        const errorNo = checkForEmptyFields();

        if (errorNo === 0 && pageStep === "create") {
            changeStep("confirm");
        } else if (pageStep === "confirm") {
            fetchResults();
            changeStep("modelResults");
        } else if (pageStep === "modelResults") {
            dispatch(nextStep());
        }
    };

    const renderCreateCard = () => {
        return (
            <>
                <div className={style.card_control}>
                    <Button onClick={prevCard}>
                        <LeftOutlined />
                    </Button>
                    <ReactCardFlip
                        isFlipped={cardFlipped}
                        infinite={true}
                        flipDirection="vertical">
                        <Card
                            title={`Card ${currentCard + 1} Prompt`}
                            onClick={() => setCardFlipped(!cardFlipped)}
                            extra={"Click to see the answer"}
                            style={{
                                border: errors.includes(currentCard)
                                    ? "1px solid red"
                                    : ""
                            }}>
                            <div className={style.card_text}>
                                {cardsState[currentCard].prompt}
                            </div>
                        </Card>
                        <Card
                            title={`Card ${currentCard + 1} Answer`}
                            onClick={() => setCardFlipped(!cardFlipped)}
                            extra={"Click to see the prompt"}
                            style={{
                                border: errors.includes(currentCard)
                                    ? "1px solid red"
                                    : ""
                            }}>
                            <div className={style.card_text}>
                                {cardsState[currentCard].answer}
                            </div>
                        </Card>
                    </ReactCardFlip>
                    <Button onClick={nextCard}>
                        <RightOutlined />
                    </Button>
                </div>

                <div className={style.input_group}>
                    <h3>Correct Paraphrase:</h3>
                    <textarea
                        className={style.input}
                        onBlur={() => dispatch(updateCards(cardsState))}
                        onChange={updateCard("correctParaphrase", currentCard)}
                        value={cardsState[currentCard].correctParaphrase}
                        maxLength={125}
                    />
                </div>
            </>
        );
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
                        <h2>Card {index + 1} Info</h2>
                        <h3>Prompt:</h3>
                        <div className={style.display}>{card.prompt}</div>
                        <h3>Answer:</h3>
                        <div className={style.display}>{card.answer}</div>
                    </div>
                    <div className={style.input_group}>
                        <h3>Correct Paraphrase:</h3>
                        <div className={style.display}>
                            {card.correctParaphrase}
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderModelResults = () => {
        return cardsState.map((card, index) => {
            return (
                <div className={style.result_card}>
                    <h3>Prompt:</h3>
                    <div className={style.display}>{card.prompt}</div>
                    <h3>Answer:</h3>
                    <div className={style.display}>{card.answer}</div>
                    <h3>Paraphrase:</h3>
                    <div className={style.display}>
                        {card.correctParaphrase}
                    </div>
                    <div className={style.result_container}>
                        <div className={style.result}>
                            <h3>Expected</h3>
                            True
                        </div>
                        <div className={style.result}>
                            <h3>Result</h3>
                            <div
                                style={{
                                    color: evals[index] ? "green" : "red"
                                }}>
                                {evals[index] ? "True" : "False"}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderTitle = () => {
        switch (pageStep) {
            case "create":
                return "Add Correct Paraphrases";
            case "confirm":
                return "Confirm Your Entries";
            default:
                return "See Our Model's Results";
        }
    };

    const renderPageContent = () => {
        switch (pageStep) {
            case "create":
                return renderCreateCard();
            case "confirm":
                return renderConfirm();
            default:
                return renderModelResults();
        }
    };

    return (
        <div className={style.page}>
            <h1>{renderTitle()}</h1>
            {renderPageContent()}
            {errors.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}>
                    All pairs must have a correct paraphrase added. Pairs that
                    are missing one are highlighted in red. <br /> Errors on
                    cards: [
                    {errors.map((number, index) => {
                        return (
                            <>
                                {index === errors.length - 1
                                    ? number + 1
                                    : number + 1 + ", "}
                            </>
                        );
                    })}
                    ]
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
                    {pageStep === "confirm" ? "Confirm" : "Continue"}
                </Button>
            </div>
        </div>
    );
};

export default CP;
