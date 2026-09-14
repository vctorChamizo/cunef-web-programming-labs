# Laboratorio 3 — Ejercicios de lógica y funciones

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**
Semana 3 · Sesión 9 · Práctica (AF2) · Trabajo individual o en pareja

El laboratorio puede realizarse individualmente o con la pareja elegida al comienzo de la asignatura. Cualquier cambio de pareja debe comunicarse previamente al profesor.

---

## 1. Contexto

Las sesiones 7 y 8 presentan variables, tipos de datos, estructuras de control, funciones, parámetros, argumentos, parámetros por defecto y `return`. Este laboratorio aplica esos conceptos a problemas pequeños que combinan funciones y flujo de control.

Se realizan dos partes en orden:

1. Práctica guiada sobre `starter/starter_functions.js`.
2. Aplicación al sitio iniciado en la sesión 3 mediante un nuevo fichero `exercises.js`.

Todo el trabajo de esta sesión se observa en la consola. La manipulación de la página mediante el DOM se abordará en las sesiones 10 y 11.

---

## 2. Objetivos de aprendizaje

- Escribir una misma función como declaración, expresión y *arrow function*.
- Utilizar correctamente parámetros por defecto y `return`.
- Combinar bucles `for` y condicionales para resolver FizzBuzz.
- Encontrar el máximo de un array sin utilizar `Math.max`.
- Normalizar texto para comprobar palíndromos.
- Verificar código mediante `console.assert`.
- Cargar un fichero JavaScript desde una página propia.
- Implementar funciones puras para validar correo, contraseña y formulario de acceso.

---

## 3. Requisitos previos

- Haber completado las sesiones 7 y 8 sobre variables, tipos, control de flujo y funciones.
- Disponer de un navegador con herramientas de desarrollo o de Node.js para ejecutar los ficheros.
- Conservar en el repositorio propio el sitio HTML y CSS de los laboratorios anteriores para la segunda parte.

No se requiere manipular el DOM ni instalar dependencias.

---

## 4. Primera parte — Práctica guiada

### 4.1 Fichero inicial

Se utilizará `starter/starter_functions.js`. **No se modifican los nombres ni las firmas públicas**, porque las pruebas incluidas invocan las funciones directamente.

Antes de editar, se leerá el comentario inicial sobre parámetros, argumentos, declaraciones, expresiones, *arrow functions*, parámetros por defecto y `return`.

Material de consulta: [Functions in JavaScript](https://www.geeksforgeeks.org/javascript/functions-in-javascript/). Para esta sesión solo son necesarios los conceptos básicos; quedan fuera IIFEs, recursividad, constructores, funciones asíncronas, generadores y funciones de orden superior.

### 4.2 Funciones requeridas

1. **`greet`.** `greet("Ana")` devuelve `"Hello, Ana!"` y `greet()` devuelve `"Hello, friend!"`. Se implementa como `greetDeclaration`, `greetExpression` y `greetArrow`.
2. **`square`.** `square(5)` devuelve `25`. Se implementa en las tres sintaxis.
3. **`sumArray`.** `sumArray([1, 2, 3, 4])` devuelve `10` y un array vacío devuelve `0`. Se utiliza un bucle y un acumulador.
4. **`celsiusToFahrenheit`.** Se aplica `(celsius * 9 / 5) + 32`: `0` devuelve `32`, `100` devuelve `212` y `-40` devuelve `-40`.
5. **Pruebas.** Una consola sin mensajes `Assertion failed` indica que todas las comprobaciones se superan.

Las tres variantes de cada ejercicio deben implementar el mismo algoritmo; únicamente cambia la sintaxis de declaración.

### 4.3 Ejecución de las pruebas

Se puede crear un `runner.html` temporal junto al fichero inicial:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JS Practice Runner</title>
</head>
<body>
  <script src="starter_functions.js"></script>
</body>
</html>
```

También puede ejecutarse `node starter_functions.js` desde la misma carpeta.

### 4.4 Entrega de la primera parte

- `starter_functions.js` con los doce cuerpos completados.
- Cero mensajes `Assertion failed`.
- Cada participante debe poder explicar la diferencia entre declaración, expresión y *arrow function*.

---

## 5. Segunda parte — Aplicación al sitio propio

Se conservarán sin cambios el HTML y el CSS construidos anteriormente. Solo se añadirá un fichero JavaScript y la etiqueta que lo carga.

### 5.1 Procedimiento

1. Crear `exercises.js` en el mismo repositorio que `index.html` y `styles.css`.
2. Implementar las funciones indicadas a continuación.
3. Añadir a `index.html` una única línea:

   ```html
   <script src="exercises.js" defer></script>
   ```

4. Abrir la página y comprobar la consola.
5. Ejecutar al menos una función con datos reales relacionados con el tema del sitio, introducidos manualmente en un array. La lectura del DOM se abordará en la sesión siguiente.

### 5.2 Funciones requeridas

```javascript
// FizzBuzz — print 1..n. Multiples of 3 become "Fizz",
// multiples of 5 become "Buzz", multiples of both become "FizzBuzz".
function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    // your logic here
  }
}

