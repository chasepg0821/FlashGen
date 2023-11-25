import React, { useState } from "react";
import style from "./welcome.module.css";
import { Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { nextStep, setStatus, setStep } from "../../features/steps/stepsSlice";

const Welcome = () => {
    const [understand, setUnderstand] = useState(false);
    const [is18, setIs18] = useState(false);

    const dispatch = useDispatch();

    const checkEligibility = () => {
        if (is18) {
            dispatch(nextStep());
        } else {
            dispatch(setStep(4));
            dispatch(setStatus("error"));
        }
    };

    return (
        <>
            <h1>Welcome to the FlashGen Alpha Study!</h1>
            <p className={style.welcome_message}>
                Thank you for taking the time to take part in my proof of
                concept for the use of AI to provide more natural answering for
                digital flashcard sets. There will be no personal information
                collected during this study. The only data collected will be the
                your inputed data and inferred statistics from how our model
                operates on your inputted data. In this study we will ask you to
                do the following:
            </p>
            <p className={style.welcome_message}>
                <b>Step 1:</b> You will create 5 prompt-answer pairs on your
                prefered area of expertise. This should mimic the creatation of
                a set of flashcards!
            </p>
            <p className={style.welcome_message}>
                <b>Step 2:</b> Rewrite the answer for each prompt in an accurate
                paraphrase. In other words, put the answer in other words. You
                may also take the time to test out the interactive flashcards.
            </p>
            <p className={style.welcome_message}>
                <b>Step 3:</b> Rewrite the answer for each prompt in an
                incorrect paraphrase. This simply means give us a wrong answer
                to your prompt.
            </p>
            <p className={style.welcome_message}>
                Throughout the study you will get to see the results of our
                trained model. You will not be required to provide any
                additional input on the models performance, since we have
                segmented the study in steps that should provide positive and
                negative responses from the model. The total length of the study
                should take <b>no more than 30 minutes</b>.
            </p>
            <p>
                In order to continue, please acknowledge the following
                statements <b>ONLY</b> when applicable:
            </p>
            <Checkbox
                checked={understand}
                onChange={() => setUnderstand(!understand)}>
                I understand what is required of me during this study as defined
                above.
            </Checkbox>
            <Checkbox checked={is18} onChange={() => setIs18(!is18)}>
                I certify that I am above 18 years old.
            </Checkbox>
            <Button
                size="large"
                type="primary"
                disabled={!understand}
                onClick={checkEligibility}
                style={{ marginTop: 15 }}>
                Begin
            </Button>
        </>
    );
};

export default Welcome;
