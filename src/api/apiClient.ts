import axios from 'axios';
const token =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzNjE3ODcwIiwidW5pcXVlX25hbWUiOiJTaG9wZG9vcmF0ZXN0ICBBWUFaYXkiLCJncm91cHNpZCI6IjY4Iiwicm9sZSI6IjIiLCJwcmltYXJ5c2lkIjoiMTQzIiwibmJmIjoxNjgxODA0NTAyLCJleHAiOjE3MTMzNDA1MDIsImlhdCI6MTY4MTgwNDUwMiwiaXNzIjoidGhpaGFzb2UifQ.KVJCXlNhZrx48NeiN1Nwr_J4vrSld6Z_24xTJ1GeRhmH_kllAt48E3H0BL_Lg1qteJHMETQMdOudf0T6gowstg';

const apiClient = axios.create({
  baseURL: 'https://ayazayapi.shopdoora.com/ayazay/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default apiClient;
