import { StoreState } from 'models/store';

declare module 'react-redux' {
  export interface DefaultRootState extends StoreState {}
}
