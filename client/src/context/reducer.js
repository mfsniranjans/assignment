import { ADD_IMAGES, PURGE_IMAGES, SET_COORDINATES, SET_IMAGES_LOADING, SET_IMAGES_PAGE, SET_LOCATIONS_LOADING, SET_MAP, SET_MORE_IMAGES_LOADING, SET_SEARCH_INPUT, SET_VIEW, UPDATE_FAVORITE } from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_COORDINATES:
      return {
        ...state,
        coordinates: action.payload
      }
    case SET_MAP:
      return {
        ...state,
        map: action.payload
      }
    case ADD_IMAGES:
      return {
        ...state,
        images: [...state?.images, ...action?.payload]
      }
    case PURGE_IMAGES:
      return {
        ...state,
        images: []
      }
    case SET_IMAGES_LOADING:
      return {
        ...state,
        isImagesLoading: action?.payload
      }
    case SET_LOCATIONS_LOADING:
      return {
        ...state,
        isLocationsLoading: action?.payload
      }
    case SET_MORE_IMAGES_LOADING:
      return {
        ...state,
        isMoreImagesLoading: action?.payload
      }
    case SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action?.payload
      }
    case SET_IMAGES_PAGE:
      return {
        ...state,
        imagesPage: action?.payload
      }
    case UPDATE_FAVORITE:
      return {
        ...state,
        favorites: action?.payload
      }
    case SET_VIEW:
      return {
        ...state,
        view: action?.payload
      }
    default: return state
  }
}

export default reducer
