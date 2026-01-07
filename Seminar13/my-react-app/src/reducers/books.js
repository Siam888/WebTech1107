import { SET_BOOKS, ADD_BOOKS } from "../actions/books";

const initialState = {
    data: []
}

export default function bookReducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case ADD_BOOKS:
            return { ...state, data: [...state.data, payload] }
        case SET_BOOKS:
            return { ...state, data: [...payload] }
        default:
            return initialState;
    }
}