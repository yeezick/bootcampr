import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render, RenderOptions } from '@testing-library/react'
import notificationReducer from 'utilities/redux/slices/notificationSlice'
import userReducer from 'utilities/redux/slices/userSlice'

const customRender = (
  ui: React.ReactElement,
  preloadedState?: object,
  mockedStore?,
  options?: Omit<RenderOptions, 'queries'>
) => {
  const store = mockedStore
    ? mockedStore
    : configureStore({
        reducer: {
          ui: userReducer,
          notification: notificationReducer,
        },
        preloadedState: preloadedState,
      })

  const Providers = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return render(ui, { wrapper: Providers, ...options })
}
export * from '@testing-library/react'
export { customRender as render }
