# Laboratorio 7 — Autenticación, paginación y permisos

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**
Semana 8 · Sesión 27 · Práctica (AF2) · Trabajo individual o en pareja

El laboratorio puede realizarse individualmente o con la pareja elegida al comienzo de la asignatura. Cualquier cambio de pareja debe comunicarse previamente al profesor.

---

## 1. Contexto

En la sesión 22 se construyó `tasksModel` como capa de acceso a la base de datos. Este laboratorio integra ese modelo con la API Express del Laboratorio 5 y añade autenticación, autorización, validación y paginación. Las sesiones 25 y 26 introducen JWT, contraseñas y validación; la sesión 27 permite aplicarlos a la API.

La API pública del modelo no cambia. El controlador pasa a ser una factoría: `createTasksController({ tasksModel })`, que devuelve `{ list, getOne, create, update, remove }`. La inyección permite sustituir el modelo por un *fake* durante las pruebas. La sesión práctica inicia la integración; el trabajo restante se completa fuera del aula.

La entrega de L6 cierra después de esta sesión. Si el modelo de L6 aún está en desarrollo, se puede comenzar por el registro, el login, la validación y el *middleware* `auth`, y completar la integración de tareas cuando el modelo esté terminado.

---

## 2. Objetivos de aprendizaje

- Almacenar contraseñas mediante bcrypt con coste mínimo 10 y verificarlas con `bcrypt.compare`, utilizando `bcryptjs`.
- Emitir y verificar JWT, adjuntando el *payload* a `req.user`.
- Distinguir autenticación (`401`) de autorización (`403`).
- Validar cuerpos mediante Zod y devolver `400` con los errores de validación.
- Paginar mediante `page` y `limit`, aplicando límites seguros.

---

## 3. Trabajo requerido

1. **Paginación.** `GET /tasks?page=&limit=` normaliza `page` a un entero entre 1 y 100 000 y `limit` a un entero entre 1 y 100; los valores ausentes o no enteros usan 1 y 20, respectivamente. Se calcula `offset = (page - 1) * limit`, se invoca `findByOwner` y se devuelve `{ page, limit, items }`.
2. **Autenticación.** Un *middleware* `auth` lee `Authorization: Bearer <token>`, verifica el JWT, asigna `req.user` y devuelve `401` cuando falta el token o no es válido.
3. **Autorización.** Las operaciones sobre una tarea comparan `req.user.sub` con `user_id`. Un token válido que intenta acceder a una tarea ajena recibe `403`.
4. **Validación.** `POST /tasks` y `PUT /tasks/:id` utilizan un esquema Zod. Los cuerpos incorrectos reciben `400` antes de llegar al modelo.
5. **Usuarios y acceso.** Se añade `usersModel` y un controlador con `register` y `login`.

---

## 4. Estructura

```text
src/
  app.js
  server.js
  middleware/
    auth.js
  validators/
    taskSchema.js
  models/
    tasksModel.js
    usersModel.js
  routes/
    auth.js
    tasks.js
  controllers/
    authController.js
    tasksController.js
```

Comportamiento requerido:

- `POST /auth/register` devuelve `201 { id, email }`; un correo duplicado devuelve `409`.
- `POST /auth/login` devuelve `200 { token }`; credenciales incorrectas devuelven `401`.
- `GET /tasks` sin token devuelve `401`; con token devuelve `{ page, limit, items }`.
- `POST /tasks` sin `title` devuelve `400`; una petición válida devuelve `201` y obtiene el propietario del token, nunca del cuerpo.
- El acceso a una tarea ajena mediante `GET`, `PUT` o `DELETE` devuelve `403`.
- `limit=999` se limita a `100`; `page=0` se corrige a `1`.

### 4.1 Esquema de trabajo

El fichero `starter/schema.sql` crea una **base de datos local nueva** con las tablas de L6 y las columnas `password_hash TEXT NOT NULL` y `role TEXT NOT NULL DEFAULT 'user'` en `users`. No debe ejecutarse sobre la base anterior: sus usuarios de prueba no tienen contraseña almacenada y un `ALTER TABLE ... ADD COLUMN password_hash TEXT NOT NULL` fallaría.

El JWT incluye `{ sub: user.id, role: user.role }`.

### 4.2 Contrato público

El modelo devuelve `user_id`, pero la API conserva `{ id, title, done, userId }` mediante:

