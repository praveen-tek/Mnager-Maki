let currentFilter = 'All';
let selectedTags = [];

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
const wallpaperInput = $('wallpaperInput');
const wallpaperUpload = $('wallpaperUpload');
const wallpaperPreview = $('wallpaperPreview');
const settingsBookmarksList = $('settingsBookmarksList');
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
    renderFilters();
    renderBookmarks();
  });
}

function renderBookmarks() {
  const filtered = Bookmarks.getByTag(currentFilter);
  const hasBookmarks = filtered.length > 0;
  bookmarksList.style.display = hasBookmarks ? 'flex' : 'none';
  emptyState.style.display = hasBookmarks ? 'none' : 'flex';
  if (hasBookmarks) UI.renderBookmarks(bookmarksList, filtered, deleteBookmark);
}

function deleteBookmark(id) {
  Bookmarks.delete(id);
  renderBookmarks();
  UI.renderBookmarksList(settingsBookmarksList, Bookmarks.getAll(), deleteBookmark);
  UI.showNotification('Bookmark deleted');
}

function openAddModal() {
  selectedTags = [];
  urlInput.value = '';
  titleInput.value = '';
  UI.clearError(urlError);
  UI.clearError(titleError);
  UI.renderTagOptions(tagList, selectedTags, toggleTag);
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
    Bookmarks.add({ url, title, tags: selectedTags });
    closeAddModal();
    renderBookmarks();
    UI.renderBookmarksList(settingsBookmarksList, Bookmarks.getAll(), deleteBookmark);
    UI.showNotification('Bookmark added');
  } catch (err) {
    UI.showError(urlError, err.message);
  }
}

function openSettingsModal() {
  updateWallpaperPreview();
  UI.renderBookmarksList(settingsBookmarksList, Bookmarks.getAll(), deleteBookmark);
  UI.toggleModal(settingsModal, true);
}

function closeSettings() {
  UI.toggleModal(settingsModal, false);
}

function updateWallpaperPreview() {
  const url = Wallpaper.getPreviewUrl();
  wallpaperPreview.innerHTML = '';
  wallpaperPreview.style.backgroundImage = 'none';
  if (url) {
    const img = document.createElement('img');
    img.src = url;
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
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
      UI.showNotification('Failed to upload wallpaper');
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
      UI.renderBookmarksList(settingsBookmarksList, Bookmarks.getAll(), deleteBookmark);
      UI.showNotification('Data imported');
    } catch {
      UI.showNotification('Failed to import data');
    }
  };
  reader.readAsText(file);
}

function clearAllData() {
  if (!confirm('Delete all bookmarks and settings?')) return;
  Storage.clearAll();
  currentFilter = 'All';
  selectedTags = [];
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

  document.onkeydown = e => {
    if (e.key === 'Escape') { closeAddModal(); closeSettings(); }
  };
}

document.addEventListener('DOMContentLoaded', init);