import { makeAutoObservable, runInAction } from 'mobx';
import { HistoricalBlock } from '@/types/historical-dates';

class HistoricalDatesStore {
  data: HistoricalBlock[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  isInitialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchHistoricalDates = async () => {
    if (this.isInitialized) return;

    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch('/api/historical-dates');
      if (!response.ok) throw new Error('Ошибка при загрузке данных');
      
      const json = await response.json();

      runInAction(() => {
        this.data = json;
        this.isLoading = false;
        this.isInitialized = true;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : 'Неизвестная ошибка';
        this.isLoading = false;
      });
    }
  };
}

export const historicalDatesStore = new HistoricalDatesStore();
