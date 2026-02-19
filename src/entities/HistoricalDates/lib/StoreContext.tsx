import React, { createContext, useContext } from 'react';
import { HistoricalDatesStore } from '@/entities/HistoricalDates/model/store';

const StoreContext = createContext<HistoricalDatesStore | null>(null);

export const HistoricalDatesProvider: React.FC<{ 
  store: HistoricalDatesStore; 
  children: React.ReactNode 
}> = ({ store, children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useHistoricalDatesStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useHistoricalDatesStore must be used within HistoricalDatesProvider');
  }
  return store;
};
