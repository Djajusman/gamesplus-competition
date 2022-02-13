import axios from 'axios'
import CONFIG from '../config'

const fullURL = (path) => {
    return `${CONFIG.API_URL}/${path}`
}


export const handleNetworkError = (error) => {
    if (error.message === 'Network request failed') {
        alert(
            'Kesalahan Jaringan',
            'Silakan periksa koneksi Anda dan coba kembali.',
            'iconNoInet'
        );
    }
    throw error;
}

const post = (api) => (data, token) => {
    return axios.post(
        fullURL(api),
        data,
        {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'apikey': process.env.REACT_APP_API_KEY
            }
        }
    )
}

const get = (api) => (token) => {

    return axios(
        `${fullURL(api)}`,
        {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'apikey': process.env.REACT_APP_API_KEY
            }
        },
        { handleNetworkError }
    ).catch((err) => {
        console.log(err)
    })
}

const getWithSlug = (api) => (slug, token) => {
        return axios(
        `${fullURL(api)}${slug}`,
        {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'apikey': process.env.REACT_APP_API_KEY
            }
        },
        { handleNetworkError }
    ).catch((err) => {

    })
}

export const getLeaderBoards = getWithSlug('competition/leaderboards/')
export const getGameInfo = getWithSlug('competition/game-info/')
export const getDetailCompetition = getWithSlug('competition/details-competition/')
export const getServiceInfo = get('service-infos')
export const getUserPaymentInfo = getWithSlug('games/user-payment-info/')
export const createTransaction = post('payment/create-transaction')
export const payTransaction = post('payment/pay-transaction')
export const getProfileInfo = get('games/user-profile')
export const getUserScore = getWithSlug('games/user')

const API = {
    getLeaderBoards,
    getGameInfo,
    getDetailCompetition,
    getServiceInfo,
    getUserPaymentInfo, 
    createTransaction,
    payTransaction,
    getProfileInfo,
    getUserScore
}

export default API;