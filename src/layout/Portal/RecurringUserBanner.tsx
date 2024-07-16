import bannerImgLg from '../../assets/Images/banner-img-lg.png'

export const RecurringUserBanner = () => {
  return (
    <div className='recurring-waitlist-banner'>
      <img className='waitlist-img' src={bannerImgLg} alt='waitlist' />
      <div className='content'>
        <h2>We're working to match you to a team.</h2>
        <p>In the meantime, feel free to explore the product details page.</p>
        <p>
          The other pages in the Project Portal will be available when you're
          matched to a team.
        </p>
      </div>
    </div>
  )
}
