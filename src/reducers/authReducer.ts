import {
  GET_LIST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE
} from 'actions/Auth/actionTypes'

type State = {
  getListLoading: Boolean,
  posts: Array<any>,
};

type Action = {
  type: string,
  payload: {},
};

const initialState = {
  getListLoading: false,
  posts: []
}

const getList = (state: State, action: Action) => ({
  ...state,
  getListLoading: true
})

const getListSuccess = (state: State, action: Action) => {
  return ({
    ...state,
    getListLoading: false,
    posts: action.payload
  })
}

const getListFailed = (state: State, action: Action) => ({
  ...state,
  getListLoading: false,
  posts: []
})

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_LIST: return getList(state, action)
    case GET_LIST_SUCCESS: return getListSuccess(state, action)
    case GET_LIST_FAILURE: return getListFailed(state, action)
    default: return state
  }
}

export default authReducer
