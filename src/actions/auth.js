import axios from 'axios'
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
  CURRENT_ITEM_ADDED_FAIL,
  CURRENT_ITEM_ADDED_SUCCESS,
  ITEM_ADDED_TO_RECENTLY_VIEWED_SUCCESS,
  ITEM_ADDED_TO_RECENTLY_VIEWED_FAIL,
  ITEM_SEARCH_SUCCESS,
  ITEM_SEARCH_FAIL,
  ITEM_SEARCH_CLEAR,
  ADD_CURRENT_ITEM_USER_FAIL,
  ADD_CURRENT_ITEM_USER_SUCCESS,
  ADD_CURRENT_ITEM_COMPANY_FAIL,
  ADD_CURRENT_ITEM_COMPANY_SUCCESS,
  ADD_TO_FAVOURITES_FAIL,
  ADD_TO_FAVOURITES_SUCCESS,
  REMOVE_FORM_FAVOURITES_FAIL,
  REMOVE_FORM_FAVOURITES_SUCCESS,
} from './types'

const api = process.env.REACT_APP_API_URL

export const removeFromFavourites = (favItem) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    try {
      await axios.delete(`${api}/api/favourites/${favItem}/`, config)

      console.log('REMOVE_FORM_FAVOURITES_SUCCESS')
      alert('Product removed from your favourites')
      dispatch({
        type: REMOVE_FORM_FAVOURITES_SUCCESS,
      })
      dispatch(load_user())
    } catch (err) {
      dispatch({
        type: REMOVE_FORM_FAVOURITES_FAIL,
      })
    }
  } else {
    alert('Please login to add to favourites!')
    dispatch({
      type: REMOVE_FORM_FAVOURITES_FAIL,
    })
  }
}

export const addToFavourites = (product, user) => async (dispatch) => {
  console.log('ADD_TO_FAVOURITES_SUCCESS', product, user)
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    const body = {
      product: product,
      user: user,
    }

    try {
      await axios.post(`${api}/api/favourites/`, body, config)

      console.log('ADD_TO_FAVOURITES_SUCCESS')
      alert('Product added to your favourites')
      dispatch({
        type: ADD_TO_FAVOURITES_SUCCESS,
      })
      dispatch(load_user())
    } catch (err) {
      dispatch({
        type: ADD_TO_FAVOURITES_FAIL,
      })
    }
  } else {
    alert('Please login to add to favourites!')
    dispatch({
      type: ADD_TO_FAVOURITES_FAIL,
    })
  }
}

export const itemSearchedClear = () => async (dispatch) => {
  dispatch({
    type: ITEM_SEARCH_CLEAR,
    payload: [],
  })
}

export const itemSearched = (current_item) => async (dispatch) => {
  console.log('current_item', current_item)

  if (current_item !== null) {
    dispatch({
      type: ITEM_SEARCH_SUCCESS,
      payload: current_item,
    })
  } else {
    dispatch({
      type: ITEM_SEARCH_FAIL,
    })
  }
}

export const itemAddedToRecentlyViewed = (current_item) => async (dispatch) => {
  if (current_item !== null) {
    dispatch({
      type: ITEM_ADDED_TO_RECENTLY_VIEWED_SUCCESS,
      payload: current_item,
    })
  } else {
    dispatch({
      type: ITEM_ADDED_TO_RECENTLY_VIEWED_FAIL,
    })
  }
}

export const currentItemCompanyUser = (userId) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
    try {
      const res = await axios.get(`${api}/api/account/${userId}/`, config)

      console.log('ADD_CURRENT_ITEM_USadasdER_SUCCESS', res.data)
      dispatch({
        type: ADD_CURRENT_ITEM_USER_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: ADD_CURRENT_ITEM_USER_FAIL,
      })
    }
  } else {
    dispatch({
      type: ADD_CURRENT_ITEM_USER_FAIL,
    })
  }
}

export const currentItemCompany = (companyId) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
    try {
      const res = await axios.get(`${api}/api/company/${companyId}/`, config)
      dispatch({
        type: ADD_CURRENT_ITEM_COMPANY_SUCCESS,
        payload: res.data,
      })
      dispatch(currentItemCompanyUser(res.data.user))
    } catch (err) {
      dispatch({
        type: ADD_CURRENT_ITEM_COMPANY_FAIL,
      })
    }
  } else {
    dispatch({
      type: ADD_CURRENT_ITEM_COMPANY_FAIL,
    })
  }
}

export const current_item_added = (current_item, path) => async (dispatch) => {
  if (current_item !== null) {
    if (path === '/favourites') {
      dispatch({
        type: CURRENT_ITEM_ADDED_SUCCESS,
        payload: current_item.product,
      })
    } else {
      dispatch({
        type: CURRENT_ITEM_ADDED_SUCCESS,
        payload: current_item,
      })
    }
    if (path === '/favourites') {
      dispatch(currentItemCompany(current_item.product.company))
    } else {
      dispatch(currentItemCompany(current_item.company))
    }
  } else {
    dispatch({
      type: CURRENT_ITEM_ADDED_FAIL,
    })
  }
}

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    try {
      const user = await axios.get(`${api}/auth/users/me/`, config)
      const res = await axios.get(`${api}/auth/users/${user.data.id}/`, config)

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      })
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    })
  }
}

export const googleAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const details = {
      state: state,
      code: code,
    }

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(details[key])
      )
      .join('&')

    try {
      const res = await axios.post(
        `${api}/auth/o/google-oauth2/?${formBody}`,
        config
      )

      dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        payload: res.data,
      })

      dispatch(load_user())
    } catch (err) {
      dispatch({
        type: GOOGLE_AUTH_FAIL,
      })
    }
  }
}

export const facebookAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const details = {
      state: state,
      code: code,
    }

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(details[key])
      )
      .join('&')

    try {
      const res = await axios.post(
        `${api}/auth/o/facebook/?${formBody}`,
        config
      )

      dispatch({
        type: FACEBOOK_AUTH_SUCCESS,
        payload: res.data,
      })

      dispatch(load_user())
    } catch (err) {
      dispatch({
        type: FACEBOOK_AUTH_FAIL,
      })
    }
  }
}

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const body = JSON.stringify({ token: localStorage.getItem('access') })

    try {
      const res = await axios.post(`${api}/auth/jwt/verify/`, body, config)

      if (res.data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        })
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        })
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      })
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post(`${api}/auth/jwt/create/`, body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(load_user())
  } catch (err) {
    alert('Incorrect Credentials!')
    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

export const signup =
  (first_name, last_name, phone, email, password, re_password) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({
      first_name,
      last_name,
      phone,
      email,
      password,
      re_password,
    })
    console.log('my signup data', body)

    try {
      const res = await axios.post(`${api}/auth/users/`, body, config)

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      alert(err)
      dispatch({
        type: SIGNUP_FAIL,
      })
    }
  }

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ uid, token })

  try {
    await axios.post(`${api}/auth/users/activation/`, body, config)

    dispatch({
      type: ACTIVATION_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    })
  }
}

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email })

  try {
    await axios.post(`${api}/auth/users/reset_password/`, body, config)

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    })
  }
}

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password })

    try {
      await axios.post(
        `${api}/auth/users/reset_password_confirm/`,
        body,
        config
      )

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      })
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      })
    }
  }

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  })
}
