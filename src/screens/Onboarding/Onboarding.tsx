import React from 'react'
import { Paginator } from 'components/Paginator/Paginator'

export const Onboarding = () => {
  const orderedPages = [
    {
      component: 'One',
      title: 'One',
      props: null,
    },
    {
      component: 'Two',
      title: 'Two',
      props: null,
    },
    {
      component: 'Three',
      title: 'Three Word Title',
      props: null,
    },
  ]
  return (
    <div>
      <h1> Onboarding</h1>
      <Paginator
        exitRoute='/'
        orderedPages={orderedPages}
        paginatorId='Onboarding'
      />
    </div>
  )
}
