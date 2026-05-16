/**
 * Returns an array of visible special menus based on their expiry date.
 * @param {Object|Array} menuData - The special menu data object or array.
 * @returns {Array} - Array of valid special menus.
 */
export function getVisibleSpecialMenus(menuData) {
  if (!menuData) return [];
  const menus = Array.isArray(menuData) ? menuData : [menuData];
  const now = new Date();
  
  return menus.filter(menu => {
    // Se hasExpiry è esplicitamente false, il menu è sempre visibile
    if (menu.hasExpiry === false) return true;
    
    // Altrimenti controlliamo la data di scadenza
    if (!menu || !menu.expiryDate) return false;
    const expiry = new Date(menu.expiryDate);
    return now <= expiry;
  });
}

/**
 * Checks if there is at least one visible special menu.
 * @param {Object|Array} menuData - The special menu data object or array.
 * @returns {boolean} - True if at least one menu is valid, false otherwise.
 */
export function isSpecialMenuVisible(menuData) {
  return getVisibleSpecialMenus(menuData).length > 0;
}
