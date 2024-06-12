export const handleFormInputChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setFormValues
) => {
  const { name, value } = e.target
  setFormValues(currForm => {
    return { ...currForm, [name]: value }
  })
}

export const handleReduxInputChange = (e, dispatch, reducer) => {
  const { name, value } = e.target
  dispatch(reducer({ [name]: value }))
}
