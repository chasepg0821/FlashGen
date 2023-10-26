"use client";

import React, { useState, useEffect } from "react";
import styles from "./flashcard.module.css";

interface FCProps {
    prompt: string;
    answer: string;
    flipped: boolean;
    flipOnClick?: boolean;
}

const FlashCard = ({ prompt, answer, flipped, flipOnClick }: FCProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        if (flipOnClick == true || flipOnClick == undefined) {
            setIsFlipped(!isFlipped);
        }
    };

    useEffect(() => {
        setIsFlipped(flipped);
    }, [flipped]);

    return (
        <div className={styles.cardContainer} onClick={flipCard}>
            <div
                className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
                <div className={styles.front}>{prompt}</div>
                <div className={styles.back}>{answer}</div>
            </div>
        </div>
    );
};

export default FlashCard;
