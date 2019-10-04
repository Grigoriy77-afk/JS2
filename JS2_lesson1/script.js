'use strict';

    function sendRequest (url) {
        return new Promise((resolve, reject) => { //Создаем новый объект "promis" c помощью "new" и встроен. класса Promise
            const xhr = new  XMLHttpRequest();            //встроенные функции, чтобы переводить promise из одного
            xhr.open(`GET`, url);                         // состояния в другое (из pending => fulfiled || rejected)
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject();     //Если что-то пошло не так
                    }
                    const users = JSON.parse(xhr.responseText);

                    resolve (users);  //Если всё верно
                }
            };
            xhr.send();
        });
    }

    class ItemsList {    //Список товаров
        constructor () {
            this.items = [];
        }

        fetchItems () {
            return sendRequest(`/goods`).then((items) => {
                this.items = items;  //Получаем с сервера
            });
        }


        total() {
            return  this.items.reduce((sum, item) => sum + item.price, 0);
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
    items.fetchItems().then(() => {      //then, чтобы дождаться ответа сервера
        document.querySelector(`.catalog`).innerHTML = items.render();
    });



    document.querySelector(`.total`).innerHTML = `Общая стоимость товаров составляет: ${items.total()}`;

                             //Классы для корзины
    class CartList {
        constructor() {
            this.goods = [];
        }

        fetchGoods () {
            return sendRequest(`/cart`).then((goods) => {
                this.goods = goods;  //Получаем с сервера
            });
        }


        total() {
            let total = 0;
            for (let i = 0; i < this.goods.length; i++) {
                total = total + this.goods [i].price * this.goods [i].quantity;
            }
            return total;
        }

        render() {
            return this.goods.map((good) => new Good(good.title, good.price).render()).join(``);
        }
    }

    class Good {
        constructor (title, price, quantity) {
            this.title = title;
            this.price = price;
            this.quantity = quantity;
        }
        render () {
            return `<div class="good">
                        <img src="https://place-hold.it/300x100" alt="plug">
                        <h3>${this.title}</h3>
                        <p>${this.price}</p>
                        <button class="by-btn">Купиить</button></div>`
        }

        sum(){
            return this.price * this.quantity;
        }
    }

    const carts = new CartList();
    items.fetchGoods().then(() => {      //then, чтобы дождаться ответа сервера
        document.querySelector(`.cart`).innerHTML = items.render();
    });



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