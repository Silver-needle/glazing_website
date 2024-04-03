import checkNumInputs from "./checkNumInputs";

// Формы собирают информацию внутри себя и отправляют на сервер
const forms = (state) => {
    const form = document.querySelectorAll('form'),
        // Очищать все инпуты после того, как инфа отправлена на сервер
        inputs = document.querySelectorAll('input');

    // Проверка на тип данных
    checkNumInputs('input[name="user_phone"]');

    // Объект с оповещениями для пользователя 
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро свяжемся с вами.',
        failure: 'Возникла непредвиденная ошибка.'
    };

    //  Ф-ия скрывает часть реализации. Получив промис, обрабатываем до нужного 
    // формата. Получает аргументы: адрес для отправки запроса и данные, уходящие на сервер.
    // Т.к. fetch асинхронный, через async и await, происходит ожидание окончание работы fetch 
    // и тогда получим результат res. 
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        // res будет возвращен с сервера в текстовом формате и асинхронным, поэтому тоже await
        return await res.text();
    };

    // Ф-я очистит инпуты, заменив знач-я пустой строкой
    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    };

    // Перебирает все формы, навешивает обработчик события submit
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            // Отмена стандартного поведения браузера, чтобы данные из формы уходили без перезагрузки страницы
            e.preventDefault();

            // Создание блока для сообщения в объекте message с добавлением класса status
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            // Помещение блока сообщения в конец формы
            item.appendChild(statusMessage);

            // Создание объекта, который объединит в себе все данные из формы
            const formData = new FormData(item);
            // Если у формы есть атрибут, добавит ключ-значения
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            // Ф-ия принимает данные, отправляет на сервер и выводит сообщение для пользователя соответственно им
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })

                // Обработка ошибки
                .catch(() => statusMessage.textContent = message.failure)
                // Ф-я очистит инпуты и уберет сообщение статуса через 5 сек.
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });

};

export default forms;