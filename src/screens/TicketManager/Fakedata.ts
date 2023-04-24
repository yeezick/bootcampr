import { ticketInterface } from '../../interfaces/TicketInterFace'
export const FakeData: ticketInterface = {
  'To Do': [
    {
      id: '1',
      title: 'test1',
      status: 'To Do',
      description: 'lorem ispsom',
      assignees: { title: 'Hector', id: 33, image: 'image' },
      date: '2017-06-01',
      link: 'koffiarielhessou.com',
    },
  ],
  'In progress': [
    {
      id: '4',
      title: 'test4',
      status: 'In progress',
      description: 'lorem ispsom',
      assignees: { title: 'koffi', id: 123, image: 'image' },
      date: '2017-06-01',
      link: 'koffiarielhessou.com',
    },
  ],

  'Under Review': [
    {
      id: '7',
      title: 'test7',
      status: 'Under Review',
      description: 'lorem ispsom',
      assignees: { title: 'koffi', id: 123, image: 'image' },
      date: '2017-06-01',
      link: 'koffiarielhessou.com',
    },
  ],
  Completed: [
    {
      id: '10',
      title: 'test10',
      status: 'Completed',
      description: 'lorem ispsom',
      assignees: { title: 'koffi', id: 123, image: 'image' },
      date: '2017-06-01',
      link: 'koffiarielhessou.com',
    },
  ],
}
