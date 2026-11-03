# Laboratorio 8 — Primeros componentes React

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**
Semana 10 · Sesión 32 · Práctica (AF2) · Trabajo individual o en pareja

El laboratorio puede realizarse individualmente o con la pareja elegida al comienzo de la asignatura. Cualquier cambio de pareja debe comunicarse previamente al profesor.

---

## 1. Contexto

La sesión 31 presenta React como biblioteca declarativa para construir interfaces: JSX, componentes funcionales, *props* y estado. En este laboratorio se crea un proyecto Vite y se implementa un árbol `App → List → Item`.

El trabajo se divide en una práctica guiada con tres *starters* comunes y una adaptación posterior al tema elegido por cada estudiante o pareja. Finalmente se incorpora un contador con `useState`.

---

## 2. Objetivos de aprendizaje

- Crear y ejecutar un proyecto React mediante Vite.
- Interpretar JSX, `className`, expresiones entre llaves y etiquetas cerradas.
- Escribir componentes funcionales.
- Transmitir datos de `App` a `List` y `Item` mediante *props*.
- Renderizar listas con `.map()` y una `key` estable.
- Utilizar `useState` y observar un nuevo renderizado al actualizar el estado.

---

## 3. Primera parte — Práctica guiada

### 3.1 Creación del proyecto

```bash
npm create vite@latest my-first-react -- --template react
cd my-first-react
npm install
npm run dev
```

Se abrirá la URL indicada por Vite. Después se vaciará el cuerpo de `src/App.jsx`, se eliminará `src/App.css` y se retirará su importación. `src/main.jsx` se conserva sin cambios.

### 3.2 Ficheros iniciales

- `starter/starter_App.jsx` → `src/App.jsx`
- `starter/starter_List.jsx` → `src/List.jsx`
- `starter/starter_Item.jsx` → `src/Item.jsx`

No se modifican los nombres de los componentes ni las *props* `items` e `item`.

### 3.3 Implementación

1. **`App.jsx`.** Mantiene un array de cinco elementos, renderiza un `<h1>` y transmite el array mediante `<List items={...} />`.
2. **`List.jsx`.** Recibe `items`, renderiza un `<ul>` y crea un `<Item />` por elemento mediante `.map()`. Cada componente recibe una `key` única basada en `id`.
3. **`Item.jsx`.** Recibe `item` y muestra en un `<li>` al menos dos campos.

Después de cada paso se comprobará el navegador y la consola. El servidor debe ejecutarse sin errores rojos.

### 3.4 Entrega de la primera parte

- `App.jsx`, `List.jsx` e `Item.jsx`, cada uno exportando el componente correspondiente.
- Una lista visible con cinco filas.
- Consola sin errores.
- Cada participante debe poder explicar dónde reside el array, cómo llega a `Item` y para qué sirve `key`.

---

## 4. Segunda parte — Aplicación al tema propio

1. Sustituir el array provisional de `App.jsx` por cinco elementos reales del tema elegido en la sesión 3.
2. Adaptar `Item.jsx` a los campos del nuevo array.
3. Añadir un contador con `useState` a exactamente uno de los tres componentes:

   ```jsx
   import { useState } from "react";

   const [count, setCount] = useState(0);
   ```

4. Renderizar un botón con la etiqueta `Clicked {count} times` y un `onClick` que invoque `setCount(count + 1)`.
5. Responder en el `README.md` del proyecto, en una frase: si el contador se sitúa dentro de `Item`, ¿cuántos contadores independientes existen?

No se utiliza `document.getElementById` ni se modifica el DOM manualmente.

### 4.1 Entrega de la segunda parte

- `App.jsx` representa el tema propio del estudiante o la pareja.
- Exactamente un componente contiene el contador.
- El botón actualiza su etiqueta sin recargar la página.
- `README.md` responde a la pregunta sobre contadores independientes.
- Cada participante puede explicar los tres ficheros.

---

## 5. Lista de comprobación

**Primera parte:**

- [ ] `App.jsx` mantiene el array y renderiza `<List items={...} />`.
- [ ] `List.jsx` utiliza `.map()` y una `key` única.
- [ ] `Item.jsx` muestra al menos dos campos.
- [ ] Todos los componentes comienzan por mayúscula.
- [ ] El servidor se ejecuta sin errores en la consola.

**Segunda parte:**

- [ ] El array representa el tema propio y no los datos provisionales.
- [ ] Exactamente un componente utiliza `useState`.
- [ ] El botón actualiza el contador sin recargar la página.
- [ ] `README.md` responde a la pregunta indicada.
- [ ] Cada participante puede explicar todo el código.

---

## 6. Entrega

El proyecto React se entrega en el repositorio público propio. En Canvas se indican la URL de ese repositorio, el enlace permanente al commit exacto entregado y la modalidad de trabajo (individual o en pareja, con el usuario de GitHub de la otra persona cuando corresponda). La fecha límite es la comunicada en la actividad de Canvas.

---

## 7. Solución y referencias

La solución y el ejemplo React de Riverside FC se publicarán después de vencer el plazo de entrega indicado en Canvas, previa autorización expresa.

- [Your First Component](https://react.dev/learn/your-first-component)
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Vite: Getting Started](https://vitejs.dev/guide/)
