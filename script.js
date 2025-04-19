function loadConfig() {
  return parseInt(localStorage.getItem('minAmount') || '1000');
}

function saveConfig() {
  const min = document.getElementById('minAmount').value;
  localStorage.setItem('minAmount', min);
  alert('저장되었습니다');
}

function loadDonations() {
  return JSON.parse(localStorage.getItem('donations') || '[]');
}

function saveDonations(list) {
  localStorage.setItem('donations', JSON.stringify(list));
}

function addDonation(name, amount) {
  const list = loadDonations();
  list.push({ name, amount });
  saveDonations(list);
  renderOverlay();
}

function renderOverlay() {
  const list = loadDonations();
  const min = loadConfig();
  const filtered = list.filter(d => d.amount >= min);
  const target = document.getElementById('donationList');
  if (target) {
    target.textContent = filtered.map(d => `${d.name} - ${d.amount}`).join('\n');
  }
}

const form = document.getElementById('donationForm');
if (form) {
  document.getElementById('minAmount').value = loadConfig();
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const amount = parseInt(document.getElementById('amountInput').value);
    if (name && amount) {
      addDonation(name, amount);
      form.reset();
    }
  });
}

if (document.getElementById('donationList')) {
  renderOverlay();
  setInterval(renderOverlay, 5000); // 5초마다 갱신
}
