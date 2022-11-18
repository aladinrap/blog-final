document.getElementById('meniu').addEventListener('click', ()=> {
    console.log("apasat");
    if(document.querySelector('nav ul').style.display == 'none')
    document.querySelector('nav ul').style.display = 'block';
    else
    document.querySelector('nav ul').style.display = 'none';
})

