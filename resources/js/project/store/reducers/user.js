import { GET_AUTH, LOGOUT_SUCCESS } from '../constants'

const initialState = { auth: null }

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_AUTH:
            state = { auth: action.auth }
            return state

        case LOGOUT_SUCCESS:
            return initialState

        default:
            return state
    }
}
