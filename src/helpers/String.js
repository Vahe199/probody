export function formatPrice(p) {
    return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
