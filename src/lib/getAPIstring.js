function getAPIString() {
  return import.meta.env.VITE_ENV == "prod"
    ? import.meta.env.VITE_WALDO_PROD_API
    : import.meta.env.VITE_WALDO_DEV_API;
}

export default getAPIString;
