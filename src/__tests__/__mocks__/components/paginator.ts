export const initialCurrentPage = {
  completed: true,
  component: null,
  id: 'one',
  location: {
    next: 'two',
    previous: null,
  },
  title: 'One',
}

export const initialPageRouter = {
  currentPageId: 'one',
  exitRoute: '/',
  paginatorId: 'Onboarding',
  allPages: {
    one: {
      completed: false,
      component: null,
      id: 'one',
      location: {
        next: 'two',
        previous: null,
      },
      title: 'One',
    },
    two: {
      completed: false,
      component: null,
      id: 'two',
      location: {
        next: 'three',
        previous: 'one',
      },
      title: 'Two',
    },
    three: {
      completed: false,
      component: null,
      id: 'three',
      location: {
        next: null,
        previous: 'two',
      },
      title: 'Three',
    },
  },
}
