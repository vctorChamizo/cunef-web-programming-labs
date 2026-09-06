# Laboratorio 2 — Aplicación de CSS: de la práctica a una página propia

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**
Semana 2 · Sesión 6 · Práctica (AF2) · Trabajo individual o en pareja

El laboratorio puede realizarse individualmente o con la pareja elegida al comienzo de la asignatura. Cualquier cambio de pareja debe comunicarse previamente al profesor.

---

## 1. Contexto

Las sesiones 4 y 5 presentan selectores, especificidad, *box model*, Flexbox y Grid. Este laboratorio integra los cuatro conceptos para transformar un esqueleto HTML sin estilos en una página organizada y *responsive*.

El trabajo se divide en dos partes, realizadas en orden:

1. Una práctica guiada sobre una página inicial común.
2. La aplicación de las mismas técnicas al sitio creado por cada estudiante o pareja en la sesión 3.

---

## 2. Objetivos de aprendizaje

Al finalizar la sesión se podrá:

- Aplicar el reajuste `box-sizing: border-box` y explicar su utilidad.
- Utilizar Flexbox para organizar una barra de navegación y una fila de tarjetas.
- Utilizar Grid para organizar una zona principal y una barra lateral.
- Definir un *breakpoint* con `@media` que convierta una composición de varias columnas en una sola.
- Aplicar espaciado, bordes y tipografía con la especificidad adecuada, sin `!important` ni atributos `style=""`.
- Reutilizar una única hoja de estilos en todas las páginas de un sitio.
- Dar estilo a un formulario de acceso usable.

---

## 3. Primera parte — Práctica guiada

### 3.1 Ficheros iniciales

Se utilizarán `starter/starter_practice_page.html` y `starter/practice-styles.css`. **No se modifica el HTML.** Esta parte se centra exclusivamente en CSS.

### 3.2 Requisitos de `practice-styles.css`

La hoja de estilos se construirá en el orden siguiente. Cada paso debe producir un cambio visible antes de continuar:

1. **Reset.** Aplicar `* { box-sizing: border-box; }` y restablecer de forma razonable el margen y el relleno de `body`.
2. **Header con Flexbox.** Aplicar `display: flex` a `header` y organizar el título y `<nav>` mediante `justify-content: space-between` y `align-items: center`.
3. **Enlaces de navegación con Flexbox.** Convertir el `<ul>` de `<nav>` en una fila flexible, eliminar los marcadores y separar los enlaces con `gap`.
4. **Composición principal con Grid.** Convertir `<main>` en un Grid de dos columnas: una pista ancha para `<section id="articles">` y otra más estrecha para `<aside>`. No se utilizan *floats*.
5. **Zona destacada.** Hacer que `<section id="featured">` ocupe las dos columnas mediante `grid-column: 1 / -1`, de modo que los artículos y la barra lateral queden debajo, uno junto a la otra.
6. **Tarjetas.** Añadir a cada `<article class="card">` relleno, borde o sombra sutil, `border-radius` y margen inferior.
7. **Imagen destacada.** Aplicar `max-width: 100%` y `height: auto` para evitar desbordamientos.
8. **Breakpoint responsive.** Añadir `@media (max-width: 768px)` y convertir el Grid principal en una sola columna.
9. **Footer.** Centrar el texto y separarlo de `<main>` mediante un borde superior o un fondo diferenciado.

### 3.3 Entrega de la primera parte

- `starter_practice_page.html`, sin modificar, y `practice-styles.css`, enlazados mediante `<link rel="stylesheet">`.
- Se comprobará el *breakpoint* redimensionando el navegador o mediante las herramientas de dispositivo del navegador.

---

## 4. Segunda parte — Aplicación al sitio propio

Se recuperarán las páginas creadas en la sesión 3, incluida la página principal, las páginas de detalle y la página de acceso.

### 4.1 Una hoja de estilos compartida

Se creará un único fichero `styles.css`, enlazado desde todas las páginas mediante:

```html
<link rel="stylesheet" href="styles.css">
```

La estructura compartida de `<header>`, `<nav>` y `<footer>` debe conservar el mismo aspecto en todo el sitio.

### 4.2 Requisitos

- Aplicar el mismo reajuste `box-sizing: border-box` de la primera parte.
- Organizar `<header>` y `<nav>` mediante Flexbox.
- Organizar el `<main>` de la página principal mediante Grid si existe una estructura lateral con `<aside>`, o mediante Flexbox si la estructura es lineal. La elección debe responder a la forma real del contenido.
- Aplicar estilos consistentes a las páginas de detalle y al contenido repetido, como tablas, tarjetas o listas de precios.
- Incluir al menos un *breakpoint* que produzca un cambio real de composición en pantallas estrechas; no basta con modificar el tamaño de la tipografía.

### 4.3 Formulario de acceso

La página de acceso debe presentar el formulario como una tarjeta centrada:

- Limitar su anchura, por ejemplo con `max-width: 420px; margin: 0 auto;`.
- Mostrar cada `<label>` como bloque encima de su campo.
- Dar a los campos de texto anchura completa, relleno, borde y `border-radius`.
- Añadir un estilo de foco visible mediante `input:focus`.
- Aplicar al botón la paleta del sitio, anchura completa, estado `hover` y `cursor: pointer`.

El formulario todavía no envía datos. La lógica de validación se incorporará en la sesión 9 y la autenticación real en el bloque II.

### 4.4 Entrega de la segunda parte

- Un único `styles.css` en el repositorio del sitio, enlazado desde todas las páginas.
- El mismo contenido y estructura de la sesión 3, ahora con una composición visual consistente y un formulario de acceso estilizado.
- Cada participante debe poder explicar la finalidad de cada regla.

---

## 5. Lista de comprobación

**Primera parte:**

- [ ] `box-sizing: border-box` se aplica globalmente.
- [ ] El `header` utiliza `display: flex`.
- [ ] Los enlaces de navegación utilizan Flexbox con `gap` y sin marcadores.
- [ ] `<main>` utiliza Grid con dos pistas.
- [ ] `#featured` ocupa las dos columnas del Grid.
- [ ] Las tarjetas incluyen relleno, borde o sombra, `border-radius` y margen inferior.
- [ ] La imagen no desborda su contenedor.
- [ ] `@media (max-width: 768px)` reduce el Grid a una columna.
- [ ] No se utilizan atributos `style=""` ni `!important`.

**Segunda parte:**

- [ ] Todas las páginas enlazan el mismo `styles.css`.
- [ ] La navegación, el `header` y el `footer` son consistentes.
- [ ] La zona principal utiliza Grid o Flexbox de acuerdo con su estructura.
- [ ] El contenido repetido presenta estilos consistentes.
- [ ] El formulario aparece centrado, con etiquetas en bloque, campos de anchura completa, foco visible y botón estilizado.
- [ ] Existe al menos un *breakpoint* responsive real.
- [ ] Cada participante puede explicar todas las reglas de la hoja de estilos.

---

## 6. Motivo de las dos partes

La primera parte aísla la práctica de CSS sobre una estructura común. La segunda comprueba que las mismas técnicas pueden transferirse al sitio propio, del mismo modo que se exigirá posteriormente al trabajar sobre una base de código existente.
