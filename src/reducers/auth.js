import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
  LOGOUT,
  ITEM_ADDED_TO_RECENTLY_VIEWED_SUCCESS,
  ITEM_ADDED_TO_RECENTLY_VIEWED_FAIL,
  CURRENT_ITEM_ADDED_FAIL,
  CURRENT_ITEM_ADDED_SUCCESS,
  ITEM_SEARCH_SUCCESS,
  ITEM_SEARCH_FAIL,
  ITEM_SEARCH_CLEAR,
  ADD_CURRENT_ITEM_COMPANY_FAIL,
  ADD_CURRENT_ITEM_COMPANY_SUCCESS,
  ADD_CURRENT_ITEM_USER_FAIL,
  ADD_CURRENT_ITEM_USER_SUCCESS,
  ADD_TO_FAVOURITES_FAIL,
  ADD_TO_FAVOURITES_SUCCESS,
  REMOVE_FORM_FAVOURITES_FAIL,
  REMOVE_FORM_FAVOURITES_SUCCESS,
  USER_COMPANY_EXISTS_SUCCESS,
  USER_NEWSLETTER_EXISTS_SUCCESS,
} from '../actions/types'

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: localStorage.getItem('user'),
  currentItem: localStorage.getItem('currentItem'),
  recentlyViewed: [],
  itemSearchedResult: [],
  currentCompany: localStorage.getItem('currentCompany'),
  currentCompanyUser: localStorage.getItem('currentCompanyUser'),
  currentUserNewsLetter: false,
  currentUserCompanyExists: false,
  accountCreated: false,
  signupErrors: null,
}

export default function foo(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_NEWSLETTER_EXISTS_SUCCESS:
      return {
        ...state,
        currentUserNewsLetter: payload,
      }
    case USER_COMPANY_EXISTS_SUCCESS:
      return {
        ...state,
        currentUserCompanyExists: payload,
      }
    case REMOVE_FORM_FAVOURITES_SUCCESS:
      return {
        ...state,
      }
    case REMOVE_FORM_FAVOURITES_FAIL:
      return {
        ...state,
      }
    case ADD_TO_FAVOURITES_SUCCESS:
      return {
        ...state,
      }
    case ADD_TO_FAVOURITES_FAIL:
      return {
        ...state,
      }

    case ADD_CURRENT_ITEM_USER_FAIL:
      return {
        ...state,
      }
    case ADD_CURRENT_ITEM_USER_SUCCESS:
      localStorage.setItem('currentCompanyUser', JSON.stringify(payload))
      return {
        ...state,
        currentCompanyUser: payload,
      }

    case ADD_CURRENT_ITEM_COMPANY_FAIL:
      return {
        ...state,
      }
    case ADD_CURRENT_ITEM_COMPANY_SUCCESS:
      localStorage.setItem('currentCompany', JSON.stringify(payload))
      return {
        ...state,
        currentCompany: payload,
      }

    case ITEM_SEARCH_CLEAR:
      return {
        ...state,
        itemSearchedResult: [],
      }
    case ITEM_SEARCH_SUCCESS:
      return {
        ...state,
        itemSearchedResult: [...state.itemSearchedResult, payload],
      }
    case ITEM_SEARCH_FAIL:
      return {
        ...state,
      }

    case ITEM_ADDED_TO_RECENTLY_VIEWED_FAIL:
      return {
        ...state,
      }
    case ITEM_ADDED_TO_RECENTLY_VIEWED_SUCCESS:
      const uniqueObjects = []

      const uniqueItems = []
      if (state.recentlyViewed !== null) {
        state.recentlyViewed.map((item) => {
          if (!uniqueItems.includes(item.id)) {
            uniqueItems.push(item.id)
            uniqueObjects.push(item)
          }
          return 0
        })
      }

      return {
        ...state,
        recentlyViewed: [...uniqueObjects, payload],
      }
    case CURRENT_ITEM_ADDED_FAIL:
      return {
        ...state,
        currentItem: payload,
      }
    case CURRENT_ITEM_ADDED_SUCCESS:
      localStorage.setItem('currentItem', JSON.stringify(payload))
      return {
        ...state,
        currentItem: payload,
      }
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case LOGIN_SUCCESS:
    case GOOGLE_AUTH_SUCCESS:
    case FACEBOOK_AUTH_SUCCESS:
      localStorage.setItem('access', payload.access)
      localStorage.setItem('refresh', payload.refresh)
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        accountCreated: true,
      }
    case USER_LOADED_SUCCESS:
      localStorage.setItem('user', JSON.stringify(payload))

      return {
        ...state,
        user: payload,
      }
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      }
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      }
    case GOOGLE_AUTH_FAIL:
    case FACEBOOK_AUTH_FAIL:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        signupErrors: payload,
      }
    case LOGOUT:
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      }
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state,
      }
    default:
      return state
  }
}
