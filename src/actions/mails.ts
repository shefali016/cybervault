import * as ActionTypes from './actionTypes'
import * as Types from '../utils/Interface' 

export function sendEmailRequest(
  mail:Types.Mail
  ) {
    return {
      type: ActionTypes.SEND_EMAIL_REQUEST,
      mail
    }
  }
  export function sendEmailSuccess(
    mail:any
  ) {
    return {
      type: ActionTypes.SEND_EMAIL_SUCCESS,
      payload:mail
    }
  }
  export function sendEmailError(error: string) {
    return {
      type: ActionTypes.SEND_EMAIL_ERROR,
      error
    }
  }

  export function getAllMailTemplatesRequest(){
      return {
        type: ActionTypes.GET_ALL_MAIL_TEMPLATES_REQUEST,
      }
    }
    export function getAllMailTemplatesSuccess(
      mailTemplatesData:Array<Types.MailTemplate>
    ) {
      return {
        type: ActionTypes.GET_ALL_MAIL_TEMPLATES_SUCCESS,
        payload:mailTemplatesData
      }
    }
    export function getAllMailTemplatesError(error: string) {
      return {
        type: ActionTypes.GET_ALL_MAIL_TEMPLATES_ERROR,
        error
      }
    }
   
  
  
  
  