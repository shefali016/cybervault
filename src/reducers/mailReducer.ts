import {
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_ERROR,
    GET_ALL_MAIL_TEMPLATES_REQUEST,
    GET_ALL_MAIL_TEMPLATES_ERROR,
    GET_ALL_MAIL_TEMPLATES_SUCCESS
  } from 'actions/actionTypes'
  import { createTransform } from 'redux-persist'
  import * as Types from '../utils/Interface'
  
  export type State = {
    loading:Boolean,
    success:Boolean,
    error:Boolean,
    mailTemplateLoading:Boolean,
    mailTemplateSuccess:Boolean,
    mailTemplateError:Boolean,
    mailTemplatesData:Array<Types.MailTemplate>
  }
  
  export type Action = {
    type: string
    payload: {}
    error: string
  }
  
  const initialState = {
    loading:false,
    success:false,
    error:false,
    mailTemplateLoading:false,
    mailTemplateSuccess:false,
    mailTemplateError:false,
    mailTemplatesData:[]
  }
  
  
  const sendEmailRequest = (state: State, action: Action) => ({
    ...state,
    loading:true,
    success:false,
    error:false
  })
  
  const sendEmailSuccess = (state: State, action: Action) => {
    return {
      ...state,
      loading:false,
      success:true,
      error:false
    }
  }
  
  const sendEmailError = (state: State, action: Action) => ({
    ...state,
    error:true,
    loading:false,
    success:false
  })

  const getAllMailTemplatesRequest = (state: State, action: Action) => ({
    ...state,
    mailTemplateLoading:true,
    mailTemplateSuccess:false,
    mailTemplateError:false
  })
  
  const getAllMailTemplatesSuccess = (state: State, action: Action) => {
    return {
      ...state,
    mailTemplateLoading:false,
    mailTemplateSuccess:true,
    mailTemplateError:false,
    mailTemplatesData:action.payload
    }
  }
  
  const getAllMailTemplatesError = (state: State, action: Action) => ({
    ...state,
    mailTemplateLoading:false,
    mailTemplateSuccess:false,
    mailTemplateError:true
  })
  

  const mailReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case SEND_EMAIL_REQUEST:
        return sendEmailRequest(state, action)
      case SEND_EMAIL_SUCCESS:
        return sendEmailSuccess(state, action)
      case SEND_EMAIL_ERROR:
        return sendEmailError(state, action)
        case GET_ALL_MAIL_TEMPLATES_REQUEST:
          return getAllMailTemplatesRequest(state, action)
        case GET_ALL_MAIL_TEMPLATES_SUCCESS:
          return getAllMailTemplatesSuccess(state, action)
        case GET_ALL_MAIL_TEMPLATES_ERROR:
          return getAllMailTemplatesError(state, action)
      
      
      default:
        return state
    }
  }
  
  export const mailTransform = createTransform(
    (inboundState: State) => {
      return {
        ...inboundState,
        loading:false,
        success:false,
        error:false,
        
      }
    },
    (outboundState: State) => outboundState,
    { whitelist: ['mails'] }
  )
  
  export default mailReducer
  