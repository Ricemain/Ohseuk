

document.addEventListener("DOMContentLoaded", function() {
    const resultsContainer = document.getElementById('resultsContainer');

    function createSmallBox(content) {
        const smallBox = document.createElement('div');
        smallBox.classList.add('small-box');
        
        smallBox.innerHTML = `
            <p class="small-text"><strong>${content.title}</strong><br><br>
            ${content.description}<br><br></p>
            <div class="button-small">
                <button class="details">자세히</button>
                <button class="application">신청</button>
            </div>
        `;
        
        return smallBox;
    }


    const data = [
        { title: '노인 맞춤 돌봄 서비스', description: '일상생활 영위가 어려운 취약 노인에게 적절한 돌봄 서비스를 제공합니다' },
        { title: '다른 서비스', description: '다른 서비스의 설명' }
    ];

    data.forEach(item => {
        const smallBox = createSmallBox(item);
        resultsContainer.appendChild(smallBox);
    });


    const detailButtons = document.querySelectorAll('.details');

    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextPageUrl = 'file:///C:/Users/dbsdu/Desktop/cap/%EB%85%B8%EC%9D%B8%EB%A7%9E%EC%B6%A4%EB%8F%8C%EB%B4%84/old.html';
            window.location.href = nextPageUrl;
        });
    });
});