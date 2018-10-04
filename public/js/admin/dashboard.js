window.onload = () => {
  const select = document.querySelector(`.dashboard-date select`);
  const url_string = window.location.href;
  const url = new URL(url_string);
  const date = url.searchParams.get('date');
  if (date) {
    document.querySelector(`.dashboard-date select option[value='${date}']`).selected = true;
  }
  select.onchange = () => {
    const selectedNew = document.querySelector('.dashboard-date select option:checked');
    if (selectedNew) {
      window.location = '/admin/dashboard?date=' + selectedNew.value;
    }
  };
};