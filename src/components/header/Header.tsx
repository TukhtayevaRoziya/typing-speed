import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetTest } from "../../utility/resetTest";
import { setTime, setWordList, timerSet } from "../../redux/actions";
import { State } from "../../redux/reducer";

import "./Header.scss";
import "stylesheets/AnimatedTheme.scss";

export interface Options {
    time: number[];
}

interface AnimationProps {
    top: number;
    left: number;
    theme: string;
}

export const options: Options = {
    time: [15, 30, 45, 60, 120],
};

export default function Header() {
    const {
        preferences: { timeLimit },
        time: { timerId },
    } = useSelector((state: State) => state);
    const [animationProps, setAnimationProps] =
        useState<AnimationProps | null>();
    const dispatch = useDispatch();

    useEffect(() => {
        const type = "words";
        const time = parseInt(localStorage.getItem("time") || "60", 10);
        import(`wordlists/${type}.json`).then((words) =>
            dispatch(setWordList(words.default))
        );
        dispatch(timerSet(time));
        dispatch(setTime(time));
    }, [dispatch]);

    // Set Time
    useEffect(() => {
        if (timeLimit !== 0) {
            document.querySelector(".time")?.childNodes.forEach((el) => {
                if (el instanceof HTMLButtonElement)
                    el.classList.remove("selected");
            });
            document
                .querySelector(`button[value="${timeLimit}"]`)
                ?.classList.add("selected");
            dispatch(setTime(timeLimit));
            localStorage.setItem("time", `${timeLimit}`);
            resetTest();
        }
    }, [dispatch, timeLimit]);

    const handleOptions = ({ target, clientX, clientY }: React.MouseEvent) => {
        if (target instanceof HTMLButtonElement && target.dataset.option) {
            switch (target.dataset.option) {
                case "time":
                    dispatch(setTime(+target.value));
                    break;
            }
            target.blur();
        }
    };

    return (
        <header className={timerId ? "hidden" : undefined}>
            <div className="buttons">
                {Object.entries(options).map(([option, choices]) => (
                    <div key={option} className={option}>
                        {option}:
                        {choices.map((choice: string) => (
                            <button
                                className="mini"
                                key={choice}
                                data-option={option}
                                value={choice}
                                onClick={(e) => handleOptions(e)}>
                                {choice}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            {animationProps ? (
                <div
                    className={`animated-theme ${animationProps.theme}`}
                    style={{
                        top: animationProps.top,
                        left: animationProps.left,
                    }}
                    onAnimationEnd={() => setAnimationProps(null)}></div>
            ) : null}
        </header>
    );
}
