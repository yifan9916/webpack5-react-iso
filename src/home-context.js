import { createContext, useContext } from 'react';

export const initialContext = {};
const HomeContext = createContext(initialContext);

export const useHomeContext = () => useContext(HomeContext);
export default HomeContext;
