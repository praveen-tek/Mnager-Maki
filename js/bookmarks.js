const Bookmarks = {
  AVAILABLE_TAGS: [
    'news', 'ui', 'robotics', 'open-media', 'research',
    'tools', 'ai', 'design', 'dev', 'productivity', 'social',
    'entertainment', 'education', 'business', 'health'
  ],

  getAll() {
    return Storage.getBookmarks();
  },

  getByTag(tag) {
    if (tag === 'All') return this.getAll();
    return this.getAll().filter(b => (b.tags || []).includes(tag));
  },

  getTags() {
    return this.AVAILABLE_TAGS;
  },

  add(data) {
    if (!data.url || !data.title) throw new Error('URL and Title are required');
    try { new URL(data.url); } catch { throw new Error('Invalid URL'); }
    return Storage.addBookmark({
      title: data.title.trim(),
      url: data.url.trim(),
      tags: data.tags || [],
    });
  },

  delete(id) {
    return Storage.deleteBookmark(id);
  },
};