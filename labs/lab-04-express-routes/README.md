# Laboratorio 4 — Primeras rutas con Express

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**
Semana 5 · Sesión 15 · Práctica (AF2) · Trabajo individual o en pareja

El laboratorio puede realizarse individualmente o con la pareja elegida al comienzo de la asignatura. Cualquier cambio de pareja debe comunicarse previamente al profesor.

---

## 1. Contexto

Las sesiones 13 y 14 trasladan JavaScript del navegador al servidor mediante Node.js, `npm`, `package.json` y Express. Este laboratorio aplica el modelo `app.METHOD(path, handler)` y el *pipeline* de *middleware* a un servidor que puede probarse con `curl`.

Se construirá una API de tareas sin base de datos. Los datos permanecerán temporalmente en un array para centrar el trabajo en rutas, *middleware* y registro de peticiones.

Este es el primero de cuatro laboratorios sobre la misma base de código. Las sesiones 16 y 17 introducirán controladores, gestión de errores y diseño REST; los laboratorios de las sesiones 18, 22 y 27 incorporarán CRUD completo, SQL, autenticación y validación.

---

## 2. Objetivos de aprendizaje

- Inicializar un proyecto Node e instalar Express.
- Escribir rutas `GET` y `POST` que devuelvan JSON.
- Registrar *middleware* con `app.use` y razonar sobre su orden.
- Implementar un *logger* que imprima una línea `METHOD URL` y llame a `next()`.
- Leer `req.params` y `req.body`.
- Separar la configuración de la aplicación del proceso que abre el puerto.

---

## 3. Resultado requerido

La API debe responder a:

| Método y ruta | Respuesta |
|---|---|
| `GET /health` | `{ "status": "ok" }` |
| `GET /echo/:msg` | `{ "echo": "<msg>" }` |
| `GET /tasks` | Array provisional de tareas |
| `POST /tasks` | `{ "received": <cuerpo JSON> }`, con estado `201` |

Cada petición debe generar exactamente una línea de registro. Una tarea presenta esta forma:

```json
{ "id": 1, "title": "Write the API skeleton", "done": false, "userId": 1 }
```

### 3.1 Estructura del proyecto

Los ficheros de `starter/` se colocarán con esta estructura y sin el prefijo `starter_`:

```text
your-repo/
  package.json
  src/
    app.js
    server.js
    middleware/
      logger.js
```

- `app.js` configura las rutas y exporta la aplicación, pero no abre un puerto.
- `server.js` importa la aplicación y ejecuta `app.listen`.
- `logger.js` exporta `logger(req, res, next)`.

---

## 4. Requisitos previos

- Node.js 18 o posterior y `npm` disponibles en la terminal.
- Haber completado las sesiones 13 y 14 sobre Node.js, estructura de proyecto, rutas y *middleware* de Express.
- Poder ejecutar comandos desde la carpeta raíz del proyecto.

No se requiere base de datos, autenticación, controladores separados ni gestión centralizada de errores.

---

## 5. Organización

Cada estudiante mantiene el repositorio público propio utilizado en los laboratorios anteriores. Cada participante debe poder explicar cualquier fichero. En modalidad de pareja, se recomienda repartir inicialmente la aplicación y el servidor por un lado, y el *logger* y las pruebas manuales por otro, intercambiando después la revisión.

---

## 6. Requisitos

- `package.json` con Express en `dependencies` y un script `start`.
- Los tres ficheros de `src/`, conservando las firmas de los *starters*.
- Las cuatro rutas indicadas.
- `express.json()` y `logger` registrados antes de las rutas.
- Una única línea de registro por petición.

---

## 7. Procedimiento

1. Copiar `starter/package.json` en la raíz del proyecto y ejecutar `npm install`.
2. Crear la estructura de carpetas y colocar los tres *starters* en su ubicación definitiva, eliminando el prefijo `starter_`.
3. Implementar `logger` con `` `${req.method} ${req.url}` `` y una llamada posterior a `next()`.
4. Configurar `app.js` en este orden: `express.json()`, `logger`, `/health`, `/echo/:msg`, `GET /tasks` y `POST /tasks`. Exportar la aplicación.
5. En `GET /tasks`, devolver el array provisional incluido en el *starter*. En `POST /tasks`, devolver `{ "received": req.body }` con estado `201`.
6. Importar la aplicación en `server.js` y ejecutar `app.listen(PORT, ...)`.
7. Iniciar mediante `npm start`.
8. Probar todas las rutas:

   ```bash
   curl http://localhost:3000/health
   curl http://localhost:3000/echo/hello
   curl http://localhost:3000/tasks
   curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"Buy milk","done":false,"userId":1}'
   ```

9. Confirmar que cada petición produce exactamente una línea `METHOD URL` en la terminal del servidor.

---

## 8. Entrega

Un repositorio con `package.json` y los tres ficheros de `src/`, capaz de responder a las cuatro rutas y registrar cada petición una sola vez.

---

## 9. Lista de comprobación

- [ ] Express figura en `dependencies`.
- [ ] `app.js` exporta la aplicación y no llama a `listen`.
- [ ] `server.js` importa la aplicación y llama a `app.listen`.
- [ ] `express.json()` y `logger` se registran antes de las rutas.
- [ ] `/health`, `/echo/:msg`, `GET /tasks` y `POST /tasks` responden correctamente.
- [ ] Cada petición produce una única línea `METHOD URL`.
- [ ] Cada participante puede explicar todo el código.

---

## 10. Solución y referencias

La solución de referencia se publicará después de que venza el plazo de entrega. No debe utilizarse como plantilla durante el laboratorio.

- [Express routing](https://expressjs.com/en/guide/routing.html)
- [Using middleware](https://expressjs.com/en/guide/using-middleware.html)
- [MDN: Express/Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
