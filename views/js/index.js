const searchBar = document.getElementById('searchBar');

document.getElementById('meniu').addEventListener('click', ()=> {
    console.log("apasat");
    if(document.querySelector('nav ul').style.display == 'none')
    document.querySelector('nav ul').style.display = 'block';
    else
    document.querySelector('nav ul').style.display = 'none';
})

if (window.location.toString().includes("login")) {
    searchBar.parentElement.style.display = 'none';
    document.querySelector('form').style.display = 'block';
  }
  else {
    searchBar.parentElement.style.display = 'block';
    document.querySelector('form').style.display = 'none';
  }