document.getElementById('meniu').addEventListener('click', ()=> {
    console.log("apasat");
    if(document.querySelector('nav ul').style.display == 'none')
    document.querySelector('nav ul').style.display = 'block';
    else
    document.querySelector('nav ul').style.display = 'none';
})

if (window.location.href.indexOf("blog") > -1) {
    document.getElementById('blog-link').style.color = '#25DAC4';
    document.getElementById('home-link').style.color = 'whitesmoke';
    document.getElementById('search-link').style.color = 'whitesmoke';
  }
  if (window.location.href.indexOf("search") > -1) {
    document.getElementById('search-link').style.color = '#25DAC4';
    document.getElementById('home-link').style.color = 'whitesmoke';
    document.getElementById('blog-link').style.color = 'whitesmoke';
  }
