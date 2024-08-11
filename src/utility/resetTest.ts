import { setTimerId, setWordList, timerSet } from "redux/actions";
import { store } from "redux/store";

export const resetTest = async () => {
    const { dispatch, getState } = store;
    const {
        time: { timerId },
        preferences: { timeLimit },
    } = getState();
    document
        .querySelectorAll(".wrong, .right")
        .forEach((el) => el.classList.remove("wrong", "right"));
    if (timerId) {
        clearInterval(timerId);
        dispatch(setTimerId(null));
        dispatch(setTimerId(null));
    }
    import(`wordlists/words.json`).then((words) =>
        dispatch(setWordList(words.default))
    
    );
    debugger
    dispatch(timerSet(timeLimit));
};
