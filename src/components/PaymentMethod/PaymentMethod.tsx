import { useState } from "react";

type Prices = {
    allPrices: number;
    userName: string;
    userNumber: string;
    userAddres: string;
    wholeOrder: Array<{ name: string; price: number; quantity: number }>;
    isPhoneValid: boolean;
}

const PaymentMethod = ({ allPrices, userName, userNumber, userAddres, wholeOrder, isPhoneValid }: Prices) => {

    // const [paymentMethod, setPaymentMethod] = useState<string>('');
    // const [cashOrCart, setCashOrCart] = useState<boolean | undefined>(undefined);
    // const [change, setChange] = useState<string>('');

    // const togglePaymentForm = (typePay: string) => {
    //     if (typePay === 'cash') {
    //         setPaymentMethod('cash')
    //     } else {
    //         setPaymentMethod('card')
    //     }
    // }

    // const priceCounter = (inputCash: number) => {
    //     const parseInputCash = +inputCash;
    //     if (parseInputCash < allPrices) {
    //         setCashOrCart(false)
    //         setChange('ваша сумма не соотвествует сумме заказа');
    //     } else if (parseInputCash > allPrices) {
    //         setCashOrCart(true);
    //         setChange(`ваша сдача: ${inputCash - allPrices}`);
    //     }
    // }

    const handleSetOrder = () => {
        let dataMessage = new Date();
        if (userName.trim() && userNumber.trim() && userAddres.trim()) {
            let allMessages = `Заказ от ${userName}:\nдата заказа: ${dataMessage.toLocaleDateString()}\n`

            wholeOrder.forEach(item => {
                allMessages += `${item.name} x ${item.quantity} = ${item.price * item.quantity} сом\n`
            });


            allMessages += `\nИтоговая сумма: ${allPrices} сом\n`;

            // allMessages += `Способ оплаты: ${paymentMethod === 'cash' ? 'наличные' : 'mbank'} \n`;

            // if (paymentMethod === 'cash' && cashOrCart && wholeOrder !== null) {
            //     allMessages += `${change} сом\n`
            // }

            allMessages += `\nКонтактные данные\n`
            allMessages += `Имя: ${userName}\n`
            allMessages += `Номер телефона: ${userNumber}\n`
            allMessages += `Адрес доставки: ${userAddres}\n`

            const numberCafe = '996999577020';
            const whatsappUrl = `https://wa.me/${numberCafe}?text=${encodeURIComponent(allMessages)}`;
            window.open(whatsappUrl, "_blank");
        }

    }



    return (
        <>
            {/* <section id="payment-method" className="payment-method">
                <h2>Выберите способ оплаты</h2>
                <label>
                    <input id="cash" type="radio" name="payment" value="cash" onClick={() => togglePaymentForm('cash')} />
                    <label htmlFor="cash">наличные</label>
                </label>
                <label>
                    <input id="cart" type="radio" name="payment" value="card" onClick={() => togglePaymentForm('card')} />
                    <label htmlFor="cart">mbank</label>
                </label>
            </section>

            {paymentMethod === 'cash' && (
                <section id="cash-payment">
                    <h2>Введите сумму, на которую нужно дать сдачи</h2>
                    <input
                        type="number"
                        id="cash-amount"
                        placeholder="Сумма сдачи"
                        onChange={(e) => priceCounter(parseFloat(e.target.value))}
                    />
                    <p id="change-info">{change}</p>
                </section>
            )} */}

            <section id="submit-order">
                {(!userName.trim() || !userNumber.trim() || !userAddres.trim()) && <p style={{ textAlign: "center", color: 'red' }}>Вы не заполнили все данные</p>}
                <button disabled={!isPhoneValid} id="send-whatsapp" onClick={() => { handleSetOrder() }}>Отправить заказ</button>
            </section>
        </>
    )
}

export default PaymentMethod;