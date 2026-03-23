// Polyfill for Node.js v25 experimental localStorage which has incomplete implementation
if (typeof globalThis !== 'undefined') {
  const g = globalThis as any;
  
  // Check if localStorage exists but doesn't have working getItem/setItem methods
  if (g.localStorage && typeof g.localStorage.getItem !== 'function') {
    // Replace with a proper mock
    const mockLocalStorage = {
      data: new Map<string, string>(),
      getItem(key: string): string | null {
        return this.data.get(key) ?? null;
      },
      setItem(key: string, value: string): void {
        this.data.set(key, String(value));
      },
      removeItem(key: string): void {
        this.data.delete(key);
      },
      clear(): void {
        this.data.clear();
      },
      key(index: number): string | null {
        return Array.from(this.data.keys())[index] ?? null;
      },
      get length(): number {
        return this.data.size;
      },
    };
    
    g.localStorage = mockLocalStorage as Storage;
  }
  
  // Also check sessionStorage
  if (g.sessionStorage && typeof g.sessionStorage.getItem !== 'function') {
    const mockSessionStorage = {
      data: new Map<string, string>(),
      getItem(key: string): string | null {
        return this.data.get(key) ?? null;
      },
      setItem(key: string, value: string): void {
        this.data.set(key, String(value));
      },
      removeItem(key: string): void {
        this.data.delete(key);
      },
      clear(): void {
        this.data.clear();
      },
      key(index: number): string | null {
        return Array.from(this.data.keys())[index] ?? null;
      },
      get length(): number {
        return this.data.size;
      },
    };
    
    g.sessionStorage = mockSessionStorage as Storage;
  }
}
