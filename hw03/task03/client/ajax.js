setInterval(() => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            
            try {
                var data = JSON.parse(xhr.responseText);
            } catch(err) {
                console.log(err.message + " in " + xhr.responseText);
                return;
            }
            
            document.getElementById("text").innerHTML = data.content;
            document.getElementById("author").innerHTML = data.author;
        }
    };
    xhr.open("GET", 'http://localhost:8080/', true);
    xhr.send();

}, 3000);