const error = (search) => {
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.innerHTML = `${search}`;
  div.className = 'error';
  div.append(p);
  document.querySelector('.search').after(div);
};

const showTranslate = (search) => {
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.innerHTML = `Showing results for "${search}"`;
  div.className = 'translate';
  div.append(p);
  document.querySelector('.search').append(div);
};
export { error, showTranslate };
