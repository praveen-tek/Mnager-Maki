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
    if (!bookmarks.length) return;

    const activeTag = window._currentFilter;

    if (activeTag && activeTag !== 'All') {
      const section = document.createElement('div');
      section.className = 'group-section';
      const header = document.createElement('div');
      header.className = 'group-header';
      header.innerHTML = `<span class="group-name">${activeTag}</span>`;
      section.appendChild(header);
      section.appendChild(this._makeGrid(bookmarks, onDelete));
      container.appendChild(section);
      return;
    }

    const tagOrder = Bookmarks.getTags();
    const seen = new Set();
    const byTag = {};

    bookmarks.forEach(b => {
      const tags = b.tags && b.tags.length ? b.tags : ['_none'];
      tags.forEach(t => {
        if (!byTag[t]) byTag[t] = [];
        if (!seen.has(b.id + t)) {
          byTag[t].push(b);
          seen.add(b.id + t);
        }
      });
    });

    const orderedTags = tagOrder.filter(t => byTag[t] && byTag[t].length);
    if (byTag['_none'] && byTag['_none'].length) orderedTags.push('_none');

    orderedTags.forEach(tag => {
      const items = byTag[tag];
      if (!items || !items.length) return;

      const section = document.createElement('div');
      section.className = 'group-section';

      const header = document.createElement('div');
      header.className = 'group-header';
      header.innerHTML = `<span class="group-name">${tag === '_none' ? 'other' : tag}</span>`;
      section.appendChild(header);
      section.appendChild(this._makeGrid(items, onDelete));
      container.appendChild(section);
    });
  },

  _makeGrid(bookmarks, onDelete) {
    const grid = document.createElement('div');
    grid.className = 'bookmarks-grid';

    bookmarks.forEach(bookmark => {
      const a = document.createElement('a');
      a.href = bookmark.url;
      a.className = 'bookmark';

      a.innerHTML = `
        <span class="bookmark-label">${bookmark.title}</span>
        <button class="bookmark-delete" title="Delete">✕</button>
      `;

      a.querySelector('.bookmark-delete').onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm(`Delete "${bookmark.title}"?`)) onDelete(bookmark.id);
      };

      grid.appendChild(a);
    });

    return grid;
  },

  renderTagOptions(container, selectedTags, onTagChange) {
    container.innerHTML = '';
    container.className = 'tag-grid';
    Bookmarks.getTags().forEach(tag => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tag-option ${selectedTags.includes(tag) ? 'selected' : ''}`;
      btn.textContent = tag;
      btn.onclick = () => onTagChange(tag);
      container.appendChild(btn);
    });
  },

  renderGroupOptions(container, selectedGroup, onGroupChange) {
    container.innerHTML = '';
    const groups = Bookmarks.getGroups();
    if (!groups.length) {
      container.innerHTML = '<div style="opacity:0.4;font-size:11px;font-family:Courier New,monospace;">No groups yet. Create one in settings.</div>';
      return;
    }

    const noneBtn = document.createElement('button');
    noneBtn.type = 'button';
    noneBtn.className = `tag-option ${!selectedGroup ? 'selected' : ''}`;
    noneBtn.textContent = 'none';
    noneBtn.onclick = () => onGroupChange(null);
    container.appendChild(noneBtn);

    groups.forEach(group => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tag-option ${selectedGroup === group.id ? 'selected' : ''}`;
      btn.textContent = group.name;
      btn.onclick = () => onGroupChange(group.id);
      container.appendChild(btn);
    });
  },

  renderBookmarksList(container, bookmarks, onDelete) {
    container.innerHTML = '';
    container.className = 'settings-bookmarks-list';
    if (!bookmarks.length) {
      container.innerHTML = '<div style="opacity:0.4;text-align:center;padding:16px;font-size:11px;font-family:Courier New,monospace;text-transform:uppercase;letter-spacing:1px;">No bookmarks yet</div>';
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

  renderGroupManager(container, onDeleteGroup) {
    container.innerHTML = '';
    container.className = 'group-manager';
    const groups = Bookmarks.getGroups();
    if (!groups.length) {
      container.innerHTML = '<div style="opacity:0.4;font-size:11px;font-family:Courier New,monospace;padding:8px 0;">No groups yet</div>';
    } else {
      groups.forEach(group => {
        const row = document.createElement('div');
        row.className = 'group-row';
        row.innerHTML = `
          <span class="group-row-name">${group.name}</span>
          <button class="group-row-delete" title="Delete group">✕</button>
        `;
        row.querySelector('.group-row-delete').onclick = () => {
          if (confirm(`Delete group "${group.name}"? Bookmarks will be ungrouped.`)) onDeleteGroup(group.id);
        };
        container.appendChild(row);
      });
    }
  },

  showError(el, msg) {
    el.textContent = msg;
    el.classList.add('show');
  },

  clearError(el) {
    el.textContent = '';
    el.classList.remove('show');
  },

  showNotification(message, duration = 2500) {
    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => {
      n.style.animation = 'slideOut 0.2s ease forwards';
      setTimeout(() => n.remove(), 200);
    }, duration);
  },

  toggleModal(modal, show) {
    modal.classList.toggle('active', show);
  },
};