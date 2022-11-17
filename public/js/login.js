form.addEventListener("submit", () => {
    console.log("submit login");
    const login = {
        email: email.value,
        password: password.value
    }
    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(async res => {
        console.log(res);
        data = await res.json();
        if(data.status == "error") {
            succes.style.display = "none"
            error.style.display= "block"
            error.innerText = data.message
        } else {
            error.style.display = "none"
            succes.style.display= "block"
            succes.innerText = data.message
        }

        setTimeout(function(){
            location.href = "/profile"
        },1000);

        })
})