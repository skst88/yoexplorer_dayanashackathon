export const calcSubPrice = (product) => {
    return product.count * product.picture.price
}
export const calcTotalPrice = (cart) => {
    let sum = 0
    cart.pictures.forEach(element => {
        sum += element.subPrice
    });
    return sum
}