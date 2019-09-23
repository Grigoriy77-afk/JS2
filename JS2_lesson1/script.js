'use strict';

    const goods = [
        {id: 1, title: `Компьютерная мышь`, price: 400},
        {id: 2, title: `Жесткий диск SSD 1Tb`, price: 10000},
        {id: 3, title: `Материнская плата`, price: 4000},
        {id: 4, title: `Видео карта`, price: 15000},
    ];

    const renderItem = (title, price) =>
        `<div class="item">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
        </div>`;

    const renderList = items => document.querySelector(`.catalog`)
        .innerHTML = items.map(item => renderItem(item.title, item.price)).join(``);

    renderList(goods);