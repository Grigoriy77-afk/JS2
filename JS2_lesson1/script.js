'use strict';

    class ItemsList {    //Список товаров
        constructor () {
            this.items = [];
        }

        fetchItems () {
            this.items = [
                {id: 1, title: `Компьютерная мышь`, price: 400},
                {id: 2, title: `Жесткий диск SSD 1Tb`, price: 10000},
                {id: 3, title: `Материнская плата`, price: 4000},
                {id: 4, title: `Видео карта`, price: 15000},
            ];
        }

        total() {
            return  this.items.reduce((sum, current) => sum + current.price);
         }

        render () {
            return this.items.map((item) => new Item (item.title, item.price).render()).join(``);
        }
    }


    class Item {
        constructor (title, price) {
            this.title = title;
            this.price = price;
        }
        render () {
            return `<div class="item">
                    <img src="https://place-hold.it/300x100" alt="plug">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="by-btn">Добавить</button></div>`
        }
    }

    const items = new ItemsList();
    items.fetchItems();

    document.querySelector(`.catalog`).innerHTML = items.render();

                             //Классы для корзины
    class CartList {
        constructor() {
            this.goods = [];
        }


        fetchGoods() {
            this.goods = [
                {id: 1, title: `Компьютерная мышь`, price: 400},
                {id: 2, title: `Жесткий диск SSD 1Tb`, price: 10000},
                {id: 3, title: `Материнская плата`, price: 4000},
                {id: 4, title: `Видео карта`, price: 15000},
            ];
        }

        render() {
            return this.goods.map((good) => new Good(good.title, good.price).render()).join(``);
        }
    }

    class Good {
        constructor (title, price) {
            this.title = title;
            this.price = price;
        }
        render () {
            return `<div class="good">
                        <img src="https://place-hold.it/300x100" alt="plug">
                        <h3>${this.title}</h3>
                        <p>${this.price}</p>
                        <button class="by-btn">Купиить</button></div>`
        }
    }



    /*
    const goods = [
        {id: 1, title: `Компьютерная мышь`, price: 400},
        {id: 2, title: `Жесткий диск SSD 1Tb`, price: 10000},
        {id: 3, title: `Материнская плата`, price: 4000},
        {id: 4, title: `Видео карта`, price: 15000},
    ];

    const renderItem = (title, price, ...args) =>
        `<div class="item">
            <img src="https://place-hold.it/300x100" alt="plug">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
        </div>`;

    const renderList = items => document.querySelector(`.catalog`)
        .innerHTML = items.map(item => renderItem(item.title, item.price,)).join(``);

    renderList(goods);
     */