import { useState } from "react";
import Menu from "../Menu/Menu";


const OrderDetails = () => {
    const [inputName, setName] = useState('');
    const [inputPhone, setPhone] = useState('');
    const [inputAddress, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const numberLimitFunction = (value: string) => {
        const sanitizedValue = value.replace(/\D/g, "");

        if (sanitizedValue.length > 12) {
            setErrorMessage("Номер телефона не может быть длиннее 12 цифр.");
            setIsPhoneValid(false);
        } else if (sanitizedValue.length < 9) {
            setErrorMessage("Номер телефона должен содержать минимум 9 цифр.");
            setIsPhoneValid(false);
        } else {
            setErrorMessage("");
            setIsPhoneValid(true);
        }

        setPhone(sanitizedValue);
    };
    return (
        <>
            <header>
                <h1>Заказ из кафе "Вкусный уголок"</h1>
            </header>

            <section id="contact-info" className="form-section">
                <h2>Ваши контактные данные</h2>
                <input maxLength={15} type="text" id="first-name" placeholder="Ваше имя" required onChange={(e) => setName(e.target.value)} />
                <input type="number" id="phone" placeholder="Ваш номер телефона" required onChange={(e) => numberLimitFunction(e.target.value)} />
                {errorMessage && <p style={{color: 'red'}} className="error-message">{errorMessage}</p>}
                <input maxLength={30} type="text" id="address" placeholder="Ваш адрес для доставки" required onChange={(e) => setAddress(e.target.value)} />
            </section>
            <Menu names={inputName} phones={inputPhone} addres={inputAddress} isPhoneValid={isPhoneValid} />
        </>
    );
};

export default OrderDetails;
