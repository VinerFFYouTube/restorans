import { useState } from "react";
import sushiImage from "../../assets/images/menu/sushi.jpg";
import sezarImage from "../../assets/images/menu/salat_cezar.jpg";
import supImage from "../../assets/images/menu/sup_tomat.jpg";
import shashlukImage from "../../assets/images/menu/shashluk.jpg";
import morsImage from "../../assets/images/menu/mors.jpg";
import ruletImage from "../../assets/images/menu/rulet.jpg";

import PaymentMethod from "../PaymentMethod/PaymentMethod";
import "./Menu.css"; // Подключаем кастомные стили

const menuObj = [
    { name: "суши", price: 500, image: sushiImage, category: 'легкая еда' },
    { name: "Цезарь", price: 350, image: sezarImage, category: 'салаты' },
    { name: "Суп Томатный", price: 200, image: supImage, category: 'жидкое блюдо' },
    { name: "Шашлык", price: 700, image: shashlukImage, category: 'шашлыки' },
    { name: "Морс", price: 100, image: morsImage, category: "напитки" },
    { name: "рулет", price: 150, image: ruletImage, category: "десерт" },
];

type Menus = {
    name: string;
    price: number;
    quantity: number;
}

type Users = {
    names: string;
    phones: string;
    addres: string;
    isPhoneValid: boolean;
}

const Menu = ({ names, phones, addres, isPhoneValid }: Users) => {
    const [menu, setMenu] = useState<Menus[]>([]);

    let allPrice: number = 0;
    menu.forEach((prices) => {
        allPrice += prices.price * prices.quantity;
    });

    const addToMenu = (name: string, price: number, quantity: number) => {
        const newMenu = [...menu];
        newMenu.push({ name, price, quantity });
        setMenu(newMenu);
    };

    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <section id="filter" className="filter-section">
                <button className={`filter-btn ${selectedCategory === "легкая еда" ? "active" : ""}`} 
                        onClick={() => handleCategoryChange("легкая еда")}>Легкая еда</button>
                <button className={`filter-btn ${selectedCategory === "шашлыки" ? "active" : ""}`} 
                        onClick={() => handleCategoryChange("шашлыки")}>Шашлык</button>
                <button className={`filter-btn ${selectedCategory === "десерт" ? "active" : ""}`} 
                        onClick={() => handleCategoryChange("десерт")}>Десерт</button>
                <button className={`filter-btn ${selectedCategory === "напитки" ? "active" : ""}`} 
                        onClick={() => handleCategoryChange("напитки")}>Напитки</button>
                <button className={`filter-btn ${selectedCategory === "" ? "active" : ""}`} 
                        onClick={() => handleCategoryChange("")}>Все</button>
            </section>

            <section id="menu-items" className="menu-section">
                <div className="menu-container">
                    {menuObj
                        .filter(dish => selectedCategory === "" || dish.category === selectedCategory)
                        .map((dish, index) => (
                            <div key={`${dish.name}-${index}`} className="menu-item">
                                <img src={dish.image} alt={dish.name} className="menu-item-image" />
                                <div className="menu-item-details">
                                    <h3 className="menu-item-name">{dish.name}</h3>
                                    <p className="menu-item-price">Цена: {dish.price} сом</p>
                                    <input type="number" id={`quantity${index}`} defaultValue="1" min="1" className="quantity-input" />
                                    <button className="add-btn" 
                                            onClick={() => {
                                                const quantity = document.getElementById(`quantity${index}`) as HTMLInputElement;
                                                addToMenu(dish.name, dish.price, parseInt(quantity.value, 10));
                                            }}>
                                        Добавить в заказ
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            <section id="order-summary" className="order-summary">
                <h2>Ваш заказ</h2>
                <ul id="order-list">
                    {menu.map((item, index) => (
                        <li key={`${item.name}-${index}`} className="order-item">
                            {item.name}: {item.quantity} - {item.price * item.quantity} сом
                            <hr />
                        </li>
                    ))}
                </ul>
                <p>Итоговая сумма: <span id="total-price">{allPrice}</span> сом</p>
            </section>

            <PaymentMethod 
                allPrices={allPrice} 
                userName={names} 
                userNumber={phones} 
                userAddres={addres} 
                wholeOrder={menu} 
                isPhoneValid={isPhoneValid} 
            />
        </>
    );
};

export default Menu;
