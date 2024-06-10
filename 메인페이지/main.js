const notices = [
  '첫 번째 공지',
  '두 번째 공지',
  '세 번째 공지'
];

let currentNoticeIndex = 0;

function showNotice(index) {
  const noticeContent = document.querySelector('.notice-content');
  noticeContent.textContent = notices[index];
}

document.getElementById('prevNotice').addEventListener('click', () => {
  currentNoticeIndex = (currentNoticeIndex - 1 + notices.length) % notices.length;
  showNotice(currentNoticeIndex);
});

document.getElementById('nextNotice').addEventListener('click', () => {
  currentNoticeIndex = (currentNoticeIndex + 1) % notices.length;
  showNotice(currentNoticeIndex);
});

setInterval(() => {
  currentNoticeIndex = (currentNoticeIndex + 1) % notices.length;
  showNotice(currentNoticeIndex);
}, 4000);

showNotice(currentNoticeIndex);


const rankingList = document.getElementById('rankingList');
const nextRankButton = document.getElementById('nextRank');
let currentRank = 1;

function updateRank() {
  const items = rankingList.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
    if (i === currentRank - 1) {
      items[i].style.display = 'block'; 
    } else {
      items[i].style.display = 'none';
    }
  }
}

nextRankButton.addEventListener('click', () => {
  currentRank = (currentRank % 10) + 1; 
  updateRank();
});


setInterval(() => {
  currentRank = (currentRank % 10) + 1; 
  updateRank();
}, 4000);

updateRank();

document.getElementById('searchButton').addEventListener('click', function() {
  var searchInput = document.getElementById('searchInput').value;
  if (searchInput.trim() !== "") {

    window.location.href = "file:///C:/Users/dbsdu/Desktop/cap/%ED%86%B5%ED%95%A9%EA%B2%80%EC%83%89/search.html";
  }
});

