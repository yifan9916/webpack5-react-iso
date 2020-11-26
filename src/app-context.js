import { createContext, useContext } from 'react';

const initialContext = {};
const AppContext = createContext(initialContext);

const useAppContext = () => useContext(AppContext);
export { AppContext, useAppContext, initialContext };
