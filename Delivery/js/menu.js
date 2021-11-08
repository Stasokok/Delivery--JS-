const cardsMenu = document.querySelector('.cards-menu');

const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[];

const changeTitle = (restaurant) => {
    const restaurantTitle = document.querySelector('.restaurant-title');
    const restaurantRating = document.querySelector('.rating');
    const restaurantPrice = document.querySelector('.price');
    const restaurantCategory = document.querySelector('.category');

    restaurantTitle.textContent = restaurant.name;
    restaurantRating.textContent = restaurant.stars;
    restaurantPrice.textContent = `От ${restaurant.price} ₽`;
    restaurantCategory.textContent = restaurant.kitchen;

};

// изменение шапки сайта при переходе в магазин

const addToCart = (cartItem) => {
    if (cartArray.some((item) => item.id === cartItem.id)) {
        cartArray.map((item => {
            if (item.id === cartItem.id) {
                item.count++
            }
        }))
    }else {
        cartArray.push(cartItem);
    }
    

    localStorage.setItem('cart', JSON.stringify(cartArray));

};
//добавление итемов в корзину

const renderItems = (data) => {
    data.forEach(({ id, name, description, price, image }) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
						<img src="${image}" alt="${name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
        `;

        div.querySelector('.button-card-text').addEventListener('click', () => {
            const cartItem = {
                name: name,
                id: id,
                price: price,
                count: 1
            };

            addToCart(cartItem);
        })

        cardsMenu.append(div);
    });
};

// Создание блоков на странице и замена названий из БД

if (localStorage.getItem('restaurant')) {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'));

    changeTitle(restaurant);

    fetch(`./db/${restaurant.products}`)
    .then((response) => response.json())
    .then((data) => {
        renderItems(data)
    })
    .catch((error) => {
        console.log(error);
    });
} else {
    window.location.href = '/';
}
