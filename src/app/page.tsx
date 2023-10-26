import FlashCard from "@/components/FlashCard/FlashCard";
import styles from "./page.module.css";

export default function Home() {
    return (
        <>
            <FlashCard
                prompt="hi"
                answer="bye"
                flipped={false}
                flipOnClick={true}
            />
            <div className={styles.buttonContainer}>
                <button className={styles.controlButton}>{"< Prev"}</button>
                <button className={styles.controlButton}>{"Next >"}</button>
            </div>
        </>
    );
}
