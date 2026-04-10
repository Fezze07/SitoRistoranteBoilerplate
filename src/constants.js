/**
 * Centralize all environment variables for the project.
 * handles the logic for building composite strings (like WhatsApp or tel links).
 */

const getEnv = (key, fallback = '') => import.meta.env[key] || fallback

export const WHATSAPP_NUMBER = getEnv('VITE_WHATSAPP_NUMBER')
export const PHONE_NUMBER_RAW = getEnv('VITE_PHONE_NUMBER')
export const CONTACT_EMAIL = getEnv('VITE_CONTACT_EMAIL')

export const ADDRESS_LINE1 = getEnv('VITE_ADDRESS_LINE1')
export const ADDRESS_LINE2 = getEnv('VITE_ADDRESS_LINE2')

export const MAPS_LINK = getEnv('VITE_MAPS_LINK')
export const MAPS_EMBED_URL = getEnv('VITE_MAPS_EMBED_URL')

export const FACEBOOK_URL = getEnv('VITE_FACEBOOK_URL')
export const INSTAGRAM_URL = getEnv('VITE_INSTAGRAM_URL')

// Generated URLs
export const WHATSAPP_URL = `https://wa.me/39${WHATSAPP_NUMBER}?text=Buongiorno%2C%20vorrei%20prenotare%20un%20tavolo.`
export const PHONE_LINK = `tel:${PHONE_NUMBER_RAW}`
