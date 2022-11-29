import { mainAPI } from '../api/api';

const SET_DATA = 'SET_DATA'
const SET_INFO = 'SET_INFO'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_CHARACTER = 'SET_CHARACTER'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_EPISODES = 'SET_EPISODES'

const initialState = {
    data: [],
    info: {},
    currentPage: 1,
    character: {},
    isFetching: false,
    episodes: []
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_DATA: 
            return {...state, data: action.data}
        case SET_INFO: 
            return {...state, info: action.info}
        case SET_CURRENT_PAGE: 
            return {...state, currentPage: action.currentPage}
        case SET_CHARACTER:
            return {...state, character: action.character}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_EPISODES:
            return {...state, episodes: action.episodes}
        default: 
            return state
    }
}

const setData = (data) => ({type: SET_DATA, data})
const setInfo = (info) => ({type: SET_INFO, info})
const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
const setCharacter =  (character) => ({type: SET_CHARACTER, character})
const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
const setEpisodes = (episodes) => ({type: SET_EPISODES, episodes})

export const requestData = (page) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await mainAPI.getData(page)
    if(response.status === 200){
        dispatch(setData(response.data.results))
        dispatch(setInfo(response.data.info))
        dispatch(toggleIsFetching(false))
    }else{
        console.log(response);
        dispatch(toggleIsFetching(false))
    }
}

export const requestCharacter = (id) => async (dispatch) => {
    let allEpisodes = []
    dispatch(toggleIsFetching(true))
    const response = await mainAPI.getCharacter(id)
    if(response.status === 200){
        dispatch(setCharacter(response.data))
       response.data.episode.forEach(el => {
            const id = el.split('/').pop()
            allEpisodes.push(id)
        });

        const responseEpisodes = await mainAPI.getEpisode(allEpisodes)
        if (responseEpisodes.status === 200) {
            dispatch(setEpisodes(responseEpisodes.data))
            dispatch(toggleIsFetching(false))
        } else {
            console.log(response);
            dispatch(toggleIsFetching(false))
        }
        dispatch(toggleIsFetching(false))
    }else{
        console.log(response);
        dispatch(toggleIsFetching(false))
    }
}

export const changePage = (page) => async (dispatch) => dispatch(setCurrentPage(page))