const Storage = {
  BOOKMARKS_KEY: 'minimal_tab_bookmarks',
  SETTINGS_KEY: 'minimal_tab_settings',
  WALLPAPER_KEY: 'minimal_tab_wallpaper',

  DEFAULT_BOOKMARKS: [
    { id: 1, title: 'GitHub', url: 'https://github.com', tags: ['dev', 'tools'] },
    { id: 2, title: 'MDN', url: 'https://developer.mozilla.org', tags: ['dev', 'research'] },
    { id: 3, title: 'Hacker News', url: 'https://news.ycombinator.com', tags: ['news'] },
    { id: 4, title: 'Product Hunt', url: 'https://producthunt.com', tags: ['tools', 'design'] },
    { id: 5, title: 'Dribbble', url: 'https://dribbble.com', tags: ['design', 'ui'] },
  ],

  DEFAULT_WALLPAPER: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
  },

  getBookmarks() {
    try {
      const stored = localStorage.getItem(this.BOOKMARKS_KEY);
      return stored ? JSON.parse(stored) : [...this.DEFAULT_BOOKMARKS];
    } catch {
      return [...this.DEFAULT_BOOKMARKS];
    }
  },

  saveBookmarks(bookmarks) {
    try {
      localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));
      return true;
    } catch {
      return false;
    }
  },

  addBookmark(bookmark) {
    const bookmarks = this.getBookmarks();
    const id = bookmarks.length ? Math.max(...bookmarks.map(b => b.id)) + 1 : 1;
    const newBookmark = { id, ...bookmark, tags: bookmark.tags || [] };
    bookmarks.push(newBookmark);
    this.saveBookmarks(bookmarks);
    return newBookmark;
  },

  updateBookmark(id, updates) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.findIndex(b => b.id === id);
    if (index === -1) return null;
    bookmarks[index] = { ...bookmarks[index], ...updates };
    this.saveBookmarks(bookmarks);
    return bookmarks[index];
  },

  deleteBookmark(id) {
    this.saveBookmarks(this.getBookmarks().filter(b => b.id !== id));
    return true;
  },

  getWallpaper() {
    try {
      const stored = localStorage.getItem(this.WALLPAPER_KEY);
      return stored ? JSON.parse(stored) : { ...this.DEFAULT_WALLPAPER };
    } catch {
      return { ...this.DEFAULT_WALLPAPER };
    }
  },

  saveWallpaper(wallpaper) {
    try {
      localStorage.setItem(this.WALLPAPER_KEY, JSON.stringify(wallpaper));
      return true;
    } catch {
      return false;
    }
  },

  exportData() {
    return {
      bookmarks: this.getBookmarks(),
      wallpaper: this.getWallpaper(),
      exportedAt: new Date().toISOString(),
    };
  },

  importData(data) {
    try {
      if (data.bookmarks) this.saveBookmarks(data.bookmarks);
      if (data.wallpaper) this.saveWallpaper(data.wallpaper);
      return true;
    } catch {
      return false;
    }
  },

  clearAll() {
    localStorage.removeItem(this.BOOKMARKS_KEY);
    localStorage.removeItem(this.SETTINGS_KEY);
    localStorage.removeItem(this.WALLPAPER_KEY);
    return true;
  },
};