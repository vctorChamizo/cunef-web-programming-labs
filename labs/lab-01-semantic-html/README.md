# Laboratorio 1 — Estructura de una página

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**  
Semana 1 · Sesión 3 · Práctica (AF2) · Trabajo en pareja

---

## 1. Contexto

Las sesiones 1 y 2 presentan el funcionamiento de la web, la importancia del HTML semántico, la anatomía de los elementos y atributos, y las etiquetas estructurales (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>`). En este laboratorio, esos conceptos se aplican por primera vez a un documento real.

En este laboratorio **no se utiliza CSS ni JavaScript**. El objetivo consiste en expresar correctamente la estructura de una página únicamente mediante HTML: elementos de bloque, elementos *inline*, etiquetas semánticas y atributos. Una página sin estilos, pero estructuralmente correcta, satisface por completo el objetivo de la sesión.

---

## 2. Objetivos de aprendizaje

Al finalizar la sesión se podrá:

- Seleccionar la etiqueta semántica adecuada para cada tipo de contenido.
- Distinguir los elementos de bloque de los elementos *inline* y utilizarlos correctamente.
- Escribir atributos válidos (`href`, `src`, `alt`, `width`, `height`, `lang` y `title`) sin copiar una plantilla.
- Producir un documento HTML que supere el W3C Markup Validator sin errores.

---

## 3. Objetivo del trabajo

Cada pareja elegirá un tema para una aplicación web y construirá el **esqueleto HTML** de su página principal. En esta fase solo se trabaja la estructura, sin diseño visual.

El tema es de libre elección. Se proponen, a modo de referencia:

- La página de un club deportivo: calendario, noticias, plantilla y entradas.
- Un perfil de red social: publicaciones, información del perfil y seguidores.
- Una *landing page* para un producto o evento.
- Un blog de recetas o gastronomía.
- Un porfolio de fotografía, diseño o música.
- La página de un negocio local: restaurante, gimnasio o librería.
- La página de un curso en línea o *bootcamp*.

El tema no forma parte de los criterios de revisión. La evaluación del resultado se centra exclusivamente en la estructura.

---

## 4. Organización del trabajo

- El laboratorio se realiza en parejas y el tema se acuerda antes de escribir código.
- Las dos personas deben poder explicar todas las etiquetas del resultado final. El trabajo en pareja no consiste en dividir el documento en dos mitades independientes.
- Se recomienda que una persona escriba mientras la otra comprueba el enunciado y detecta errores, intercambiando los papeles a mitad de la sesión.
- Se entrega un único resultado por pareja, con los nombres de ambas personas en un comentario HTML al principio de cada documento.

---

## 5. Requisitos de la primera parte

El fichero `index.html` debe incluir, como mínimo:

### 5.1 Configuración del documento

- `<!DOCTYPE html>`.
- `<html lang="es">`, o el código de idioma que corresponda al contenido.
- Un elemento `<head>` con `<meta charset="UTF-8">` y un `<title>` descriptivo.

### 5.2 Estructura semántica

- Un `<header>` con el nombre o marcador del logotipo del sitio.
- Un `<nav>` con un mínimo de tres enlaces mediante `<a href="...">`.
- Un `<main>` con al menos dos elementos `<section>` relacionados con el tema.
- Al menos un `<article>` dentro de una sección. Su contenido debe tener sentido de forma independiente, por ejemplo, una noticia, un producto o una receta.
- De forma opcional, un `<aside>` para contenido complementario.
- Un `<footer>` con un aviso de copyright y al menos un enlace.

### 5.3 Elementos de bloque

- Encabezados en orden: un único `<h1>`, seguido de `<h2>` para las secciones y de `<h3>` cuando exista un nivel adicional. No se omiten niveles.
- Al menos un `<p>`.
- Al menos una lista `<ul>` u `<ol>`.
- Al menos una imagen `<img>` con atributos `alt`, `width` y `height` correctos.

### 5.4 Elementos *inline*

- Al menos un enlace `<a>` dentro de un párrafo, además de los enlaces de navegación.
- Al menos un `<strong>` o `<em>` utilizado con valor semántico, no decorativo.
- Al menos un `<span>` alrededor de un fragmento de texto, con una finalidad que pueda justificarse.

### 5.5 Atributos

- Todas las imágenes incluyen `alt`, `width` y `height`.
- Todos los enlaces incluyen un `href` válido: una URL externa o un fragmento como `#section-id`.
- La etiqueta `<html>` incluye el atributo `lang`.
- Al menos un elemento utiliza `title` para aportar información complementaria.

---

## 6. Procedimiento de la primera parte

1. Acordar el tema y representar primero la estructura en papel. Es suficiente con identificar `header`, navegación, secciones principales, contenido complementario y `footer`.
2. Crear `index.html` con la configuración indicada en el apartado 5.1.
3. Construir `<header>` y `<nav>`.
4. Construir `<main>` sección por sección. Se utilizará contenido coherente con el tema, aunque sea provisional; no se utilizará texto «Lorem ipsum».
5. Añadir un `<aside>` si resulta adecuado para el tema elegido.
6. Construir el `<footer>`.
7. Revisar el documento completo mediante la lista de comprobación.
8. Validar el HTML en <https://validator.w3.org/#validate_by_input> y corregir todos los errores. Los avisos pueden mantenerse después de haber analizado su causa.

---

## 7. Entrega de la primera parte

- Un fichero `index.html` con los nombres de ambas personas en un comentario HTML al principio.
- El fichero se sube al repositorio compartido de la pareja o se entrega por el medio indicado en clase.
- No se admite un fichero CSS, un bloque `<style>`, código JavaScript ni atributos `style=""`.

---

## 8. Comprobación de la primera parte

- [ ] Se incluyen `<!DOCTYPE html>` y `<html lang="...">`.
- [ ] Existe un único `<h1>` y no se omiten niveles de encabezado.
- [ ] Se incluyen `<header>`, `<nav>`, `<main>` y `<footer>`.
- [ ] `<main>` contiene al menos dos elementos `<section>` y un `<article>`.
- [ ] Todas las imágenes incluyen `alt`, `width` y `height`.
- [ ] Todos los enlaces incluyen un `href` funcional.
- [ ] Se incluye al menos una lista `<ul>` u `<ol>`.
- [ ] Se incluyen un enlace dentro de un párrafo, un `<strong>` o `<em>`, y un `<span>` dentro de texto corrido.
- [ ] El W3C Markup Validator no muestra errores.
- [ ] No se incluye CSS, JavaScript ni atributos `style=""`.
- [ ] Las dos personas pueden explicar la estructura completa.

---

## 9. Segunda parte — Sitio web con varias páginas

En la primera parte se construye una única página y se utiliza `href` para saltos internos (`href="#fixtures"`) o enlaces provisionales. En esta segunda parte, el resultado se amplía hasta formar un sitio con varias páginas conectadas mediante rutas relativas y una navegación compartida.

### 9.1 Objetivos de aprendizaje

Al finalizar la segunda parte se podrá:

- Distribuir el contenido entre varios documentos HTML situados en una misma carpeta.
- Construir un `<nav>` compartido que permita llegar desde cualquier página a todas las demás.
- Elegir el tipo de `href` adecuado: una URL relativa, una URL relativa con fragmento o una URL absoluta.
- Construir una página de acceso con un `<form>` semántico, campos etiquetados y un botón de envío.

### 9.2 Resultado requerido

El resultado de la primera parte se ampliará hasta formar un sitio de **al menos cuatro páginas** con una barra de navegación común. Una de las páginas debe ser obligatoriamente una página de acceso.

La elección de páginas debe responder al tema. Por ejemplo:

- Club deportivo: inicio, calendario, plantilla, entradas y acceso.
- Blog de recetas: inicio, recetas, detalle de receta, información y acceso.
- Porfolio: inicio, proyectos, contacto y acceso.

Se aplican los siguientes requisitos:

1. **Navegación compartida.** Todas las páginas incluyen el mismo `<nav>` y los mismos enlaces relativos a los ficheros hermanos (`index.html`, `fixtures.html`, etc.).
2. **Páginas independientes.** El contenido se distribuye en ficheros separados. La página principal presenta resúmenes breves que enlazan las páginas de detalle.
3. **Documentos completos.** Cada fichero incluye su propia declaración `<!DOCTYPE html>`, atributo `lang`, `<head>`, `<title>` y estructura `<header>`, `<main>` y `<footer>`. Cada página incluye al menos dos secciones de contenido coherente.
4. **Tipos de enlace.** El sitio incluye al menos un enlace a un fichero con fragmento, por ejemplo `fixtures.html#results`, y al menos un enlace externo con URL absoluta.

### 9.3 Página de acceso

La página `login.html` debe incluir dentro de `<main>` un formulario semántico con:

- Un elemento `<form>` que agrupe los campos.
- Un campo de correo electrónico mediante `<input type="email">` y un `<label>` asociado. El atributo `for` de la etiqueta debe coincidir con el `id` del campo.
- Un campo de contraseña mediante `<input type="password">`, con su propio `<label>` y el atributo `minlength`.
- Un botón de envío mediante `<button type="submit">Sign in</button>`.
- Atributos de validación como `required` y `minlength` donde resulten adecuados.

> En el bloque I, el formulario pertenece únicamente al *frontend*: no incluye `action`, no envía datos a un servidor y no autentica a ninguna persona. La autenticación se implementará en el bloque II.

### 9.4 Procedimiento de la segunda parte

1. Conservar el resultado de la primera parte como `index.html` y situar todas las páginas en la misma carpeta.
2. Escribir correctamente la navegación compartida y copiarla sin cambios en todas las páginas.
3. Crear cada página adicional con su configuración y estructura semántica completas.
4. Sustituir el contenido extenso de la página principal por resúmenes que enlacen a las páginas correspondientes.
5. Construir `login.html` con el formulario del apartado 9.3.
6. Añadir en el `<footer>` de cada página un enlace de regreso a `index.html`.
7. Recorrer todos los enlaces desde todas las páginas y corregir cualquier ruta incorrecta.
8. Validar cada fichero mediante el W3C Markup Validator.

### 9.5 Entrega de la segunda parte

- Al menos cuatro ficheros HTML completos y válidos dentro de una misma carpeta.
- Una navegación idéntica y funcional en todas las páginas.
- Una página `login.html` con campos de correo y contraseña correctamente etiquetados y un botón de envío.
- Los nombres de ambas personas en un comentario HTML al principio de cada fichero.
- El resultado se sube al mismo repositorio compartido utilizado en la primera parte.
- No se incluye CSS ni JavaScript.

### 9.6 Comprobación de la segunda parte

- [ ] Existen al menos cuatro páginas HTML completas y válidas.
- [ ] Todas las páginas comparten el mismo `<nav>` con rutas relativas.
- [ ] Desde cualquier página se puede llegar a todas las demás sin errores.
- [ ] La página principal contiene resúmenes que enlazan a páginas de detalle.
- [ ] Existe al menos un enlace a fichero con fragmento.
- [ ] Existe al menos un enlace externo con URL absoluta.
- [ ] `login.html` contiene un `<form>`, campos de correo y contraseña con sus etiquetas asociadas, y un botón de envío.
- [ ] Todos los documentos superan el W3C Markup Validator sin errores.
- [ ] No se incluye CSS, JavaScript ni atributos `style=""`.

---

## 10. Solución de referencia

Después de la sesión se publicará una solución de referencia basada en la página de un club de fútbol. Su finalidad será mostrar una estructura válida y la conexión entre varias páginas mediante una navegación compartida. La solución no debe utilizarse como plantilla durante la realización del laboratorio.
