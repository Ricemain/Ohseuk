document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const textBox = document.querySelector('.text');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.getAttribute('data-text');
      textBox.textContent = text;

      
      menuItems.forEach(menu => {
        menu.classList.remove('active');
      });

      
      item.classList.add('active');
    });
  });

 
  const showQualifications = () => {
    const qualificationInfo = document.getElementById("qualificationInfo");
    qualificationInfo.innerHTML = `
      <p style="text-align: left; font-weight: bold; font-size: 30px;">지원대상</p>
      <ul style="list-style-type: disc; padding-left: 20px; text-align: left; font-size: 25px;">
        <li>돌봄서비스가 필요한 65세 이상</li>
        <li>국민기초생활 수급자</li>
        <li>차상위 계층 또는 기초연금수급자로서 유사 중복사업 자격에 해당되지 않는자</li>
      </ul>
    `;
  };


  const qualificationButton = document.getElementById("qualificationButton");
  qualificationButton.addEventListener("click", showQualifications);

  const showMethods = () => {
    const methodInfo = document.getElementById("qualificationInfo");
    methodInfo.innerHTML = `
      <p style="text-align: left; font-weight: bold; font-size: 30px;">신청방법</p>
      <ul style="list-style-type: disc; padding-left: 20px; text-align: left; font-size: 25px;">
        <li>방문신청: 신청자의 주민등록상 주소지의 읍 면 동 행정복지센터에 방문하여 신청</li>
        <li>전화, 우편, 팩스, 온라인신청: 부득이한 사유로 직접 방문이 불가능할 경우 전화, 우편, 팩스 또는 온라인으로도 신청 가능</li>
      </ul>
    `;
  };


  const methodButton = document.getElementById("methodButton");
  methodButton.addEventListener("click", showMethods);
  const reviewButton = document.getElementById("reviewButton");
  reviewButton.addEventListener("click", showReviews);

  const showReviews = () => {
    const reviewInfo = document.getElementById("qualificationInfo");
    reviewInfo.innerHTML = `
      <div>
        <p style="text-align: center; font-weight: bold; font-size: 18px;">인기순 | 최신순</p>
        <div class="reviews">
          <div class="review">

            <div class="review-content">
              <p class="nickname">사용자1</p>
              <p class="rating">★★★★★</p>
              <p class="comment">리뷰 내용...</p>
            </div>
          </div>
          
          <!-- 리뷰항목은 일단 여기에 추가 -->
        </div>
      </div>
    `;
  };


  


  showQualifications();
  qualificationButton.classList.add('active');
});
