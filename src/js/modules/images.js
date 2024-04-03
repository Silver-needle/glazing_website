// Ф-я открывает миниатюры раздела Наши работы с фоновой подложкой и увеличением
const images = () => {
    // Создание модального окна
    const imgPopup = document.createElement('div'),
        // Общий блок для всех изображений
        workSection = document.querySelector('.works'),
        // Крупное изображение
        bigImage = document.createElement('img');

    // Добавит класс popup
    imgPopup.classList.add('popup');
    // Секция для отображения изображения на странице
    workSection.appendChild(imgPopup);

    // Центрирование изображения при помощи инлайн стилей
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    // Помещает крупное изображение в окно
    imgPopup.appendChild(bigImage);

    // Ф-я назначает обработчик события
    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        // Проверка, поддерживается ли событие click и есть ли в эл-те класс preview
        if (target && target.classList.contains('preview')) {
            // Покажет модальное окно
            imgPopup.style.display = 'flex';
            // Покажет картинку, на которую был клик 
            const path = target.parentNode.getAttribute('href');
            // Берет изображение из модального окна, устанавливает src в позицию path 
            bigImage.setAttribute('src', path);
        }

        // При клике на подложку, модальное окно будет закрываться
        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';
        }
    });
};

export default images;