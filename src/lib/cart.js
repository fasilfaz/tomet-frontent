export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(0);
}

export const updateCart = state => {
    // Correct the itemsPrice calculation
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + Number(item.price) * item.qty, 0));
    state.shippingPrice = addDecimals(state.itemsPrice >= 500 ? 0 : 50);
    state.taxPrice = addDecimals(Number((0.01 * state.itemsPrice).toFixed(0)));
    state.totalPrice = Number(
        (Number(state.itemsPrice) + 
        Number(state.shippingPrice) + 
        Number(state.taxPrice))
    ).toFixed(0);
    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}
