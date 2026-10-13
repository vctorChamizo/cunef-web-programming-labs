# Laboratorio 5 — API CRUD de tareas en memoria

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**
Semana 6 · Sesión 18 · Práctica (AF2) · Trabajo individual o en pareja

El laboratorio puede realizarse individualmente o con la pareja elegida al comienzo de la asignatura. Cualquier cambio de pareja debe comunicarse previamente al profesor.

---

## 1. Contexto

En la sesión 15 se construyó el esqueleto de una aplicación Express con *middleware*, registro de peticiones y un `GET /tasks` basado en un array. En las sesiones 16 y 17 se introdujeron la separación entre rutas y controladores, el tratamiento centralizado de errores y las decisiones básicas de diseño REST. En este laboratorio se aplican esas piezas al **mismo proyecto** para implementar las cinco operaciones CRUD, todavía sin base de datos.

El objetivo se centra en las decisiones REST: verbo, URL y código de estado. En la sesión 22, el array se sustituirá por SQL sin modificar las rutas ni los nombres públicos de los controladores.

---

## 2. Objetivos de aprendizaje

- Asociar las operaciones CRUD con verbos y URLs REST.
- Utilizar correctamente `200`, `201`, `204`, `400` y `404`.
- Incluir `Location` después de un `POST` correcto.
- Validar la entrada y rechazar peticiones incorrectas con `400`.
- Explicar por qué `PUT` sustituye el recurso completo.
- Mantener un almacén mutable detrás de una API estable del controlador.
- Ejecutar pruebas automatizadas con Jest y supertest sin abrir un puerto.

---

## 3. Rutas requeridas

| Verbo y ruta | Resultado correcto | Error |
|---|---|---|
| `GET /tasks` | `200` y array completo | — |
| `GET /tasks/:id` | `200` y una tarea | `404` si no existe |
| `POST /tasks` | `201`, `Location` y tarea creada | `400` si falta `title` |
| `PUT /tasks/:id` | `200` y tarea sustituida | `404` si no existe; `400` sin `title` |
| `DELETE /tasks/:id` | `204` sin cuerpo | `404` si no existe |

Los errores del cliente se comunican mediante códigos `4xx`; no se devuelve `200` con un objeto de error.

### 3.1 Estructura

```text
your-repo/
  package.json
  src/
    app.js
    server.js
    middleware/
      logger.js
    routes/
      tasks.js
    controllers/
      tasksController.js
  tests/
    tasks.test.js
```

El controlador mantiene `let tasks` y `let nextId`, y exporta exactamente `listTasks`, `getTask`, `createTask`, `updateTask` y `deleteTask`.

---

## 4. Organización

Se mantiene el repositorio de la sesión 15. En modalidad de pareja, se recomienda repartir inicialmente las operaciones de lectura y las pruebas por un lado, y las operaciones de escritura por otro, intercambiando después la revisión.

---

## 5. Requisitos

- Los cinco ficheros de `src/` y `tests/tasks.test.js`.
- `express` en `dependencies`; `jest` y `supertest` en `devDependencies`.
- Scripts `"start": "node --watch src/server.js"` y `"test": "jest"`.
- Las cinco rutas con los códigos de estado indicados.
- Cabecera `Location` en el `POST` correcto.
- Validación de `title` en `POST` y `PUT`.
- `app.js` exporta la aplicación y no llama a `listen`.

---

## 6. Procedimiento

1. Conservar `app.js`, `server.js` y `middleware/logger.js` del proyecto de la sesión 15. Incorporar las plantillas de rutas, controlador y pruebas, instalar Jest y supertest y ejecutar `npm install`.
2. Completar `tasksController.js` con el array mutable, `nextId` y los cinco controladores. Cada error debe devolver inmediatamente el código adecuado.
3. Conectar las cinco combinaciones de método y ruta en `routes/tasks.js`.
4. Montar el *router* mediante `app.use("/tasks", tasksRouter)` antes del *error handler*.
5. Probar cada operación manualmente:

   ```bash
   curl http://localhost:3000/tasks
   curl http://localhost:3000/tasks/1
   curl -i -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" -d '{"title":"Study REST"}'
   curl -i -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" -d '{}'
   curl -X PUT http://localhost:3000/tasks/1 \
     -H "Content-Type: application/json" -d '{"title":"Study","done":true}'
   curl -i -X DELETE http://localhost:3000/tasks/1
   ```

6. Copiar `starter/starter_tasks.test.js` como `tests/tasks.test.js` y ejecutar `npm test` hasta superar todas las pruebas.

---

## 7. Entrega

El repositorio debe contener la estructura indicada, las cinco operaciones funcionales y una ejecución correcta de `npm test`. Este proyecto constituye la base que recibirá una capa SQL en la sesión 22.

---

## 8. Lista de comprobación

- [ ] `GET /tasks` devuelve `200` y un array.
- [ ] `GET /tasks/:id` devuelve `200` o `404`.
- [ ] `POST /tasks` devuelve `201`, `Location` y la tarea creada.
- [ ] Un `POST` sin `title` devuelve `400` sin modificar el array.
- [ ] `PUT /tasks/:id` sustituye la tarea completa y devuelve `200`, `400` o `404` según corresponda.
- [ ] `DELETE /tasks/:id` devuelve `204` con cuerpo vacío o `404`.
- [ ] El array y `nextId` pertenecen al controlador; el *router* no contiene lógica de datos.
- [ ] Se conservan los cinco nombres públicos de los controladores.
- [ ] `app.js` exporta la aplicación sin llamar a `listen`.
- [ ] `npm test` finaliza correctamente.
- [ ] Cada participante puede explicar cada controlador y sus códigos de estado.

---

## 9. Ampliaciones opcionales

- Añadir `PATCH /tasks/:id` para actualizaciones parciales.
- Filtrar mediante `GET /tasks?userId=1`.
- Comprobar mediante una prueba que un `POST` con estado `400` no modifica la colección.

## 10. Solución y referencias

La solución de referencia y el ejemplo Riverside FC se publicarán después de la sesión.

- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Express routing](https://expressjs.com/en/guide/routing.html)
- [HTTP methods](https://restfulapi.net/http-methods/)
- [Jest: Getting Started](https://jestjs.io/docs/getting-started)
- [supertest](https://github.com/ladjs/supertest)
