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
  GET_ALL_INVOICE_CONVERSATION_SUCCESS,
  PAY_INVOICE_SUCCESS,
  DELETE_INVOICE,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE,
  GET_INVOICES,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_ERROR
} from 'actions/actionTypes'
import { Set, Map } from 'immutable'
import { createTransform } from 'redux-persist'
import { addArrayToCache, addToCache } from 'utils'
import { InvoiceFilters, InvoiceStatuses } from 'utils/enums'
import { Invoice, InvoiceConversation } from '../utils/Interface'
import { reduceFilterArray } from './utils'

export type State = {
  loading: boolean
  error: boolean
  success: boolean
  newinvoiceData: Invoice | null
  invoiceData: Invoice | null
  allInvoicesData: Invoice[]
  getAllInvoiceLoading: boolean
  getAllInvoiceSuccess: boolean
  getAllInvoiceError: null | string
  getInvoiceLoading: boolean
  getInvoiceSuccess: boolean
  getInvoiceError: null | string
  invoiceConversationData: { [invoiceId: string]: InvoiceConversation[] }
  cache: { [id: string]: Invoice }
  revisionLoading: boolean
  revisionSuccess: boolean
  revisionError: null | string
  deleteSuccess: boolean
  deleteError: string | null
  deletingInvoice: string | null
  loadingFilters: Set<string>
  filteredIds: Map<string, string[]>
}

export type Action = {
  type: string
  payload: any
  invoiceId: string
  invoice: Invoice
  error: string
  filter: string
  invoices: Invoice[]
}

const initialState = {
  loading: false,
  success: false,
  error: false,
  newinvoiceData: null,
  invoiceData: null,
  allInvoicesData: [],
  getAllInvoiceLoading: false,
  getAllInvoiceSuccess: false,
  getAllInvoiceError: null,
  getInvoiceLoading: false,
  getInvoiceSuccess: false,
  getInvoiceError: null,
  revisionSuccess: false,
  revisionLoading: false,
  revisionError: null,
  invoiceConversationLoading: false,
  invoiceConversationSuccess: false,
  invoiceConversationError: null,
  invoiceConversationData: {},
  cache: {},
  deleteSuccess: false,
  deleteError: null,
  deletingInvoice: null,
  loadingFilters: Set<InvoiceFilters>(),
  filteredIds: Map<InvoiceFilters, string[]>()
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
  newinvoiceData: action.payload,
  cache: addToCache(state.cache, action.payload),
  allInvoicesData: [action.payload, ...state.allInvoicesData]
})

const getAllInvoiceRequest = (state: State, action: Action) => ({
  ...state,
  getAllInvoiceLoading: true,
  getAllInvoiceSuccess: false,
  getALlInvoiceError: false
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
  allInvoicesData: action.payload,
  cache: addArrayToCache(state.cache, action.payload)
})

const getInvoiceRequest = (state: State, action: Action) => ({
  ...state,
  getInvoiceLoading: true,
  getInvoiceSuccess: false,
  getInvoiceError: false
})
const getInvoiceError = (state: State, action: Action) => ({
  ...state,
  getInvoiceLoading: false,
  getInvoiceSuccess: false,
  getInvoiceError: true
})
const getInvoiceSuccess = (state: State, action: Action) => ({
  ...state,
  getInvoiceLoading: false,
  getInvoiceSuccess: true,
  getInvoiceError: false,
  invoiceData: action.invoice,
  cache: addToCache(state.cache, action.invoice)
})

//
const sendRevisionRequest = (state: State, action: Action) => ({
  ...state,
  revisionLoading: true,
  revisionSuccess: false,
  revisionError: false
})
const sendRevisionError = (state: State, action: Action) => ({
  ...state,
  revisionLoading: false,
  revisionSuccess: false,
  revisionError: true
})

const sendRevisionSuccess = (state: State, action: Action) => ({
  ...state,
  revisionLoading: false,
  revisionSuccess: true,
  revisionError: false
})
const getAllConversationRequest = (state: State, action: Action) => ({
  ...state,
  invoiceConversationLoading: true,
  invoiceConversationSuccess: false,
  invoiceConversationError: false
})
const getAllInvoiceConversationError = (state: State, action: Action) => ({
  ...state,
  invoiceConversationLoading: false,
  invoiceConversationSuccess: false,
  invoiceConversationError: true
})

const getAllInvoiceConversationSuccess = (state: State, action: Action) => ({
  ...state,
  invoiceConversationLoading: false,
  invoiceConversationSuccess: true,
  invoiceConversationError: false,
  invoiceConversationData: {
    ...state.invoiceConversationData,
    ...action.payload
  }
})

const payInvoiceSuccess = (state: State, action: Action) => {
  const invoiceId: string = action.invoiceId

  return {
    ...state,
    cache: {
      ...state,
      [invoiceId]: {
        ...state.cache[invoiceId],
        isPaid: true,
        status: InvoiceStatuses.PAID
      }
    }
  }
}

const deleteInvoice = (state: State, action: Action) => ({
  ...state,
  deletingInvoice: action.invoice.id,
  deleteError: null,
  deleteSuccess: false
})

const deleteInvoiceSuccess = (state: State, action: Action) => ({
  ...state,
  deleteSuccess: true,
  deletingInvoice: null,
  allInvoicesData: state.allInvoicesData.filter(
    (invoice: Invoice) => invoice.id !== action.invoiceId
  )
})

const deleteInvoiceFailure = (state: State, action: Action) => ({
  ...state,
  deleteError: action.error,
  deletingInvoice: null
})

const getInvoices = (state: State, action: Action) => ({
  ...state,
  loadingFilters: state.loadingFilters.add(action.filter)
})
const getInvoicesSuccess = (state: State, action: Action) => {
  const { ids, cache } = reduceFilterArray(action.invoices)
  return {
    ...state,
    loadingFilters: state.loadingFilters.remove(action.filter),
    cache: { ...state.cache, ...cache },
    filteredIds: state.filteredIds.set(action.filter, ids)
  }
}
const getInvoicesFailure = (state: State, action: Action) => {
  return {
    ...state,
    loadingFilters: state.loadingFilters.remove(action.filter),
    loadingFilterError: action.error
  }
}

const invoiceReducer = (state = initialState, action: Action) => {
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
    case PAY_INVOICE_SUCCESS:
      return payInvoiceSuccess(state, action)
    case DELETE_INVOICE:
      return deleteInvoice(state, action)
    case DELETE_INVOICE_SUCCESS:
      return deleteInvoiceSuccess(state, action)
    case DELETE_INVOICE_FAILURE:
      return deleteInvoiceFailure(state, action)
    case GET_INVOICES:
      return getInvoices(state, action)
    case GET_INVOICES_SUCCESS:
      return getInvoicesSuccess(state, action)
    case GET_INVOICES_ERROR:
      return getInvoicesFailure(state, action)
    default:
      return state
  }
}

export const invoiceTransform = createTransform(
  (inboundState: State) => {
    return inboundState
  },
  (outboundState: State) => ({
    ...initialState,
    cache: outboundState.cache,
    allInvoicesData: outboundState.allInvoicesData
  }),
  { whitelist: ['invoice'] }
)

export default invoiceReducer
