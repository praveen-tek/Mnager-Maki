let currentFilter = 'All';
let selectedTags = [];
let selectedGroup = null;

const $ = id => document.getElementById(id);

const wallpaperContainer = $('wallpaperContainer');
const filtersContainer = $('filters');
const bookmarksList = $('bookmarksList');
const emptyState = $('emptyState');
const addModal = $('addModal');
const settingsModal = $('settingsModal');
const urlInput = $('urlInput');
const titleInput = $('titleInput');
const urlError = $('urlError');
const titleError = $('titleError');
const tagList = $('tagList');
const groupList = $('groupList');
const wallpaperInput = $('wallpaperInput');
const wallpaperUpload = $('wallpaperUpload');
const wallpaperPreview = $('wallpaperPreview');
const settingsBookmarksList = $('settingsBookmarksList');
const groupManager = $('groupManager');
const newGroupInput = $('newGroupInput');
const importFile = $('importFile');

function init() {
  Wallpaper.apply(wallpaperContainer);
  renderFilters();
  renderBookmarks();
  attachEventListeners();
}

function renderFilters() {
  UI.renderFilters(filtersContainer, currentFilter, tag => {
    currentFilter = tag;
    window._currentFilter = tag;
    renderFilters();
    renderBookmarks();
  });
}

function renderBookmarks() {
  window._currentFilter = currentFilter;
  const filtered = Bookmarks.getByTag(currentFilter);
  const hasBookmarks = filtered.length > 0;
  bookmarksList.style.display = hasBookmarks ? 'block' : 'none';
  emptyState.style.display = hasBookmarks ? 'none' : 'flex';
  if (hasBookmarks) UI.renderBookmarks(bookmarksList, filtered, deleteBookmark);
}

function deleteBookmark(id) {
  Bookmarks.delete(id);
  renderBookmarks();
  refreshSettingsLists();
  UI.showNotification('Bookmark deleted');
}

function openAddModal() {
  selectedTags = [];
  selectedGroup = null;
  urlInput.value = '';
  titleInput.value = '';
  UI.clearError(urlError);
  UI.clearError(titleError);
  UI.renderTagOptions(tagList, selectedTags, toggleTag);
  UI.renderGroupOptions(groupList, selectedGroup, g => {
    selectedGroup = g;
    UI.renderGroupOptions(groupList, selectedGroup, arguments.callee);
  });
  UI.toggleModal(addModal, true);
  urlInput.focus();
}

function closeAddModal() {
  UI.toggleModal(addModal, false);
}

function toggleTag(tag) {
  selectedTags = selectedTags.includes(tag)
    ? selectedTags.filter(t => t !== tag)
    : [...selectedTags, tag];
  UI.renderTagOptions(tagList, selectedTags, toggleTag);
}

function saveBookmark() {
  UI.clearError(urlError);
  UI.clearError(titleError);

  const url = urlInput.value.trim();
  const title = titleInput.value.trim();
  let hasError = false;

  if (!url) { UI.showError(urlError, 'URL is required'); hasError = true; }
  if (!title) { UI.showError(titleError, 'Title is required'); hasError = true; }
  if (hasError) return;

  try {
    Bookmarks.add({ url, title, tags: selectedTags, group: selectedGroup });
    closeAddModal();
    renderBookmarks();
    refreshSettingsLists();
    UI.showNotification('Bookmark added');
  } catch (err) {
    UI.showError(urlError, err.message);
  }
}

function openSettingsModal() {
  updateWallpaperPreview();
  refreshSettingsLists();
  UI.toggleModal(settingsModal, true);
}

function closeSettings() {
  UI.toggleModal(settingsModal, false);
}

function refreshSettingsLists() {
  UI.renderBookmarksList(settingsBookmarksList, Bookmarks.getAll(), deleteBookmark);
  UI.renderGroupManager(groupManager, deleteGroup);
}

function deleteGroup(id) {
  Bookmarks.deleteGroup(id);
  renderBookmarks();
  refreshSettingsLists();
  UI.showNotification('Group deleted');
}

