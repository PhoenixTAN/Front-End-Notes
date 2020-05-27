var googleAppsIcon = document.getElementById("head-right-google-apps");
var googleAppsModal = document.getElementById("apps-modal");
var setting = document.getElementById("setting");
var settingPopupModal = document.getElementById("setting-floating-popup-modal");
var searchTextBox = document.getElementById("search-text");
var searchBarWrap = document.getElementsByClassName("search-bar-wrap")[0];

/* EventListener */
googleAppsIcon.addEventListener("click", showGoogleApps); 
setting.addEventListener("click", showSettingPopup)
document.addEventListener("click", clearPopup);
searchTextBox.addEventListener("focus", showSearchPopup);


function clearPopup(event) {
    if ( event.target == googleAppsModal ) {
        googleAppsModal.style.display = "none";
    }
    if ( event.target == settingPopupModal ) {
        settingPopupModal.style.display = "none";
    }
}

function showGoogleApps() {
   googleAppsModal.style.display = "block";
}

function showSettingPopup() {
    settingPopupModal.style.display = "block";

}

/* Event listener for search text */
var isBlur = false;
function showSearchPopup() {
    var searchPopup = document.getElementById("search-floating-popup");
    searchPopup.style.display = "block";
    
    var searchBarWrap = document.getElementsByClassName("search-bar-wrap")[0];
    searchBarWrap.style.borderRadius = "24px 24px 0 0";
    isBlur = false;

    searchBarWrap.style.boxShadow = "0 1px 3px 1px rgba(60,64,67,.30)";
    searchBarWrap.removeEventListener("mouseout", hideSearchBarShadow);

}

searchTextBox.addEventListener("blur", function() {
    isBlur = true;
});


document.onclick = function clearSearchPopup(event) {

    var clientX = event.clientX;
    var clientY = event.clientY;

    var searchPopup = document.getElementById("search-floating-popup");
    var position = searchPopup.getBoundingClientRect();

    if ( isBlur && (clientX < position.left || clientX > position.right || 
        clientY > position.bottom || clientY < position.top) ) {
        
        searchPopup.style.display = "none";     
        searchBarWrap.style.borderRadius = "24px";
        searchBarWrap.style.boxShadow = "none";
        searchBarWrap.addEventListener("mouseover", showSearchBarShadow);
    }
}

/* mouseover for search box */
searchBarWrap.addEventListener("mouseover", showSearchBarShadow);
function showSearchBarShadow() {
    /* offset-x | offset-y | blur-radius | spread-radius | color */ 
    searchBarWrap.style.boxShadow = "0 1px 3px 1px rgba(60,64,67,.30)";
}

searchBarWrap.addEventListener("mouseout", hideSearchBarShadow);
function hideSearchBarShadow() {
    searchBarWrap.style.boxShadow = "none";
}

