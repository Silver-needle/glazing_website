// Ф-я запускает таймер обратного отсчета на странице
const timer = (id, deadline) => {
    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };
    // Ф-я получает дату дедлайна, вычисляет кол-во секунд, минут и дней до конца акции
    const getTimeRemaining = (endtime) => {
        // Определит разницу м-ду дедлайном и нынешним временем
        const t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            days = Math.floor((t / (1000 * 60 * 60 * 24)));

        // Возвращает объект
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    // Ф-я помещает определенные значения в эл-ты страницы по id
    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        // Ф-я определяет кол-во времени до дедлайна и каждую секунду возвращает актуальное значение
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                // Остановит интервал
                clearInterval(timeInterval);
            }
        }
    };

    setClock(id, deadline);
};

export default timer;