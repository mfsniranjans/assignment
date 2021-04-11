import React, { useReducer } from 'react'
import { REACT_APP_DEFAULT_LAT, REACT_APP_DEFAULT_LON } from '../config/constants'
import Context from './'
import { ADD_IMAGES, PURGE_IMAGES, SET_COORDINATES, SET_IMAGES_PAGE, SET_LOCATIONS_LOADING, SET_MAP, SET_SEARCH_INPUT, SET_VIEW, UPDATE_FAVORITE } from './actions'
import reducer from './reducer'

export const State = (props) => {
  const initialState = {
    images: [],
    coordinates: [REACT_APP_DEFAULT_LAT, REACT_APP_DEFAULT_LON],
    map: null,
    isImagesLoading: false,
    isMoreImagesLoading: false,
    isLocationsLoading: false,
    searchInput: '',
    imagesPage: 1,
    favorites: [],
    view: 'gallery'
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const setImagesPages = (page) => {
    return dispatch({
      type: SET_IMAGES_PAGE,
      payload: page
    })
  }

  const setView = (view) => {
    return dispatch({
      type: SET_VIEW,
      payload: view
    })
  }

  const updateFavorites = (images) => {
    return dispatch({
      type: UPDATE_FAVORITE,
      payload: images
    })
  }

  const fetchFavorites = (images) => {
    return dispatch({
      type: UPDATE_FAVORITE,
      payload: images
    })
  }

  const setCoordinates = (coordinates) => {
    return dispatch({
      type: SET_COORDINATES,
      payload: coordinates
    })
  }

  const setIsImagesLoading = (payload) => {
    return dispatch({
      type: SET_COORDINATES,
      payload
    })
  }

  const setIsMoreImagesLoading = (payload) => {
    return dispatch({
      type: SET_COORDINATES,
      payload
    })
  }

  const setSearchInput = (payload) => {
    return dispatch({
      type: SET_SEARCH_INPUT,
      payload
    })
  }

  const setIsLocationsLoading = (payload) => {
    return dispatch({
      type: SET_LOCATIONS_LOADING,
      payload
    })
  }

  const setMap = (map) => {
    return dispatch({
      type: SET_MAP,
      payload: map
    })
  }

  const addImages = (images) => {
    return dispatch({
      type: ADD_IMAGES,
      payload: images
    })
  }

  const purgeImages = () => {
    dispatch({
      type: SET_IMAGES_PAGE,
      payload: 1
    })
    return dispatch({
      type: PURGE_IMAGES,
    })
  }

  return (
    <Context.Provider
      value={{
        images: state?.images,
        coordinates: state?.coordinates,
        map: state?.map,
        setCoordinates,
        setMap,
        addImages,
        purgeImages,
        setIsImagesLoading,
        setIsMoreImagesLoading,
        setIsLocationsLoading,
        setSearchInput,
        searchInput: state?.searchInput,
        setImagesPages,
        imagesPage: state?.imagesPage,
        updateFavorites,
        favorites: state?.favorites,
        fetchFavorites,
        setView,
        view: state?.view
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
