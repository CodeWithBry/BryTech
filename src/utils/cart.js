export function getDeliveryDate() {
  const date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  return date.toLocaleString('default', { month: 'long', day: 'numeric' });
}

export function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
  } catch {
    return [];
  }
}

export function saveCart(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

export function addItemToCart(prev, newItem) {
  const exists = prev.find(item => item.name === newItem.name);
  let updated;
  if (exists) {
    updated = prev.map(item =>
      item.name === newItem.name ? { ...item, count: item.count + 1 } : item
    );
  } else {
    updated = [{ ...newItem, count: 1, isSelected: false, status: 'Cart', dateDeliver: getDeliveryDate() }, ...prev];
  }
  saveCart(updated);
  return updated;
}
