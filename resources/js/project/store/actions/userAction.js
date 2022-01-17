import { GET_AUTH, LOGOUT_SUCCESS } from '../constants'
import { getAuthData } from '../../api'

export const logoutAction = () => ({
    type: LOGOUT_SUCCESS,
})

export const getAuthAction = () => {
    return function (dispatch) {
        return getAuthData().then((response) => {
            dispatch({
                type: GET_AUTH,
                auth: response.data,
            })
        })
    }
}
