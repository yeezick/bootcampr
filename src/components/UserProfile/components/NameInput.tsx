export const NameInput = ({
  errorState,
  handleInputChange,
  label,
  name,
  value,
}) => {
  const errorStateText = name === 'firstName' ? 'First name' : 'Last name'
  return (
    <label className='setupProfile__profile-label'>
      {label}
      <input
        type='text'
        name={name}
        className={`setupProfile__profile-input ${errorState && 'error'}`}
        value={value}
        onChange={handleInputChange}
        required
      />
      {errorState && <h6 className='error'>{errorStateText} is required.</h6>}
    </label>
  )
}
