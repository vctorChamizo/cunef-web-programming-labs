# Laboratorio 9 — Hooks en la práctica: carga, éxito y error

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**
Semana 11 · Sesión 36 · Práctica (AF2) · Trabajo individual o en pareja

El laboratorio puede realizarse individualmente o con la pareja elegida al comienzo de la asignatura. Cualquier cambio de pareja debe comunicarse previamente al profesor.

---

## 1. Contexto

La sesión 33 presenta `useState`, `useEffect` y `useContext`; la sesión 34 introduce el consumo de APIs y los estados de carga y error. Este laboratorio combina los dos primeros en el patrón habitual para cargar datos desde una API: datos, estado de carga y error.

La primera parte completa un componente `UserList` común. La segunda reproduce el mismo patrón en un componente `PostList` dentro del proyecto creado en la sesión 32.

---

## 2. Objetivos de aprendizaje

- Explicar por qué las peticiones se realizan dentro de `useEffect` y no durante el renderizado.
- Modelar una interfaz de carga mediante `data`, `loading` y `error`.
- Utilizar `useEffect` para iniciar una petición al montar el componente.
- Crear un cliente Axios con una dirección base configurada mediante `VITE_API_URL`.
- Gestionar errores HTTP y de conexión mediante `try/catch/finally`.
- Repetir una petición desde un botón sin recargar la página, también tras un error.

---

## 3. Primera parte — `UserList`

### 3.1 Preparación

Se reutilizará el proyecto Vite de la sesión 32. Se copiará `starter/starter_UserList.jsx` como `src/UserList.jsx`, sin modificar el nombre ni la exportación.

Instalar Axios en el proyecto y crear un fichero `.env.example` con la dirección pública de la API:

```bash
npm install axios
```

```dotenv
VITE_API_URL=https://jsonplaceholder.typicode.com
```

Copiar ese valor a `.env.local` para ejecutar el proyecto; los ficheros de entorno locales no se entregan. Crear `src/api.js` con `axios.create({ baseURL: import.meta.env.VITE_API_URL })` y funciones `getUsers()` y `getPosts()` que devuelvan `response.data` al solicitar `/users` y `/posts`.

En `App.jsx`:

```jsx
import UserList from "./UserList.jsx";

<UserList />
```

El endpoint utilizado es <https://jsonplaceholder.typicode.com/users>, del que se emplean `id`, `name` y `email`.

### 3.2 Implementación

1. Crear tres estados: `users` con `[]`, `loading` con `true` y `error` con `null`.
2. Renderizar exclusivamente una de estas ramas: mensaje de carga, mensaje de error o lista de usuarios.
3. Definir una función `async loadUsers()`: activar la carga, limpiar el error, llamar a `getUsers()` y guardar los datos. Gestionar el fallo con `catch` y desactivar la carga en `finally`.
4. Llamar a `loadUsers()` desde `useEffect` con el array de dependencias vacío. La función del efecto no se declara `async`.
5. Añadir un botón `Refresh` accesible tras un éxito o un error. Su `onClick` llama a `loadUsers()`; mientras hay una petición en curso, el botón permanece deshabilitado.

### 3.3 Verificación

- **Éxito:** se muestra brevemente la carga y después diez usuarios.
- **Error:** al utilizar temporalmente una URL incorrecta se muestra un mensaje, no una página vacía.
- **Refresh:** el botón repite la petición sin recargar la página ni modificar la URL.

### 3.4 Entrega de la primera parte

- `src/UserList.jsx` completo.
- Funcionamiento de carga, éxito, error y actualización manual.
- Cada participante debe poder explicar `async/await`, los tres estados y el tratamiento del error.

---

## 4. Segunda parte — `PostList`

1. Crear `src/PostList.jsx` con el mismo patrón de tres estados.
2. Utilizar <https://jsonplaceholder.typicode.com/posts> y los campos `id`, `title` y `body`.
3. Renderizar `PostList` y `UserList` en `App`, con un `<h2>` para cada lista. Las dos peticiones se ejecutan de forma independiente.
4. Decidir si se muestran las cien publicaciones, se limita el resultado a diez o se pagina. La decisión debe justificarse en una frase dentro de `README.md`.

### 4.1 Entrega de la segunda parte

- `src/PostList.jsx` con carga, error y éxito.
- Las dos listas renderizadas en la misma página.
- Una frase en `README.md` que justifique cuántas publicaciones se muestran.
- Cada participante debe poder explicar ambos componentes.

---

## 5. Lista de comprobación

**`UserList`:**

- [ ] Existen los estados `users`, `loading` y `error`.
- [ ] `useEffect` inicia la petición al montar.
- [ ] Axios utiliza un cliente configurado con `VITE_API_URL`.
- [ ] La petición utiliza `async/await` y gestiona errores con `try/catch/finally`.
- [ ] Solo se renderiza una rama entre carga, error y lista.
- [ ] El botón repite la petición sin recarga completa.

**`PostList`:**

- [ ] Se aplica el mismo patrón a un endpoint diferente.
- [ ] Ambas listas aparecen en `App`.
- [ ] `README.md` justifica el número de publicaciones mostradas.
- [ ] Cada participante puede explicar todo el código.

---

## 6. Entrega

Se entrega el proyecto en el repositorio público propio. En Canvas se indican la URL del repositorio, el enlace permanente al commit exacto y la modalidad de trabajo (individual o en pareja y, si corresponde, el usuario de GitHub de la pareja). El plazo es el comunicado en Canvas.

---

## 7. Solución y referencias

La solución y el ejemplo de Riverside FC con datos remotos se publicarán después de vencer el plazo de entrega indicado en Canvas, previa autorización expresa.

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Axios: Getting Started](https://axios-http.com/docs/intro)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
