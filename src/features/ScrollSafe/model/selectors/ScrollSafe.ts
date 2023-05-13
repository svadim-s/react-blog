import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'

export const getScrollSafe = (state: StateSchema) => state.scrollSafe.scroll

export const getScrollSafeByPath = createSelector(
  getScrollSafe,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0
)
