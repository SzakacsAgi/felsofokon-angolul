import FormSelectInput from '../FormSelectInput'
import '../Input.css'
import { forwardRef } from 'react'
import { ACTIONS, formReducer } from '../../store/form-reducer'

const InputFactory = forwardRef(function Input ({required,type,labelText,options,placeHolder,id,errorMessage,formState},ref){
  let input = null;
  switch (type) {
    case 'EMAIL':
      input = <input
          onBlur={() =>
              formReducer(formState, {type:ACTIONS.FORM_VALIDATE, payload:{validationData:{
                validationType: 'isValidEmail',
                inputField: ref,
                id: id}}
              })
          }
          onChange={() =>
                formReducer(formState, {type:ACTIONS.FORM_VALIDATE, payload:{validationData:{
                  validationType: 'isValidEmail',
                  inputField: ref,
                  id: id}}
                })
          }
          type='email'
          placeholder={placeHolder}
          id={id}
          ref={ref}
        />
      break;
    case 'TEXT':
       
      input = <input
          onBlur={required ? () =>
                formReducer(formState, {type:ACTIONS.FORM_VALIDATE, payload:{validationData:{
                  validationType: 'isNotNull',
                  inputField: ref,
                  id: id}}
                }) : null
          }
          onChange={required ? () =>
                formReducer(formState, {type:ACTIONS.FORM_VALIDATE, payload:{validationData:{
                  validationType: 'isNotNull',
                  inputField: ref,
                  id: id}}
                }) : null
          }
          type='text'
          placeholder={placeHolder}
          id={id}
          ref={ref}
        />
      break;
    case 'TEXTAREA':
      input = <textarea
          onBlur={required ? () =>
                formReducer(formState, {type:ACTIONS.FORM_VALIDATE, payload:{validationData:{
                  validationType: 'isNotNull',
                  inputField: ref,
                  id: id}} 
                }) : null
          }
          onChange={ required ? () => formReducer(formState, {type:ACTIONS.FORM_VALIDATE, payload:{validationData:{
                  validationType: 'isNotNull',
                  inputField: ref,
                  id: id}}
                }) : null
          }
          placeholder={placeHolder}
          id={id}
          ref={ref}
        />
      break;
    case 'SELECT':
      input = <FormSelectInput options={options} id={id} ref={ref} />
      break;
    default:
      input = <input value='Input type was not defined' />
  }

  return (
    <div className='form-input'>
      <label htmlFor={id} required={!!required}>
        {labelText}
      </label>
      {input}
      {formState && formState.invalidFields[id] ? <p className='error-message'>{errorMessage}</p> : ''}
    </div>
  )
})

export default InputFactory
