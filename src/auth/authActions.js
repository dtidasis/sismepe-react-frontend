import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'
import jwtDecode from 'jwt-decode'

export function login(values) {
    return submit(values, `${consts.OAPI_URL}/login`)
}
export function signup(values) {
    return submit(values, `${consts.OAPI_URL}/signup`)
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values).then(resp => {
            let token = resp.headers.authorization;
            token = token.replace('Bearer ','');
            let decoded = jwtDecode(token)
            decoded = {...decoded, token: token}
            dispatch([
                { type: 'USER_FETCHED', payload: decoded }
            ])
        })
            .catch(e => {
                const status = e.response.status;
                if(status === 403) {
                    toastr.error('Erro', 'Não autorizado!')
                } else {
                    toastr.error('Erro', 'Falha na autenticação!')
                }
            })
    }
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token) {
    return dispatch => {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.post(`${consts.OAPI_URL}/auth/validateToken`, null, config)
                .then(resp => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data })
                })
                .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}