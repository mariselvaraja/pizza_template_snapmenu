import { configureAppStore } from './shared/redux';

// Create the Redux store
export const store = configureAppStore();

// Re-export types from the shared redux module
export type { RootState, AppDispatch } from './shared/redux';
