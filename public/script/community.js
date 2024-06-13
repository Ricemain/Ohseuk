function showTab(tabName) {
  var i;
  var tabContent = document.getElementsByClassName("tab-content");
  var tabButtons = document.getElementsByClassName("tab-button");

  for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
  }
  for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active"); 
  }

  document.getElementById(tabName).style.display = "block"; 
  // event.currentTarget.classList.add("active"); 
}


document.addEventListener("DOMContentLoaded", function() {
  var myMeetingsButton = document.querySelector('.tab-button.active');
  if (myMeetingsButton) {
      myMeetingsButton.classList.remove('active');
  }
  document.querySelector('.tab-button').classList.add('active');
  showTab('myMeetings');
});

function goToAnotherPage() {
  window.location.href = 'http://localhost:3000/community/class';
}

function goToInPage() {
  window.location.href = 'http://localhost:3000/community/myCommunity';
}

function goToOtherPage(){
  window.location.href = 'http://localhost:3000/community/otherCommunity';
}



