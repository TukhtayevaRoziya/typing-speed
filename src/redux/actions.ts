import { RefObject } from "react";
import { APPEND_TYPED_HISTORY, PREV_WORD, SET_CARET_REF, SET_CHAR, SET_REF, SET_TIME, SET_TYPE, SET_WORD, SET_WORDLIST, TIMER_DECREMENT, TIMER_SET, TIMERID_SET } from "./types";

// Time Actions
export const timerDecrement = () => ({ type: TIMER_DECREMENT });
export const timerSet = (payload: number) => ({ type: TIMER_SET, payload });
export const setTimerId = (payload: NodeJS.Timer | null) => ({
    type: TIMERID_SET,
    payload,
});

// Word Actions
export const setWord = (payload: string) => ({ type: SET_WORD, payload });
export const setChar = (payload: string) => ({ type: SET_CHAR, payload });
export const setTypedWord = (payload: string) => ({ type: SET_CHAR, payload });
export const appendTypedHistory = () => ({
    type: APPEND_TYPED_HISTORY,
});
export const backtrackWord = (payload: boolean) => ({
    type: PREV_WORD,
    payload,
});
export const setWordList = (payload: string[]) => ({
    type: SET_WORDLIST,
    payload,
});
export const setRef = (payload: RefObject<HTMLDivElement>) => ({
    type: SET_REF,
    payload,
});
export const setCaretRef = (payload: RefObject<HTMLSpanElement>) => ({
    type: SET_CARET_REF,
    payload,
});

// Prefrences Actions
export const setTime = (payload: number) => ({ type: SET_TIME, payload });
export const setType = (payload: string) => ({
    type: SET_TYPE,
    payload,
});
