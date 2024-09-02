document.addEventListener('DOMContentLoaded', function () {
    document
        .querySelector('button[type=submit]')
        .addEventListener('click', function (event) {
            event.preventDefault();
            // получаем элемент формы
            const form = this.form;
            // создаем объект данных формы
            const data = new FormData(form);

            // получаем url-адрес на которые будем отправлять запрос
            const url = form.action;
            // отправляем запрос
            fetch(url, {
                method: 'POST',
                body: data,
            })
                .then(response => response.json())
                .then(r => {
                    let st = document.querySelector('#status');
                    let ln = document.querySelector('#lines');
                    if (r.result) {
                        st.style.background = "green";
                        for (let i of r.lines) {
                            let  el = document.createElement('div');
                            el.textContent = i;
                            el.style.paddingBottom = '5px';
                            el.style.borderBottom = '1px solid rgba(1,1,1,.4)'
                            ln.appendChild(el)
                        }
                    } else {
                        st.style.background = "red";
                    }
                });
        });
});