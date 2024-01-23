import { createReduxStore, AppDispatch } from './config/store'
import { StoreProvider } from './ui/StoreProvider'
import type {
  StateSchema,
  ReduxStoreWithManager,
  ThunkExtraArg,
  ThunkConfig,
  StateSchemaKey
} from './config/StateSchema'

export {
  StoreProvider,
  createReduxStore,
  type StateSchema,
  type ReduxStoreWithManager,
  type AppDispatch,
  type ThunkExtraArg,
  type ThunkConfig,
  type StateSchemaKey
}
