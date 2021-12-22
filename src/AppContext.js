import { createContext } from 'react'

export const AppState = {
    userID: null,
    setUserID: null,
  };
  
const AppContext = createContext(AppState);

export default AppContext;