// findMax — return the largest value in the array. No Math.max.
// Return undefined for an empty array.
function findMax(numbers) {
  // your logic here
}

// isPalindrome — ignore case, spaces, and punctuation.
function isPalindrome(str) {
  // your logic here
}

// Refactor at least one function above into an arrow function.
```

### 5.3 Pruebas

```javascript
fizzBuzz(15);

console.assert(findMax([3, 7, 2, 9, 1]) === 9, "findMax basic");
console.assert(findMax([-5, -2, -9]) === -2, "findMax negatives");
console.assert(findMax([]) === undefined, "findMax empty");

console.assert(isPalindrome("racecar") === true, "isPalindrome basic");
console.assert(isPalindrome("A man, a plan, a canal: Panama") === true, "isPalindrome punctuation");
console.assert(isPalindrome("hello") === false, "isPalindrome false case");
```

En este bloque de pruebas, una ejecución correcta solo muestra la salida de `fizzBuzz(15)`; los `console.assert` permanecen silenciosos. Las llamadas posteriores con datos del sitio pueden añadir sus propias líneas informativas.

### 5.4 Validación del formulario de acceso

Se implementarán tres funciones puras, sin acceso al DOM:

```javascript
// Basic email shape validation. Return true or false.
function validateEmail(email) {
  // your logic here
}

// At least 8 characters, one letter, and one digit.
function validatePassword(password) {
  // your logic here
}

// Return { valid: true, errors: [] } or
// { valid: false, errors: ["...", "..."] }.
function validateLoginForm(email, password) {
  // your logic here
}
```

El mismo `exercises.js` se cargará desde `login.html`. Se utilizarán estas comprobaciones:

```javascript
console.assert(validateEmail("fan@riverside.fc") === true, "email valid");
console.assert(validateEmail("fan@riversidefc") === false, "email needs a dot");
console.assert(validateEmail("fanriverside.fc") === false, "email needs an @");

console.assert(validatePassword("Season2026") === true, "password ok");
console.assert(validatePassword("short1") === false, "password too short");
console.assert(validatePassword("allletters") === false, "password needs a digit");

console.assert(validateLoginForm("fan@riverside.fc", "Season2026").valid === true, "form valid");
console.assert(validateLoginForm("nope", "x").errors.length === 2, "form reports both errors");
```

El servidor tendrá la decisión final sobre la autenticación en el bloque II. Estas funciones constituyen la validación previa del *frontend*.

### 5.5 Entrega de la segunda parte

- `exercises.js`, enlazado desde `index.html` y `login.html`.
- Las tres funciones de ejercicio y los tres validadores implementados.
- Todas las pruebas ejecutadas sin fallos.
- Al menos una función ejecutada con datos del tema propio.
- Cada participante debe poder explicar todo el fichero.

---

## 6. Lista de comprobación

**Primera parte:**

- [ ] Se completan cuatro ejercicios en tres sintaxis: doce funciones.
- [ ] `greet` utiliza el parámetro por defecto `name = "friend"`.
- [ ] No se modifican nombres ni firmas.
- [ ] Todas las funciones devuelven valores; no se limitan a utilizar `console.log`.
- [ ] No aparecen fallos de aserción.

**Segunda parte:**

- [ ] Se implementan `fizzBuzz`, `findMax`, `isPalindrome` y al menos una variante *arrow*.
- [ ] `findMax` utiliza un bucle y no `Math.max`.
- [ ] `isPalindrome` ignora mayúsculas, espacios y puntuación.
- [ ] `validateEmail`, `validatePassword` y `validateLoginForm` son funciones puras.
- [ ] `validateLoginForm` devuelve `{ valid, errors }` con un mensaje por error.
- [ ] `index.html` solo incorpora la etiqueta `<script>` y `login.html` carga el mismo fichero.
- [ ] Todas las pruebas se ejecutan sin fallos.
- [ ] Se utiliza al menos una función con datos del sitio propio.
- [ ] Cada participante puede explicar cada línea de `exercises.js`.

---

## 7. Solución y referencias

La solución de referencia se publicará después de que venza el plazo de entrega. No debe utilizarse como plantilla durante el laboratorio.

- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [MDN: `console.assert()`](https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static)
