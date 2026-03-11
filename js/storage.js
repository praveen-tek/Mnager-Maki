const Storage = {
  BOOKMARKS_KEY: 'minimal_tab_bookmarks',
  WALLPAPER_KEY: 'minimal_tab_wallpaper',
  GROUPS_KEY: 'minimal_tab_groups',

  DEFAULT_BOOKMARKS: [
    { id: 1, title: 'GitHub', url: 'https://github.com', tags: ['dev', 'tools'], group: null },
    { id: 2, title: 'MDN', url: 'https://developer.mozilla.org', tags: ['dev', 'research'], group: null },
    { id: 3, title: 'Hacker News', url: 'https://news.ycombinator.com', tags: ['news'], group: null },
    { id: 4, title: 'Product Hunt', url: 'https://producthunt.com', tags: ['tools', 'design'], group: null },
    { id: 5, title: 'Dribbble', url: 'https://dribbble.com', tags: ['design', 'ui'], group: null },
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
    const newBookmark = { id, ...bookmark, tags: bookmark.tags || [], group: bookmark.group || null };
    bookmarks.push(newBookmark);
    this.saveBookmarks(bookmarks);
    return newBookmark;
  },

  deleteBookmark(id) {
    this.saveBookmarks(this.getBookmarks().filter(b => b.id !== id));
    return true;
  },

  getGroups() {
    try {
      const stored = localStorage.getItem(this.GROUPS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveGroups(groups) {
    try {
      localStorage.setItem(this.GROUPS_KEY, JSON.stringify(groups));
      return true;
    } catch {
      return false;
    }
  },

  addGroup(name) {
    const groups = this.getGroups();
    const id = Date.now().toString();
    groups.push({ id, name });
    this.saveGroups(groups);
    return { id, name };
  },

  deleteGroup(id) {
    this.saveGroups(this.getGroups().filter(g => g.id !== id));
    this.saveBookmarks(this.getBookmarks().map(b => b.group === id ? { ...b, group: null } : b));
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
      groups: this.getGroups(),
      exportedAt: new Date().toISOString(),
    };
  },

  importData(data) {
    try {
      if (data.bookmarks) this.saveBookmarks(data.bookmarks);
      if (data.wallpaper) this.saveWallpaper(data.wallpaper);
      if (data.groups) this.saveGroups(data.groups);
      return true;
    } catch {
      return false;
    }
  },

  clearAll() {
    localStorage.removeItem(this.BOOKMARKS_KEY);
    localStorage.removeItem(this.WALLPAPER_KEY);
    localStorage.removeItem(this.GROUPS_KEY);
    return true;
  },
};