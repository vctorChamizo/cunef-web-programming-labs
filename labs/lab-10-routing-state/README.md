# Laboratorio 10 — Routing y estado en una SPA

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**
Semana 12 · Sesión 39 · Práctica (AF2) · Trabajo individual o en pareja

El laboratorio puede realizarse individualmente o con la pareja elegida al comienzo de la asignatura. Cualquier cambio de pareja debe comunicarse previamente al profesor.

---

## 1. Contexto

La sesión 35 presenta React Router y las sesiones 37 y 38 abordan estado compartido y Context API. Este laboratorio combina esos conceptos en una aplicación navegable con cinco rutas, contexto de autenticación, rutas protegidas y carga de datos por identificador.

La primera parte construye una estructura común. La segunda incorpora a `UserDetail` el patrón de carga de la sesión 34 y protege su ruta.

---

## 2. Objetivos de aprendizaje

- Configurar `BrowserRouter`, `Routes` y `Route`.
- Leer segmentos mediante `useParams` y navegar mediante `useNavigate`.
- Crear `AuthContext`, `AuthProvider` y un hook `useAuth()`.
- Proteger rutas mediante `<Navigate to="/login" replace />`.
- Elevar el estado de un filtro hasta el ancestro común adecuado.

---

## 3. Primera parte — Routing y autenticación

### 3.1 Preparación

Se reutilizará el proyecto de los laboratorios 8 y 9. El acceso de esta práctica es simulado: los datos públicos de JSONPlaceholder no ofrecen autenticación. La gestión real del JWT se aplica a la API de la Práctica 2:

```bash
npm install react-router@7 axios
```

Se copiarán:

- `starter/starter_App.jsx` → `src/App.jsx`
- `starter/starter_AuthContext.jsx` → `src/AuthContext.jsx`
- `starter/starter_pages.jsx` → `src/pages.jsx`

No se modifican los nombres de componentes, rutas ni contexto.

### 3.2 Implementación

1. **Router raíz.** En `App.jsx`, situar `<BrowserRouter>` en el exterior, `<AuthProvider>` dentro y un `<Routes>` con `/`, `/login`, `/users`, `/users/:id` y `/settings`. Añadir un `<nav>` con enlaces.
2. **Contexto.** `AuthProvider` mantiene `user`, inicialmente `null`, y expone `login(name)` y `logout()`. `useAuth()` devuelve `useContext(AuthContext)`.
3. **Protección.** `<Protected>` devuelve `<Navigate to="/login" replace />` cuando no existe usuario y renderiza `children` en caso contrario. `/settings` debe utilizarlo.
4. **Acceso.** El formulario de `Login` recibe un nombre. Al enviarlo, invoca `login(name)` y después `navigate("/settings")`. Esta autenticación es provisional y no contacta con un servidor.
5. **Filtro elevado.** `UsersList` mantiene el término de búsqueda y lo comparte entre el campo y la lista filtrada.
6. **Detalle.** `UserDetail` obtiene `id` mediante `useParams()` y muestra `<h2>User {id}</h2>`.

### 3.3 Verificación

- `/settings` redirige a `/login` cuando no existe sesión.
- Después del formulario, `/settings` se muestra correctamente.
- El filtro reduce la lista en tiempo real.
- La navegación no provoca recargas completas.

### 3.4 Entrega de la primera parte

- Cinco rutas accesibles desde la navegación.
- `AuthContext` con `user`, `login`, `logout` y `useAuth()`.
- `<Protected>` funcional.
- Filtro de usuarios basado en estado elevado.
- Cada participante debe poder explicar todos los ficheros.

---

## 4. Segunda parte — Datos en la ruta de detalle

1. Sustituir el contenido provisional de `UserDetail` por los tres estados `data`, `loading` y `error`.
2. Ejecutar dentro de `useEffect(fn, [id])` una petición Axios mediante el cliente configurado en L9 a:

   ```text
   https://jsonplaceholder.typicode.com/users/${id}
   ```

3. Utilizar `[id]`, no `[]`, para repetir el efecto al navegar entre usuarios.
4. Proteger también `/users/:id` mediante `<Protected>`.
5. Explicar en un párrafo de `README.md` por qué la dependencia es `[id]` y qué ocurriría con `[]`.

### 4.1 Entrega de la segunda parte

- `UserDetail` carga el usuario correspondiente y representa carga, error y éxito.
- La navegación entre dos identificadores repite la petición.
- `/users/:id` y `/settings` redirigen a `/login` sin sesión.
- `README.md` explica la dependencia `[id]`.

---

## 5. Lista de comprobación

**Routing y autenticación:**

- [ ] Existen las cinco rutas requeridas.
- [ ] `BrowserRouter` envuelve `AuthProvider` y la aplicación.
- [ ] `useAuth()` devuelve `{ user, login, logout }`.
- [ ] `<Protected>` utiliza `<Navigate to="/login" replace />`.
- [ ] `/settings` requiere autenticación.
- [ ] El filtro de usuarios funciona mediante estado elevado.

**Detalle y protección:**

- [ ] `UserDetail` consulta el endpoint con `[id]` como dependencia.
- [ ] Se representan correctamente carga, error y éxito.
- [ ] `/users/:id` utiliza la misma protección que `/settings`.
- [ ] `README.md` explica la elección de `[id]`.
- [ ] Cada participante puede explicar todo el código.

---

## 6. Entrega

Se entrega el proyecto en el repositorio público propio. En Canvas se indican la URL del repositorio, el enlace permanente al commit exacto y la modalidad de trabajo (individual o en pareja y, si corresponde, el usuario de GitHub de la pareja). El plazo es el comunicado en Canvas.

---

## 7. Solución y referencias

La solución y la SPA completa de Riverside FC se publicarán después de vencer el plazo de entrega indicado en Canvas, previa autorización expresa.

- [React Router tutorial](https://reactrouter.com/en/main/start/tutorial)
- [React Router Navigate](https://reactrouter.com/en/main/components/navigate)
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
