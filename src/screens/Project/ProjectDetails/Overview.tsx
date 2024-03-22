import './Overview.scss'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { AccordionItem } from './AccordionItem'

export const Overview = () => {
  const overviewContent = [
    {
      title: 'Client Profile',
      content: (
        <p>
          The client for this project is a newly established restaurant located
          in a bustling urban area. This restaurant specializes in fusion
          cuisine, combining flavors from various cultures to create unique and
          innovative dishes. They aim to provide a modern dining experience with
          a focus on quality ingredients and exceptional customer service.
        </p>
      ),
    },
    {
      title: 'Project Overview',
      content: (
        <p>
          As a team you will develop a Minimum Viable Product (MVP) for this
          restaurant, which will serve as this restaurant’s initial online
          presence. The MVP will consist of a website where customers can view
          the restaurant's menu, make reservations, and learn more about the
          establishment and more (please see Product Details Tab for detailed
          requirements). The project will last for four weeks, with key
          milestones including product management, design and development. 
        </p>
      ),
    },
    {
      title: 'Project Goal',
      content: <p>Establish an initial online presence for the restaurant.</p>,
    },
    {
      title: 'Target Audience',
      content: (
        <p>
          The target audience for this restaurant includes urban residents aged
          25-45, primarily working professionals and young couples. They are
          tech-savvy, value convenience, and appreciate culinary innovation.
          <p className='title'>Demographics: </p>
          <ul>
            <li>Urban residents</li>
            <li>25-45 years old</li>
            <li>Diverse backgrounds</li>
          </ul>
          <p className='title'>Interests:</p>
          <ul>
            <li>Food enthusiasts</li>
          </ul>
          <p className='title'>Pain Points:</p>
          <ul>
            <li>Limited time for dining out</li>
            <li>Desire for hassle-free reservation process</li>
          </ul>
          <p className='title'>Motivators:</p>
          <ul>
            <li>Quality food</li>
            <li>Unique dining experiences</li>
            <li>Convenience</li>
          </ul>
        </p>
      ),
    },
    {
      title: 'Competitors',
      content: (
        <p>
          Competitors in the restaurant industry within the same urban area
          include established eateries with strong online presences.
          <p className='title'>Key findings include:</p>
          <ul>
            <li>
              Many competitors offer online reservations and menu browsing
            </li>
            <li>
              Opportunities exist to differentiate through unique menu offerings
              and user experience
            </li>
            <li>
              Overdone trends include generic website templates and lack of
              personalized content
            </li>
          </ul>
        </p>
      ),
    },
    {
      title: 'Design Requirements',
      content: (
        <p>
          <p className='title'>Technical:</p>
          <ul>
            <li>Responsive design for seamless browsing across devices</li>
            <li>Integration with reservation system.</li>
          </ul>
          <p className='title'>Brand and Style: </p>
          <ul>
            <li>
              Incorporation of the restaurant’s branding elements, such as logo
              and color scheme.
            </li>
          </ul>
          <p className='title'>Functional Requirements:</p>
          <ul>
            <li>Menu browsing functionality</li>
            <li>Online reservation system</li>
            <li>Contact information display</li>
          </ul>
        </p>
      ),
    },
    {
      title: 'Project Deliverables',
      content: (
        <p>
          <p className='title'>Technical:</p>
          <ul>
            <li>Responsive design for seamless browsing across devices</li>
            <li>Integration with reservation system.</li>
          </ul>
          <p className='title'>Brand and Style: </p>
          <ul>
            <li>
              Incorporation of the restaurant’s branding elements, such as logo
              and color scheme.
            </li>
          </ul>
          <p className='title'>Functional Requirements:</p>
          <ul>
            <li>Menu browsing functionality</li>
            <li>Online reservation system</li>
            <li>Contact information display</li>
          </ul>
        </p>
      ),
    },
    {
      title: 'Product Requirements Document',
      content: (
        <p>
          You’ll find a{' '}
          <a
            href='https://www.canva.com/design/DAF-mnFXzbQ/RSi-4c_gM00qNGYrYltFlQ/edit?utm_content=DAF-mnFXzbQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
            target='_blank'
            className='products-req-doc'
          >
            detailed product requirements document here.
          </a>
        </p>
      ),
    },
  ]
  return (
    <div className='overview'>
      {overviewContent.map(item => (
        <AccordionItem title={item.title} details={item.content} />
      ))}
    </div>
  )
  {
    /* <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          <Typography className='title'>Client Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='details-div'>
            <p>
              The client for this project is a newly established restaurant
              located in a bustling urban area. This restaurant specializes in
              fusion cuisine, combining flavors from various cultures to create
              unique and innovative dishes. They aim to provide a modern dining
              experience with a focus on quality ingredients and exceptional
              customer service.
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography className='title'>Project Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className='details-div'>
              <p>
                As a team you will develop a Minimum Viable Product (MVP) for
                this restaurant, which will serve as this restaurant’s initial
                online presence. The MVP will consist of a website where
                customers can view the restaurant's menu, make reservations, and
                learn more about the establishment and more (please see Product
                Details Tab for detailed requirements). The project will last
                for four weeks, with key milestones including product
                management, design and development. 
              </p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography className='title'>Project Goal</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='details-div'>
            <p>Establish an initial online presence for the restaurant.</p>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography className='title'>Target Audience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='details-div'>
            <p>
              The target audience for this restaurant includes urban residents
              aged 25-45, primarily working professionals and young couples.
              They are tech-savvy, value convenience, and appreciate culinary
              innovation.
              <p className='title'>Demographics: </p>
              <ul>
                <li>Urban residents</li>
                <li>25-45 years old</li>
                <li>Diverse backgrounds</li>
              </ul>
              <p className='title'>Interests:</p>
              <ul>
                <li>Food enthusiasts</li>
              </ul>
              <p className='title'>Pain Points:</p>
              <ul>
                <li>Limited time for dining out</li>
                <li>Desire for hassle-free reservation process</li>
              </ul>
              <p className='title'>Motivators:</p>
              <ul>
                <li>Quality food</li>
                <li>Unique dining experiences</li>
                <li>Convenience</li>
              </ul>
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography className='title'>Competitors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='details-div'>
            <p>
              Competitors in the restaurant industry within the same urban area
              include established eateries with strong online presences.
              <p className='title'>Key findings include:</p>
              <ul>
                <li>
                  Many competitors offer online reservations and menu browsing
                </li>
                <li>
                  Opportunities exist to differentiate through unique menu
                  offerings and user experience
                </li>
                <li>
                  Overdone trends include generic website templates and lack of
                  personalized content
                </li>
              </ul>
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography className='title'>Design Requirements</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='details-div'>
            <p className='title'>Technical:</p>
            <ul>
              <li>Responsive design for seamless browsing across devices</li>
              <li>Integration with reservation system.</li>
            </ul>
            <p className='title'>Brand and Style: </p>
            <ul>
              <li>
                Incorporation of the restaurant’s branding elements, such as
                logo and color scheme.
              </li>
            </ul>
            <p className='title'>Functional Requirements:</p>
            <ul>
              <li>Menu browsing functionality</li>
              <li>Online reservation system</li>
              <li>Contact information display</li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography className='title'>Project Deliverables</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='details-div'>
            <p>Upon completion of the project, the restaurant will have:</p>
            <ul>
              <li>A fully functional website showcasing menu and services.</li>
              <li>An online reservation and booking system.</li>
              <li>
                Documentation for website maintenance and future enhancements.
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography className='title'>
            Product Requirements Document
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='details-div'>
            <p>
              You’ll find a{' '}
              <a
                href='https://www.canva.com/design/DAF-mnFXzbQ/RSi-4c_gM00qNGYrYltFlQ/edit?utm_content=DAF-mnFXzbQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
                target='_blank'
                className='products-req-doc'
              >
                detailed product requirements document here.
              </a>
            </p>
          </div>
        </AccordionDetails>
      </Accordion> */
  }
}
