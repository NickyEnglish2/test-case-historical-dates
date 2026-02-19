import { makeAutoObservable, runInAction } from 'mobx';
import { HistoricalBlock } from '@/types/historical-dates';

export class HistoricalDatesStore {
  data: HistoricalBlock[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  isInitialized: boolean = false;
  activeId: number | null = null;
  isAnimating = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchHistoricalDates = async () => {
    if (this.isInitialized || this.isLoading) return;

    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch('/api/historical-dates');
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные с сервера');
      }

      const json: HistoricalBlock[] = await response.json();

      runInAction(() => {
        this.data = json;
        this.isInitialized = true;
        this.isLoading = false;

        if (json.length > 0 && this.activeId === null) {
          this.activeId = json[0].id;
        }
      });
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
        this.error = err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
      });
    }
  };

  setActiveId = (id: number) => {
    this.activeId = id;
  };

  get activeBlock(): HistoricalBlock | undefined {
    if (!this.activeId) return this.data[0];
    return this.data.find((block) => block.id === this.activeId);
  }

  get activeIndex(): number {
    return this.data.findIndex((block) => block.id === this.activeId);
  }

  nextPeriod = () => {
    const currentIndex = this.activeIndex;
    if (currentIndex < this.data.length - 1) {
      this.activeId = this.data[currentIndex + 1].id;
    }
  };

  prevPeriod = () => {
    const currentIndex = this.activeIndex;
    if (currentIndex > 0) {
      this.activeId = this.data[currentIndex - 1].id;
    }
  };

  setAnimating = (value: boolean) => {
    this.isAnimating = value;
  };
}
