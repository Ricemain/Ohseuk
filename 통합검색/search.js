document.getElementById('searchButton').addEventListener('click', addSearchTerm);

function addSearchTerm() {
  var searchInput = document.getElementById('searchInput').value;
  if (searchInput.trim() !== "") {
    addToSearchHistory(searchInput);
    addSearchResult(searchInput);
    document.getElementById('searchInput').value = "";
  }
}

function addToSearchHistory(searchTerm) {
  var searchHistory = document.getElementById('searchHistory');
  var newSearchTerm = document.createElement('li');
  
  var termText = document.createElement('span');
  termText.textContent = searchTerm;

  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.className = 'deleteButton';
  deleteButton.onclick = function() {
    searchHistory.removeChild(newSearchTerm);
  };

  newSearchTerm.appendChild(termText);
  newSearchTerm.appendChild(deleteButton);

  searchHistory.appendChild(newSearchTerm);
}

function addSearchResult(searchTerm) {
  var searchResults = document.getElementById('searchResults');
  var resultCard = document.createElement('div');
  resultCard.className = 'result-card';

  var resultTitle = document.createElement('h3');
  resultTitle.textContent = searchTerm + " 관련 복지 제목";

  var resultDescription = document.createElement('p');
  resultDescription.textContent = searchTerm + " 관련 복지에 대한 간단한 설명은 여기에 들어가도록";

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultDescription);

  searchResults.appendChild(resultCard);
}



function getSearchQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('q');
}


function showSearchResults() {
  const searchQuery = getSearchQuery();
  if (searchQuery) {
    
    const searchResults = document.getElementById('searchResults');
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';

    const resultTitle = document.createElement('h3');
    resultTitle.textContent = searchQuery + " 관련 복지 제목";

    const resultDescription = document.createElement('p');
    resultDescription.textContent = searchQuery + " 관련 복지에 대한 간단한 설명은 여기에 들어가도록";

    resultCard.appendChild(resultTitle);
    resultCard.appendChild(resultDescription);

    searchResults.appendChild(resultCard);
  }
}


document.addEventListener('DOMContentLoaded', showSearchResults);

