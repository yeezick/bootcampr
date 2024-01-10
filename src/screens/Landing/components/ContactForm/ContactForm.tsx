import { useState } from 'react'
import './ContactForm.scss'
import { Button } from '@mui/material'

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [hasErrors, setHasErrors] = useState<boolean>(false)
  const [wordCount, setWordCount] = useState(0)
  const maxWordCount = 500

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name === 'message') {
      const trimmedValue = value.trim()
      const limitedValue = trimmedValue.slice(0, maxWordCount)
      setWordCount(limitedValue.length)
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const checkForErrors = inputName => {
    return hasErrors && formErrors[inputName] ? '#B71C1C' : ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: { name: string; email: string; message: string } = {
      name: '',
      email: '',
      message: '',
    }
    if (!formData.name.trim()) {
      errors.name =
        "Required. We'd love to know who's asking such a great question!"
    }

    if (!formData.email.trim()) {
      errors.email = "Required. We'll respond by email."
    }

    if (!formData.message.trim()) {
      errors.message = 'Required. What question can we answer for you?'
    }

    setFormErrors(errors)

    setHasErrors(Object.keys(errors).length > 0)
    if (Object.values(errors).every(value => value === '')) {
      alert('Message sent successfully!')
    }
  }
  return (
    <div>
      <div className='contact-container'>
        <form onSubmit={handleSubmit} className='contact-wrapper'>
          <div className='contact-header'>
            <div className='question'>Questions?</div>
            <div className='contact'>Contact Us</div>
            <div className='text'>
              Our team will get back to you within 48-72 hours.
            </div>
          </div>
          <div className='contact-form'>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Who are we speaking to?'
                style={{
                  outlineColor: checkForErrors('name'),
                }}
              />
              {formErrors.name && (
                <span className='error'>{formErrors.name}</span>
              )}
            </div>
            <div>
              <label htmlFor='name'>Email address</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='email@email.com'
                style={{
                  outlineColor: checkForErrors('email'),
                }}
              />
              {formErrors.email && (
                <span className='error'>{formErrors.email}</span>
              )}
            </div>
            <div>
              <label htmlFor='message'>Message</label>
              <div className='message-box'>
                <textarea
                  maxLength={500}
                  name='message'
                  id='message'
                  cols={99}
                  rows={10}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Ask Away!'
                  style={{
                    outlineColor: checkForErrors('message'),
                  }}
                ></textarea>
                <span className='helper-text'>
                  <span className='error'>
                    {formErrors.message && formErrors.message}
                  </span>
                  <p
                    style={{
                      color: checkForErrors('message'),
                    }}
                    className='word-count'
                  >
                    {wordCount}/{maxWordCount}
                  </p>
                </span>
              </div>
            </div>
          </div>
          <Button
            className='contact-button'
            variant='contained'
            type='submit'
            disableElevation
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
