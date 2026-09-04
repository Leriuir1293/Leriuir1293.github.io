(function () {
  var list = document.getElementById('notes-list');
  var searchInput = document.getElementById('notes-search');
  var countEl = document.getElementById('notes-count');
  var emptyEl = document.getElementById('notes-empty');
  var filterBtns = document.querySelectorAll('#category-filters .filter-btn');
  if (!list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll('.note-item'));
  var activeCategory = 'all';

  // Apply URL query params (?category=...&tag=...)
  var params = new URLSearchParams(window.location.search);
  var urlCategory = params.get('category');
  var urlTag = params.get('tag');
  if (urlCategory) {
    activeCategory = urlCategory.toLowerCase();
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.category === activeCategory);
    });
  }
  if (urlTag && searchInput) {
    searchInput.value = urlTag;
  }

  function filterNotes() {
    var query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    var visible = 0;

    items.forEach(function (item) {
      var cat = item.dataset.category || '';
      var title = item.dataset.title || '';
      var summary = item.dataset.summary || '';
      var tags = item.dataset.tags || '';
      var catMatch = activeCategory === 'all' || cat === activeCategory;
      var textMatch = !query || title.indexOf(query) !== -1 ||
        summary.indexOf(query) !== -1 || tags.indexOf(query) !== -1;
      var show = catMatch && textMatch;
      item.hidden = !show;
      if (show) visible++;
    });

    if (countEl) {
      countEl.textContent = visible + ' note' + (visible !== 1 ? 's' : '');
    }
    if (emptyEl) {
      emptyEl.hidden = visible > 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterNotes);
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      activeCategory = btn.dataset.category;
      filterNotes();
    });
  });

  filterNotes();
})();
