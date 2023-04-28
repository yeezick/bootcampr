export const initialCurrentPage = {
  component: null,
  id: 'one',
  location: {
    next: 'two',
    previous: null,
  },
  title: 'One',
  props: null,
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
      props: null,
    },
    two: {
      component: null,
      id: 'two',
      location: {
        next: 'three',
        previous: 'one',
      },
      title: 'Two',
      props: null,
    },
    three: {
      component: null,
      id: 'three',
      location: {
        next: null,
        previous: 'two',
      },
      title: 'Three',
      props: null,
    },
  },
}
