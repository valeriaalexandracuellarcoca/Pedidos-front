import axios from "axios";

const API_BASE = import.meta.env.VITE_ORDERS_API || "http://localhost:3000/api/v1/orders";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

/* ----------------------------------------------------------
   CREATE ORDER
---------------------------------------------------------- */
export async function crearOrden(payload) {
  const { data } = await api.post("/", payload,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMyIsImVtYWlsIjoiYXJtYW5kb251bmV6NDA0QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzYzNjU1NjczLCJvcmlnX2lhdCI6MTc2MzY1MjA3M30.yXFyXYuMhhavckSgiqMF-dEWEYi6dJjwgNryxMG73rI`
      }
    });
  return data;
}

/* ----------------------------------------------------------
   GET ORDER BY ID
---------------------------------------------------------- */
export async function obtenerOrdenPorId(id) {
  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMyIsImVtYWlsIjoiYXJtYW5kb251bmV6NDA0QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzYzNjU1NjczLCJvcmlnX2lhdCI6MTc2MzY1MjA3M30.yXFyXYuMhhavckSgiqMF-dEWEYi6dJjwgNryxMG73rI`;

  const { data } = await api.get(`/${id}`,
    {
      headers: {
        Authorization: token
      }
    }
  );
  return data;
}

/* ----------------------------------------------------------
   GET ORDERS OF USER
---------------------------------------------------------- */
export async function obtenerOrdenesDeUsuario(userId) {
  const { data } = await api.get(`/user/${userId}`);
  return data;
}

/* ----------------------------------------------------------
   GET ORDERS BY RESTAURANT (ADMIN)
---------------------------------------------------------- */
export async function obtenerOrdenesDeRestaurante(restId) {
  const { data } = await api.get(`/restaurant/${restId}`);
  return data;
}

/* ----------------------------------------------------------
   UPDATE STATE OF ORDER
   (Ej: PAYED, CANCELLED, DELIVERED)
---------------------------------------------------------- */
export async function actualizarEstadoOrden(id) {
  const estado = "paid";
  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMyIsImVtYWlsIjoiYXJtYW5kb251bmV6NDA0QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzYzNjU1NjczLCJvcmlnX2lhdCI6MTc2MzY1MjA3M30.yXFyXYuMhhavckSgiqMF-dEWEYi6dJjwgNryxMG73rI`;

  const { data } = await api.put(
    `/${id}/state/${estado}`,
    {}, // cuerpo vacío
    {
      headers: {
        Authorization: token
      }
    }
  );

  return data;
}


/* ----------------------------------------------------------
   DELETE ORDER
---------------------------------------------------------- */
export async function eliminarOrden(id) {
  const { data } = await api.delete(`/${id}`);
  return data;
}
