import type { FullPalmReading } from '../types/contracts';

export interface StoredReadingItem {
  id: string;
  scanId: string;
  name: string; // e.g. "Aarav" or "Palm 1"
  date: string;
  archetype: string;
  hand: 'left' | 'right';
  language: string;
  thumbnailUrl?: string;
  reading: FullPalmReading;
}

const STORAGE_KEY = 'kai_readings_history';

export class ReadingHistoryService {
  public static getHistory(): StoredReadingItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed: StoredReadingItem[] = JSON.parse(data);
      // Ensure backward compatibility: fill default name if missing
      return parsed.map((item, index) => ({
        ...item,
        name: item.name || `Palm ${index + 1}`,
      }));
    } catch {
      return [];
    }
  }

  public static getNextDefaultPalmName(): string {
    const list = this.getHistory();
    const palmNumbers = list
      .map((item) => {
        const match = item.name?.match(/^Palm\s*(\d+)$/i);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((n) => n > 0);

    const maxNum = palmNumbers.length > 0 ? Math.max(...palmNumbers) : 0;
    return `Palm ${maxNum + 1}`;
  }

  public static saveReading(
    reading: FullPalmReading,
    thumbnailUrl?: string,
    language: string = 'en',
    customName?: string
  ): StoredReadingItem {
    const list = this.getHistory();
    const existingIdx = list.findIndex((item) => item.scanId === reading.scanId);
    
    // Determine assigned name
    const finalName = customName?.trim() || (existingIdx >= 0 && list[existingIdx].name) || this.getNextDefaultPalmName();

    const newItem: StoredReadingItem = {
      id: reading.readingId,
      scanId: reading.scanId,
      name: finalName,
      date: existingIdx >= 0 ? list[existingIdx].date : new Date().toISOString(),
      archetype: reading.archetype,
      hand: reading.hand,
      language,
      thumbnailUrl: thumbnailUrl || (existingIdx >= 0 ? list[existingIdx].thumbnailUrl : undefined),
      reading,
    };

    if (existingIdx >= 0) {
      list[existingIdx] = newItem;
    } else {
      list.unshift(newItem);
    }

    // Limit to 20 local items to keep storage lightweight
    const capped = list.slice(0, 20);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(capped));
    } catch (e) {
      console.warn('Failed to save reading to local history:', e);
    }

    return newItem;
  }

  public static renameReading(scanId: string, newName: string): boolean {
    try {
      const list = this.getHistory();
      const item = list.find((i) => i.scanId === scanId);
      if (!item) return false;

      item.name = newName.trim() || 'Palm 1';
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      console.warn('Failed to rename reading:', e);
      return false;
    }
  }

  public static deleteReading(scanId: string): void {
    try {
      const list = this.getHistory().filter((item) => item.scanId !== scanId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to delete reading from history:', e);
    }
  }

  public static clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
