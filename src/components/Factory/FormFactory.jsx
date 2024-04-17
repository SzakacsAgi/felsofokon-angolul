import { useState } from 'react'
import { getModifiedFormInputs, isFormSendable, getModifiedSumbitButton } from '../../store/utils/form-util'
import { ACTIONS, formReducer } from '../../store/form-reducer'
export default function FormFactory ({inputs,submitButton,onSubmit,FORM_CONTENT,...props}) {
  const [formState, setFormState] = useState({
    invalidFields: {},
    inputs: inputs
  })

  function handelSubmit (event) {
    event.preventDefault()
    if (isFormSendable(formState)) {
      const newState = formReducer(formState, {
        type: ACTIONS.FORM_IS_UNDER_SENDING
      })
      onSubmit(event, newState)
    }
  }

  function displayFormContent() {
    const modifiedInputs = getModifiedFormInputs(inputs, formState, setFormState);
    const modifiedSubmitButton = getModifiedSumbitButton(submitButton, formState);
    if (formState.isSending) {
      return FORM_CONTENT(modifiedInputs, modifiedSubmitButton).formIsSending
    } else if (formState.isFormSent) {
      return FORM_CONTENT(modifiedInputs, modifiedSubmitButton).successfulFormSending
    } else if (formState.isFormSent === false) {
      return FORM_CONTENT(modifiedInputs, modifiedSubmitButton).unsuccessfulFormSending
    }
    return FORM_CONTENT(modifiedInputs, modifiedSubmitButton).formToFill
  }

  return (
    <form {...props} onSubmit={event => handelSubmit(event)} noValidate>
      {displayFormContent()}
    </form>
  )
}