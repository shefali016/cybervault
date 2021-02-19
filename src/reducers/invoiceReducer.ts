import {
  NEW_INVOICE_REQUEST,
  NEW_INVOICE_SUCCESS,
  NEW_INVOICE_ERROR,
  GET_INVOICE_REQUEST,
  GET_INVOICE_ERROR,
  GET_INVOICE_SUCCESS,
  GET_ALL_INVOICE_REQUEST,
  GET_ALL_INVOICE_ERROR,
  GET_ALL_INVOICE_SUCCESS,
  SEND_REVISION_SUCCESS,
  SEND_REVISION_REQUEST,
  SEND_REVISION_ERROR,
  GET_ALL_INVOICE_CONVERSATION_REQUEST,
  GET_ALL_INVOICE_CONVERSATION_ERROR,
  GET_ALL_INVOICE_CONVERSATION_SUCCESS
} from 'actions/actionTypes'
import { act } from 'react-dom/test-utils'
import { createTransform } from 'redux-persist'
import { getProductData } from 'utils'
import * as Types from '../utils/Interface'

export type State = {
  loading: Boolean
  error: Boolean
  success: Boolean
  newinvoiceData: any
  invoiceData:any
  allInvoicesData: any
  getAllInvoiceLoading: Boolean
  getAllInvoiceSuccess: Boolean
  getAllInvoiceError: Boolean
  getInvoiceLoading: Boolean
  getInvoiceSuccess: Boolean
  getInvoiceError: Boolean
  invoiceConversationData:any
}

export type Action = {
  type: string
  payload: {}
}

const initialState = {
  loading: false,
  success: false,
  error: false,
  newinvoiceData: {},
  invoiceData:{},
  allInvoicesData: {},
  getAllInvoiceLoading: false,
  getAllInvoiceSuccess: false,
  getAllInvoiceError: false,
  getInvoiceLoading: false,
  getInvoiceSuccess: false,
  getInvoiceError: false,
  revisionSuccess:false,
  revisionLoading:false,
  revisionError:false,
  invoiceConversationLoading:false,
  invoiceConversationSuccess:false,
  invoiceConversationError:false,
  invoiceConversationData:{}

}

const generateNewInvoiceRequest = (state: State, action: Action) => ({
  ...state,
  loading: true,
  success: false,
  error: false,
  newinvoiceData: {}
})
const generateNewInvoiceError = (state: State, action: Action) => ({
  ...state,
  loading: false,
  success: false,
  error: true,
  newinvoiceData: {}
})
const generateNewInvoiceSuccess = (state: State, action: Action) => ({
  ...state,
  loading: false,
  success: true,
  error: false,
  newinvoiceData: action.payload
})

const getAllInvoiceRequest = (state: State, action: Action) => ({
  ...state,
  getAllInvoiceLoading: true,
  getAllInvoiceSuccess: false,
  getALlInvoiceError: false,
})
const getAllInvoiceError = (state: State, action: Action) => ({
  ...state,
  getAllInvoiceLoading: false,
  getALlInvoiceSuccess: false,
  getAllInvoiceError: true,
  allInvoicesData: action.payload
})
const getAllInvoiceSuccess = (state: State, action: Action) => ({
  ...state,
  getAllInvoiceLoading: false,
  getAllInvoiceSuccess: true,
  getAllInvoiceError: false,
  allInvoicesData: action.payload
})

const getInvoiceRequest = (state: State, action: Action) => ({
  ...state,
  getInvoiceLoading: true,
  getInvoiceSuccess: false,
  getInvoiceError: false,

})
const getInvoiceError = (state: State, action: Action) => ({
  ...state,
  getInvoiceLoading: false,
  getInvoiceSuccess: false,
  getInvoiceError: true,
})
const getInvoiceSuccess = (state: State, action: Action) => ({
  ...state,
  getInvoiceLoading: false,
  getInvoiceSuccess: true,
  getInvoiceError: false,
  invoiceData:action.payload
})

//
const sendRevisionRequest = (state: State, action: Action) => ({
  ...state,
  revisionLoading:true,
  revisionSuccess:false,
  revisionError:false

})
const sendRevisionError = (state: State, action: Action) => ({
  ...state,
  revisionLoading:false,
  revisionSuccess:false,
  revisionError:true
})

const sendRevisionSuccess = (state: State, action: Action) => ({
  ...state,
  revisionLoading:false,
  revisionSuccess:true,
  revisionError:false
})
const getAllConversationRequest = (state: State, action: Action) => ({
  ...state,
  invoiceConversationLoading:true,
  invoiceConversationSuccess:false,
  invoiceConversationError:false

})
const getAllInvoiceConversationError = (state: State, action: Action) => ({
  ...state,
  invoiceConversationLoading:false,
  invoiceConversationSuccess:false,
  invoiceConversationError:true
})

const getAllInvoiceConversationSuccess = (state: State, action: Action) => ({
  ...state,
  invoiceConversationLoading:false,
  invoiceConversationSuccess:true,
  invoiceConversationError:false,
  invoiceConversationData:{...state.invoiceConversationData,...action.payload}
})
const projectReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case NEW_INVOICE_REQUEST:
      return generateNewInvoiceRequest(state, action)
    case NEW_INVOICE_SUCCESS:
      return generateNewInvoiceSuccess(state, action)
    case NEW_INVOICE_ERROR:
      return generateNewInvoiceError(state, action)
    case GET_ALL_INVOICE_REQUEST:
      return getAllInvoiceRequest(state, action)
    case GET_ALL_INVOICE_SUCCESS:
      return getAllInvoiceSuccess(state, action)
    case GET_ALL_INVOICE_ERROR:
      return getAllInvoiceError(state, action)
      case GET_INVOICE_REQUEST:
        return getInvoiceRequest(state, action)
      case GET_INVOICE_SUCCESS:
        return getInvoiceSuccess(state, action)
      case GET_INVOICE_ERROR:
        return getInvoiceError(state, action)
      case SEND_REVISION_REQUEST:
        return sendRevisionRequest(state, action)
      case SEND_REVISION_SUCCESS:
        return sendRevisionSuccess(state, action)
      case SEND_REVISION_ERROR:
        return sendRevisionError(state, action)
        case GET_ALL_INVOICE_CONVERSATION_REQUEST:
        return getAllConversationRequest(state, action)
      case GET_ALL_INVOICE_CONVERSATION_SUCCESS:
        return getAllInvoiceConversationSuccess(state, action)
      case GET_ALL_INVOICE_CONVERSATION_ERROR:
        return getAllInvoiceConversationError(state, action)
  
    default:
      return state
  }
}

// export const projectTransform = createTransform(
//   (inboundState: State) => {
//     return {
//       ...inboundState,
//       error:false,
//       success:false,
//       invoiceData:{}
//     }
//   },
//   (outboundState: State) => outboundState,
//   { whitelist: ['invoice'] }
// )

export default projectReducer
