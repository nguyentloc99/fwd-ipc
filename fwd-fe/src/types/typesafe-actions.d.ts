import { ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootAction = ActionType<typeof import('../store/action').default>;

  interface Types {
    RootAction: RootAction;
  }
}
