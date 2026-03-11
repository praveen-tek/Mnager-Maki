const UI = {
  renderFilters(container, activeFilter, onFilterChange) {
    container.innerHTML = '';
    ['All', ...Bookmarks.getTags()].forEach(tag => {
      const btn = document.createElement('button');
      btn.className = `filter-pill ${activeFilter === tag ? 'active' : ''}`;
      btn.textContent = tag;
      btn.onclick = () => onFilterChange(tag);
      container.appendChild(btn);
    });
  },

  renderBookmarks(container, bookmarks, onDelete) {
    container.innerHTML = '';
    bookmarks.forEach(bookmark => {
      const a = document.createElement('a');
      a.href = bookmark.url;
      a.className = 'bookmark';

      a.innerHTML = `
        <div class="bookmark-label">${bookmark.title}</div>
        <button class="bookmark-delete" title="Delete">✕</button>
      `;

      a.querySelector('.bookmark-delete').onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm(`Delete "${bookmark.title}"?`)) onDelete(bookmark.id);
      };

      container.appendChild(a);
    });
  },

  renderTagOptions(container, selectedTags, onTagChange) {
    container.innerHTML = '';
    Bookmarks.getTags().forEach(tag => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tag-option ${selectedTags.includes(tag) ? 'selected' : ''}`;
      btn.textContent = tag;
      btn.onclick = () => onTagChange(tag);
      container.appendChild(btn);
    });
  },

  renderBookmarksList(container, bookmarks, onDelete) {
    container.innerHTML = '';
    if (!bookmarks.length) {
      container.innerHTML = '<div style="opacity:0.6;text-align:center;padding:20px;">No bookmarks yet</div>';
      return;
    }
    bookmarks.forEach(bookmark => {
      const div = document.createElement('div');
      div.className = 'bookmark-item';

      div.innerHTML = `
        <div class="bookmark-item-info">
          <div class="bookmark-item-details">
            <div class="bookmark-item-title">${bookmark.title}</div>
            <div class="bookmark-item-url">${bookmark.url}</div>
          </div>
        </div>
        <button class="bookmark-item-delete" title="Delete">✕</button>
      `;

      div.querySelector('.bookmark-item-delete').onclick = () => {
        if (confirm(`Delete "${bookmark.title}"?`)) onDelete(bookmark.id);
      };

      container.appendChild(div);
    });
  },

  showError(el, msg) {
    el.textContent = msg;
    el.classList.add('show');
  },

  clearError(el) {
    el.textContent = '';
    el.classList.remove('show');
  },

  showNotification(message, duration = 3000) {
    const n = document.createElement('div');
    n.style.cssText = `
      position:fixed;bottom:20px;left:20px;
      background:rgba(255,255,255,0.1);
      border:1px solid rgba(255,255,255,0.2);
      color:#fff;padding:12px 16px;
      font-size:13px;z-index:2000;
      animation:slideIn 0.3s ease;
    `;
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => {
      n.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => n.remove(), 300);
    }, duration);
  },

  toggleModal(modal, show) {
    modal.classList.toggle('active', show);
  },
};

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn { from { transform:translateX(-100%);opacity:0; } to { transform:translateX(0);opacity:1; } }
  @keyframes slideOut { from { transform:translateX(0);opacity:1; } to { transform:translateX(-100%);opacity:0; } }
`;
document.head.appendChild(style);