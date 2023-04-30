export const initialCurrentPage = {
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
      component: null,
      id: 'one',
      location: {
        next: 'two',
        previous: null,
      },
      title: 'One',
    },
    two: {
      component: null,
      id: 'two',
      location: {
        next: 'three',
        previous: 'one',
      },
      title: 'Two',
    },
    three: {
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
