(function () {
  var list = document.getElementById('blog-list');
  var searchInput = document.getElementById('blog-search');
  var countEl = document.getElementById('blog-count');
  var emptyEl = document.getElementById('blog-empty');
  if (!list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll('.blog-item'));

  var params = new URLSearchParams(window.location.search);
  var urlCategory = params.get('category');
  if (urlCategory && searchInput) {
    searchInput.value = urlCategory;
  }

  function filterPosts() {
    var query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    var visible = 0;

    items.forEach(function (item) {
      var title = item.dataset.title || '';
      var summary = item.dataset.summary || '';
      var category = item.dataset.category || '';
      var match = !query || title.indexOf(query) !== -1 ||
        summary.indexOf(query) !== -1 || category.indexOf(query) !== -1;
      item.hidden = !match;
      if (match) visible++;
    });

    if (countEl) {
      countEl.textContent = visible + ' post' + (visible !== 1 ? 's' : '');
    }
    if (emptyEl) {
      emptyEl.hidden = visible > 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterPosts);
  }
  filterPosts();
})();
