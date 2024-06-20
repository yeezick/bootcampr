import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export const AboutMeInput = ({ handleInputChange, errorState, bio }) => {
  const [bioCharCount, setBioCharCount] = useState(bio.length)
  const handleAboutMeInputChange = e => {
    handleInputChange(e)
    setBioCharCount(e.target.value.length)
  }

  return (
    <label className='setupProfile__profile-label'>
      *About me
      <TextareaAutosize
        name='bio'
        className={`setupProfile__profile-label ${errorState && 'error'}`}
        onChange={handleAboutMeInputChange}
        maxLength={500}
        minRows={8}
        placeholder={
          "I'm from...\nI live in...\nI chose this career path because...\nMy hobbies are...\nA fun fact about me is..."
        }
        value={bio}
      />
      <div className='bio-undertext'>
        <div>
          {errorState && (
            <h6 className='error'>Tell us something about yourself.</h6>
          )}
        </div>
        <div
          className={`setupProfile__profile-bioCharCount ${
            errorState && 'error'
          }`}
        >
          <p className={`${errorState && 'error'}`}>{bioCharCount}/500</p>
        </div>
      </div>
    </label>
  )
}
