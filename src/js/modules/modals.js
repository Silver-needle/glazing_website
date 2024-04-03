// Алгоритм для модальных окон
const modals = () => {
    // Ф-я отвечает за привязку модального окна к определенному триггеру
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        // Чтобы повесить один селектор на разные эл-ты через передачу псевдомассива
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            // Переменная для получения всех модальных окон со страницы, чтобы закрывать все, кроме активных
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {
            // На каждый из переданных эл-тов действует ф-ия
            item.addEventListener('click', (e) => {
                // Т.к. триггером иногда является ссылка, отменить стандартное поведение браузера,
                // заодно tаrget проверит эл-т на существование
                if (e.target) {
                    e.preventDefault();
                }

                // Перебираем массив, с переданной коллбэк-функцией
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                // Указан блочный эл-т, передаваемый в ф-ию
                modal.style.display = "block";
                // Чтобы при открытом модальном окне заморозить страницу
                document.body.style.overflow = "hidden";
                // Добавит margin-right нужной ширины для стабильного положения модальных окон
                document.body.style.marginRight = `${scroll}px`;
                //document.body.classList.add('modal-open');
            });
        });
        // Навесим обработчик события при закрытии и ф-ию закрытия всех мод. окон при клике на крестик.
        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            // Операция закрытия модального окна
            modal.style.display = "none";
            document.body.style.overflow = "";
            // Уберет отступ при закрытии модального окна
            document.body.style.marginRight = `0px`;
            //Класс из библиотеки document.body.classList.remove('modal-open');

        });

        // Навесим еще один обработчик с анонимной ф-ей
        modal.addEventListener('click', (e) => {
            // При клике на область за модальным окном, повторим событие его закрытия 
            // и добавим ф-ию закрытия всех мод. окон при клике на подложку.
            // Используем аргумент closeClickOverlay = true/false для формирования цепочки
            // мод. окон при расчете стоимости
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                // Уберет отступ при закрытии модального окна
                document.body.style.marginRight = `0px`;
                //document.body.classList.remove('modal-open');
            }

        })
    }

    // Если пользователь на странице более 60 сек, отрытие мод. окна
    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
        }, time);
    }

    // Ф-я обеспечит стабильное положение модальных окон при открытии  путем добавления margin
    // поведение будет корректным вне зависимости от браузера, т.к. реализован 
    // подсчет расстояния в пикселях
    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        // Разность полной ширины и контента без прокрутки, чтобы определить ширину прокрутки
        // в конкретном браузере
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        // Возвращает ширину прокрутки
        return scrollWidth
    }
    // Запуск функций с необходимыми селекторами
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    showModalByTime('.popup', 60000);
};

export default modals;