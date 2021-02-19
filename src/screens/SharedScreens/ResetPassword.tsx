import react,{useState,ChangeEvent} from 'react'
import {useDispatch} from 'react-redux';
import AppTextField from '../../components/Common/Core/AppTextField'
import {Typography,Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import {resetPasswordRequest} from '../../actions/authActions'

const ResetPassword = ({}) => {
    const [password,setPassword]=useState({newPassword:'',confirmPassword:''})
    const [errors,setErrors]=useState({newPassword:'',confirmPassword:''})
    const dispatch=useDispatch()
    const handleChangePassword = (event: any) => (key: string) => {
      const value = event.target.value
      setPassword({...password,[key]:value})
    }
    type PasswordType={
        newPassword:string
        confirmPassword:string
    }
    const validate=(data:PasswordType)=>{
        let errors:any;
        errors={}
        if(data.hasOwnProperty('newPassword')){
           if(data.newPassword==''){
                errors.newPassword='Enter Password'
           }
           else if(data.newPassword && data.newPassword.length<6){
                errors.newPassword='Password should not be less than 6 characters'
           }
        }
        if(data.hasOwnProperty('confirmPassword')){
            if(data.confirmPassword==''){
                errors.confirmPassword='Enter Confirm Password'
           }
           else if(data.confirmPassword!==data.newPassword){
                errors.confirmPassword='Password does not match'
           }
        }
        return errors
    }
    const handleResetPassword=()=>{
        const errors=validate(password);
        setErrors(errors)
        console.log(Object.values(errors),"errorsss")
        if(!Object.keys(errors).length){
            dispatch(resetPasswordRequest(password.confirmPassword))
        }
    }
    const classes=useStyles()
  
  return (
    <>
      <Typography variant={'h5'} className={classes.headerTitle}>
        Reset Password
      </Typography>
      <AppTextField
        label={'Password'}
        type={'password'}
        name='Password'
        onChange={(e: ChangeEvent) => handleChangePassword(e)('newPassword')}
        value={password.newPassword}
        error={errors.newPassword?true:false}
      />
      {errors.newPassword && <Typography>{errors.newPassword}</Typography>}
      <AppTextField
        label={'Confirm Password'}
        type={'password'}
        name='confirmPassword'
        onChange={(e: ChangeEvent) =>
          handleChangePassword(e)('confirmPassword')
        }
        value={password.confirmPassword}
        error={errors.confirmPassword?true:false}
      />
      {errors.confirmPassword && <Typography>{errors.confirmPassword}</Typography>}
      <Grid container justify='flex-end'>
      <GradiantButton onClick={handleResetPassword}>Save Password</GradiantButton>
      </Grid>
    </>
  )
}
export default ResetPassword

const useStyles=makeStyles(()=>({
    headerTitle:{
        fontWeight:'bold',
        marginBottom:'20px'
    }
}))
