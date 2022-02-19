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
  USER_MEMBER_ACCOUNT_EXISTS,
  USER_NEWSLETTER_EXISTS_SUCCESS,
  SEARCH_KEYWORD,
  ORIGINAL_SEARCHED_ARRAY,
  CLEAR_ORIGINAL_SEARCHED_ARRAY,
  CATEGORYWISE_SEARCH_SUCCESS,
  CATEGORYWISE_SEARCH_FAIL,
  CATEGORYWISE_SEARCH_CLEAR,
  PRODUCT_NAME_LIST,
  ADD_SEARCHED_ITEM_PAGINATION_INFO,
  USER_EMAIL
} from '../actions/types'

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: localStorage.getItem('user'),
  currentItem: localStorage.getItem('currentItem'),
  recentlyViewed: [],
  itemSearchedResult: [],
  itemSearchedCategoryWiseResult: [],
  currentCompany: localStorage.getItem('currentCompany'),
  currentCompanyUser: localStorage.getItem('currentCompanyUser'),
  currentUserNewsLetter: false,
  currentUserCompanyExists: false,
  currentUserMemberAccountExists:false,
  accountCreated: false,
  signupErrors: null,
  searchKeyword: null,
  originalSearchArray: [],
  productNames: [],
  paginationData: null,
  userEmail:null,
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

export default function foo(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_EMAIL:
      return {
        ...state,
        userEmail: payload,
      }
    case ADD_SEARCHED_ITEM_PAGINATION_INFO:
      return {
        ...state,
        paginationData: payload,
      }

    case PRODUCT_NAME_LIST:
      let uniqueObjectsArray3 = []
      const uniqueItemsArray3 = []
      if (state.productNames !== null) {
        state.productNames.map((item) => {
          if (!uniqueItemsArray3.includes(item.id)) {
            uniqueItemsArray3.push(item.id)
            uniqueObjectsArray3.push(item)
          }
          return 0
        })
      }
      return {
        ...state,
        productNames: [...uniqueObjectsArray3, payload],
      }

    case CATEGORYWISE_SEARCH_CLEAR:
      return {
        ...state,
        itemSearchedCategoryWiseResult: [],
      }

    case CATEGORYWISE_SEARCH_SUCCESS:
      let uniqueObjectsArray2 = []
      const uniqueItemsArray2 = []
      if (state.itemSearchedCategoryWiseResult !== null) {
        state.itemSearchedCategoryWiseResult.map((item) => {
          if (!uniqueItemsArray2.includes(item.id)) {
            uniqueItemsArray2.push(item.id)
            uniqueObjectsArray2.push(item)
          }
          return 0
        })
      }
      return {
        ...state,
        itemSearchedCategoryWiseResult: [...uniqueObjectsArray2, payload],
      }
    case CATEGORYWISE_SEARCH_FAIL:
      return {
        ...state,
      }

    case SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: payload,
      }
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
    case USER_MEMBER_ACCOUNT_EXISTS:
      return {
        ...state,
        currentUserMemberAccountExists: payload,
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

    case CLEAR_ORIGINAL_SEARCHED_ARRAY:
      return {
        ...state,
        originalSearchArray: [],
      }

    case ITEM_SEARCH_CLEAR:
      return {
        ...state,
        itemSearchedResult: [],
      }

    case ORIGINAL_SEARCHED_ARRAY:
      let uniqueObjectsArray1 = []
      const uniqueItemsArray1 = []
      if (state.originalSearchArray !== null) {
        state.originalSearchArray.map((item) => {
          if (!uniqueItemsArray1.includes(item.id)) {
            uniqueItemsArray1.push(item.id)
            uniqueObjectsArray1.push(item)
          }
          return 0
        })
      }
      return {
        ...state,
        originalSearchArray: [...uniqueObjectsArray1, payload],
      }
    case ITEM_SEARCH_SUCCESS:
      let uniqueObjectsArray = []
      const uniqueItemsArray = []
      if (state.itemSearchedResult !== null) {
        state.itemSearchedResult.map((item) => {
          if (!uniqueItemsArray.includes(item.id)) {
            uniqueItemsArray.push(item.id)
            uniqueObjectsArray.push(item)
          }
          return 0
        })
      }
      return {
        ...state,
        itemSearchedResult: [...uniqueObjectsArray, payload],
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
      let uniqueObjects = []

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
      uniqueObjects = uniqueObjects.filter(onlyUnique)

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
