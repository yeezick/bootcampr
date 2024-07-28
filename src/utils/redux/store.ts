import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { createKanbanSocketMiddleware } from './middleware/kanbanSocketMiddleware'
import { createCommentSocketMiddleware } from './middleware/commentSocketMiddleware'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(createKanbanSocketMiddleware())
      .concat(createCommentSocketMiddleware()),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