function addGroup() {
  const name = newGroupInput.value.trim();
  if (!name) return;
  Bookmarks.addGroup(name);
  newGroupInput.value = '';
  refreshSettingsLists();
  UI.showNotification('Group added');
}

function updateWallpaperPreview() {
  const url = Wallpaper.getPreviewUrl();
  wallpaperPreview.innerHTML = '';
  if (url) {
    const img = document.createElement('img');
    img.src = url;
    wallpaperPreview.appendChild(img);
  }
}

function applyWallpaperUrl() {
  const url = wallpaperInput.value.trim();
  if (!url) return UI.showNotification('Please enter a URL');
  if (Wallpaper.setFromUrl(url)) {
    setTimeout(() => { Wallpaper.apply(wallpaperContainer); updateWallpaperPreview(); }, 100);
    wallpaperInput.value = '';
    UI.showNotification('Wallpaper updated');
  } else {
    UI.showNotification('Invalid URL');
  }
}

function applyWallpaperFile(file) {
  if (!file) return;
  Wallpaper.setFromFile(file).then(success => {
    if (success) {
      Wallpaper.apply(wallpaperContainer);
      updateWallpaperPreview();
      wallpaperUpload.value = '';
      UI.showNotification('Wallpaper updated');
    } else {
      UI.showNotification('Failed to upload');
    }
  });
}

function resetWallpaper() {
  Wallpaper.reset();
  Wallpaper.apply(wallpaperContainer);
  updateWallpaperPreview();
  UI.showNotification('Wallpaper reset');
}

function exportData() {
  const blob = new Blob([JSON.stringify(Storage.exportData(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `manger-maki-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  UI.showNotification('Data exported');
}

function handleImport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      Storage.importData(JSON.parse(e.target.result));
      renderFilters();
      renderBookmarks();
      refreshSettingsLists();
      UI.showNotification('Data imported');
    } catch {
      UI.showNotification('Failed to import');
    }
  };
  reader.readAsText(file);
}

function clearAllData() {
  if (!confirm('Delete all bookmarks, groups and settings?')) return;
  Storage.clearAll();
  currentFilter = 'All';
  selectedTags = [];
  selectedGroup = null;
  renderFilters();
  renderBookmarks();
  Wallpaper.reset();
  Wallpaper.apply(wallpaperContainer);
  updateWallpaperPreview();
  UI.showNotification('All data cleared');
}

function attachEventListeners() {
  $('addBtn').onclick = openAddModal;
  $('addBookmarkBtn').onclick = openAddModal;
  $('closeAddModal').onclick = closeAddModal;
  $('cancelAddBtn').onclick = closeAddModal;
  $('saveBookmarkBtn').onclick = saveBookmark;
  addModal.onclick = e => { if (e.target === addModal) closeAddModal(); };

  $('settingsBtn').onclick = openSettingsModal;
  $('closeSettingsModal').onclick = closeSettings;
  $('closeSettingsBtn').onclick = closeSettings;
  settingsModal.onclick = e => { if (e.target === settingsModal) closeSettings(); };

  wallpaperInput.onkeypress = e => { if (e.key === 'Enter') applyWallpaperUrl(); };
  $('applyWallpaperBtn').onclick = applyWallpaperUrl;
  wallpaperUpload.onchange = e => applyWallpaperFile(e.target.files[0]);
  $('resetWallpaperBtn').onclick = resetWallpaper;

  $('exportBtn').onclick = exportData;
  $('importBtn').onclick = () => importFile.click();
  importFile.onchange = e => handleImport(e.target.files[0]);
  $('clearBtn').onclick = clearAllData;

  $('addGroupBtn').onclick = addGroup;
  newGroupInput.onkeypress = e => { if (e.key === 'Enter') addGroup(); };

  document.onkeydown = e => {
    if (e.key === 'Escape') { closeAddModal(); closeSettings(); }
  };
}

document.addEventListener('DOMContentLoaded', init);