
  const form = document.getElementById('todo');
  const input = document.getElementById('task');
  const list = document.getElementById('tasks');
  const empty = document.getElementById('empty');
  const filterBtns = document.querySelectorAll('[data-filter]');

  let tasks = [];
  let filter = 'all';

  function render() {
    const visible = tasks.filter(t =>
      filter === 'all' || (filter === 'done' ? t.done : !t.done)
    );

    list.innerHTML = '';
    visible.forEach(t => {
      const li = document.createElement('li');

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = t.done;
      cb.addEventListener('change', () => {
        t.done = cb.checked;
        render();
      });

      const span = document.createElement('span');
      span.textContent = t.text;
      if (t.done) span.style.textDecoration = 'line-through';

      const del = document.createElement('button');
      del.textContent = 'Xóa';
      del.addEventListener('click', () => {
        tasks = tasks.filter(x => x !== t);
        render();
      });

      li.append(cb, span, del);
      list.append(li);
    });

    empty.textContent = visible.length === 0 ? 'Không có công việc nào.' : '';
}

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ text, done: false });
    input.value = '';
    render();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filter = btn.dataset.filter;
      filterBtns.forEach(b =>
        b.setAttribute('aria-pressed', String(b === btn))
      );
      render();
    });
  });

  render();