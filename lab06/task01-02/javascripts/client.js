setInterval(function () {
   jQuery.ajax({
       'type': 'POST',
       'url': '/ajaxservice/get',
       'data': {'from': 101, 'to': 102, 'message': 'bla­bla..'},
       'cache': false,
       'success': function (mess) {
                if (mess) {
                    let [mes1, mes2] = mess;
                    contener.innerHTML += `${mes1.name} said ${mes1.data}, ${mes2.name} said ${mes2.data}<br>`;
                }
         }})
}, 4000);
