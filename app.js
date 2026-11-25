(() => {
  const elUser = document.getElementById('username');
  const elSub = document.getElementById('subname');
  const btnGen = document.getElementById('btnGen');
  const btnCopy = document.getElementById('btnCopy');
  const hh = document.getElementById('hh');
  const mm = document.getElementById('mm');
  const ss = document.getElementById('ss');

  let current = '';

  function tickClock() {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    hh.textContent = p(d.getHours());
    mm.textContent = p(d.getMinutes());
    ss.textContent = p(d.getSeconds());
  }
  tickClock();
  setInterval(tickClock, 500);

  function generate() {
    btnGen.disabled = true;
    $.ajax({
      url: 'https://randomuser.me/api/?inc=login,name',
      dataType: 'json',
      cache: false,
      success: function(data) {
        const u = data.results[0];
        current = u.login.username;
        elUser.textContent = current;
        elSub.textContent = `${u.name.first} ${u.name.last}`;
        if (window.MatrixAutoFit) {
          window.MatrixAutoFit.fitElement(elUser, { maxRem: 5.5, minRem: 2.0, widthRatio: 0.94 });
        }
      },
      error: function() {
        elUser.textContent = 'error — retry';
      },
      complete: function() {
        btnGen.disabled = false;
      }
    });
  }

  async function copy() {
    if (!current) return;
    await navigator.clipboard.writeText(current);
    btnCopy.textContent = 'COPIED';
    setTimeout(() => { btnCopy.textContent = 'COPY'; }, 1000);
  }

  btnGen.addEventListener('click', generate);
  btnCopy.addEventListener('click', copy);

  document.addEventListener('keydown', (e) => {
    const tag = (e.target?.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.code === 'Space' || e.key === 'Enter') {
      e.preventDefault();
      generate();
    } else if (e.key.toLowerCase() === 'c') {
      e.preventDefault();
      copy();
    }
  });

  generate();
})();
