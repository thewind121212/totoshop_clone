
"use client";
import {useState} from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import classes from './input.styles.module.css'

const iconStyle = {width:'24px', height: '24px'}

  const PasswordShowIcon  = ({togglePassword, isShow} : any)  => (
    <div className={classes.iconWrap} onClick={() => togglePassword(true)}>
        <h3 className={classes.showIcon}>
            {isShow ? <AiFillEyeInvisible style={iconStyle} /> : <AiFillEye style={iconStyle} />}
        </h3>
    </div>
  );



function InputForm({id, label, type, placeholder, errors, register, formType, isTouch }: any) {
    const [isShow, setIsShow] = useState<boolean>(false);
    const errorMessage = errors[id]?.message ? `⚠ ${errors[id].message}` : '';


    const handlerShowPassword = () => {
       setIsShow(!isShow) 
    }
  return (
    <div className={classes.inputForm}>
      <legend className={classes.legend}>{label}</legend>
      <div className={`${classes.inputWrap} ${errorMessage.length !== 0 && classes.inputWrapError}`}>
        <input
            {...register(id)}
          type={type === "password" ? (isShow ? "text" : "password") : type}
          className={classes.input}
          placeholder={placeholder}
          name={id}
        />
        {type === "password" && <PasswordShowIcon isShow={isShow} togglePassword={handlerShowPassword} />}
      </div>
      {formType === "register" && (
      <div className={classes.inputAlert} >{errorMessage}</div>

      )}
      {}
    </div>
  );
}

export default InputForm;
