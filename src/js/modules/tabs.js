// Передаются селекторы, создаются табы
const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);

    // Ф-ия скрывает контент
    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });

        // Уберет классы активности у ненужных табов
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    };
    // Ф-ия показывает контент
    function showTabContent(i = 0) {
        content[i].style.display = 'block';
        tab[i].classList.add(activeClass);
    };

    // Вызвать и показать контент, если нужно начать с 3го эл-та, передаем аргумент соответственно
    hideTabContent();
    showTabContent();

    // Отследит, какой таб кликнул пользователь
    header.addEventListener('click', (e) => {
        const target = e.target;
        // Проверка на правильность клика на класс таба
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) // Уберет точку из класса, чтобы был селектор
                || target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) { // Или у родительского класса
            tab.forEach((item, i) => { // На какой именно эл-т был клик и вытащить из него i - номер этого таба
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });
};

export default tabs;