```javascript
const toDTO = (row) => ({
  id: row.id,
  title: row.title,
  done: row.done,
  userId: row.user_id,
});
```

---

## 5. Organización

Se recomienda repartir inicialmente el flujo de autenticación (`usersModel`, controlador y *middleware*) y el flujo de peticiones (Zod, paginación y permisos), intercambiando después la revisión. La diferencia entre `401` y `403` debe revisarse expresamente.

---

## 6. Procedimiento

1. Crear una carpeta de proyecto siguiendo `starter/README.md`, copiar el modelo de L6 en su estado actual y preparar una base de datos local nueva con `starter/schema.sql`. Los ficheros `starter_app.js` y `starter_server.js` aportan la conexión y el montaje de rutas. Si el modelo está incompleto, terminarlo antes de probar las operaciones de tareas.
2. Implementar `createUsersModel(db)` con `findByEmail(email)` y `create({ email, passwordHash, role })`, utilizando consultas parametrizadas.
3. Implementar `register`: comprobar duplicados, ejecutar `bcrypt.hash(password, 10)` y devolver `201`. Implementar `login`: localizar el usuario, ejecutar `bcrypt.compare` y firmar un JWT con una hora de validez.
4. Implementar `auth`: analizar la cabecera Bearer, verificar el token, devolver `401` en caso de error y asignar `req.user`.
5. Mantener `/auth` abierto y proteger `/tasks` mediante `app.use("/tasks", auth, tasksRouter)`.
6. Implementar `taskSchema` y `validate(schema)` con `safeParse`. En caso correcto, sustituir `req.body` por el valor analizado.
7. En las operaciones individuales, devolver `403` cuando `Number(task.user_id) !== Number(req.user.sub)`.
8. En el listado, normalizar `page` y `limit`, calcular `offset`, invocar `findByOwner` y aplicar `toDTO`.
9. Ejecutar pruebas que cubran registro, acceso, `401`, `403`, `400` y paginación.

---

## 7. Dependencias y secretos

- Se utilizará `bcryptjs`, compatible con la API de bcrypt y sin compilación nativa. Las contraseñas tendrán al menos 8 caracteres y, por el límite de bcrypt, un máximo de 72 bytes UTF-8; se rechazarán entradas superiores en lugar de truncarlas silenciosamente.
- `DATABASE_URL` y `JWT_SECRET` se definen como variables de entorno antes de arrancar. La aplicación no arranca si faltan. Nunca se incorpora un secreto real al repositorio.
- El *error handler* permanece al final de la aplicación.

---

## 8. Entrega

La API CRUD debe incluir registro y acceso mediante JWT, rutas protegidas, comprobaciones de propiedad, validación Zod y listado paginado con límites normalizados. Se entrega en el repositorio propio, indicando en Canvas la URL del repositorio, el enlace permanente al commit exacto y la modalidad de trabajo (individual o en pareja, con el usuario de GitHub de la otra persona cuando corresponda). No se fija aquí una fecha límite: se utilizará la comunicada en la actividad de Canvas.

---

## 9. Lista de comprobación

- [ ] Las contraseñas solo se almacenan como *hashes* bcrypt con coste mínimo 10.
- [ ] Registro y acceso rechazan contraseñas que superen 72 bytes UTF-8.
- [ ] El acceso utiliza `bcrypt.compare`, no `===`.
- [ ] El JWT incluye `{ sub, role }` y caduca en una hora.
- [ ] `auth` asigna `req.user` y devuelve `401` para tokens ausentes o inválidos.
- [ ] El acceso de otro propietario devuelve `403`.
- [ ] Un `title` ausente o inválido devuelve `400` con los errores de Zod.
- [ ] `userId` procede del token y no del cuerpo.
- [ ] `GET /tasks` devuelve `{ page, limit, items }`.
- [ ] `limit=999` se convierte en `100` y `page=0` en `1`.
- [ ] Todas las tareas se transforman mediante `toDTO`.

---

## 10. Solución y referencias

La solución y el ejemplo de Riverside FC se publicarán cuando venza el plazo de entrega comunicado en Canvas, previa autorización expresa.

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)
- [Zod](https://zod.dev/)
- [Express error handling](https://expressjs.com/en/guide/error-handling.html)
- [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [RFC 7519: JWT](https://www.rfc-editor.org/rfc/rfc7519)
