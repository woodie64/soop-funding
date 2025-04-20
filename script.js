// 후원 데이터를 로드하는 함수 (localStorage에서 데이터 로드)
function loadDonations() {
  return JSON.parse(localStorage.getItem('donations') || '[]'); // localStorage에서 후원자 목록을 불러옴
}

// 후원 데이터를 저장하는 함수 (localStorage에 저장)
function saveDonations(list) {
  localStorage.setItem('donations', JSON.stringify(list)); // 후원 목록을 localStorage에 저장
}

// 후원자 목록을 화면에 표시하는 함수
function renderOverlay() {
  const list = loadDonations();  // localStorage에서 후원자 목록을 로드
  const min = loadConfig();  // 최소 금액 설정을 로드
  const filtered = list.filter(d => d.amount >= min);  // 최소 금액 이상인 후원자 필터링
  const target = document.getElementById('donationList');  // 후원자 목록을 표시할 div
  if (target) {
    target.innerHTML = filtered.map(d => `${d.name} - ${d.amount}`).join('<br>');  // 후원자 목록을 HTML로 삽입
  }
}

// 최소 금액을 로드하는 함수 (localStorage에 저장된 값 가져오기)
function loadConfig() {
  return parseInt(localStorage.getItem('minAmount') || '1000');  // 기본값 1000
}

// 최소 금액을 저장하는 함수 (localStorage에 저장)
function saveConfig() {
  const min = document.getElementById('minAmount').value;
  localStorage.setItem('minAmount', min);
  alert('최소 금액이 저장되었습니다.');
}

// 후원 추가 함수
function addDonation(name, amount) {
  const list = loadDonations();  // 후원자 목록을 로드
  list.push({ name, amount }); // 새로운 후원자 추가
  saveDonations(list);  // 후원 목록을 저장
  renderOverlay();  // 후원 목록 갱신
}

// 후원 입력 폼 처리
const form = document.getElementById('donationForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();  // 폼 제출 기본 동작을 막음
    const name = document.getElementById('nameInput').value;
    const amount = parseInt(document.getElementById('amountInput').value);
    if (name && amount) {
      addDonation(name, amount);  // 후원자 추가
      form.reset();  // 입력 필드 초기화
    }
  });
}

// 최소 금액 입력 필드에 로드된 값 표시
if (document.getElementById('minAmount')) {
  document.getElementById('minAmount').value = loadConfig();  // 최소 금액을 표시
}

// 일정 간격으로 후원자 목록 갱신
setInterval(renderOverlay, 3000);  // 3초마다 갱신
