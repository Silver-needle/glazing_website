import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    // Валидация данных
    checkNumInputs('#width');
    checkNumInputs('#height');

    // Ф-я будет проверять кол-во входящих элементов (псевдомассивов ), если =1 навесит на него обработчик события, иначе
    // запустит код
    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                // Строка будет оределять входящую ноду
                switch (item.nodeName) {
                    // Если клик на изображение
                    case 'SPAN':
                        // В prop запишется его номер, соответствующий типу балкона
                        state[prop] = i;
                        break;
                    // 
                    case 'INPUT':
                        // Условие выполнится при клике на один из двух чекбоксов
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            // Убирает галочки со всех чекбоксов, кроме того, на который был клик
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            // Берет значение из инпута
                            state[prop] = item.value;
                        }
                        break;
                    // Берет значение из селекта
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;