import { setTimerId, timerDecrement } from "redux/actions";
import { store } from "redux/store";

export const startTimer = () => {
    const { dispatch } = store;
    const timerId = setInterval(() => {
        dispatch(timerDecrement());
    }, 1000);
    dispatch(setTimerId(timerId));
};
