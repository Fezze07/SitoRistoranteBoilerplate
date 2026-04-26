/**
 * Checks if the special menu should be visible based on its expiry date.
 * @param {Object} menuData - The special menu data object.
 * @returns {boolean} - True if the menu is still valid, false otherwise.
 */
export function isSpecialMenuVisible(menuData) {
  if (!menuData || !menuData.expiryDate) {
    return false
  }

  const expiry = new Date(menuData.expiryDate)
  const now = new Date()

  return now <= expiry
}
