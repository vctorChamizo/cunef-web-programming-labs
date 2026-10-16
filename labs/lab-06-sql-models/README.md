# Laboratorio 6 — SQL y la capa `models/`

**Programación de Aplicaciones Web (G247) · CUNEF Escuela Politécnica Superior**
Semana 8 · Sesión 22 · Práctica (AF2) · Trabajo individual o en pareja

El laboratorio puede realizarse individualmente o con la pareja elegida al comienzo de la asignatura. Cualquier cambio de pareja debe comunicarse previamente al profesor.

---

## 1. Contexto

En el Laboratorio 5, la API almacenaba las tareas en un array dentro del controlador. Después de estudiar el modelo relacional y las consultas SQL en las sesiones 20 y 21, este laboratorio sustituye ese almacenamiento por una base de datos relacional. Se diseñarán las tablas, se practicarán consultas con `SELECT`, `JOIN`, agregación y paginación, y se encapsularán mediante un modelo Node basado en `node-postgres` (`pg`).

El modelo expone las operaciones `findAll`, `findById`, `create`, `update`, `remove` y `findByOwner`. Cuando esta capa se integre en la API anterior, las rutas y los nombres públicos de los controladores podrán mantenerse; cambiará su acceso a la persistencia.

No es necesario disponer de PostgreSQL durante la sesión. `createTasksModel(db)` recibe la dependencia de base de datos y puede utilizar un *fake* en memoria para las pruebas.

---

## 2. Objetivos de aprendizaje

- Interpretar claves foráneas, `NOT NULL`, `UNIQUE` y `ON DELETE CASCADE`.
- Utilizar `JOIN`, `WHERE`, `GROUP BY`, `ORDER BY` y `COUNT`.
- Paginar mediante `LIMIT` y `OFFSET` con un orden estable.
- Ejecutar consultas parametrizadas con `$1`, `$2`, etc.
- Encapsular la tabla `tasks` en un modelo compatible con los controladores anteriores.
- Inyectar la dependencia `db` para realizar pruebas sin servicios externos.

---

## 3. Trabajo requerido

### 3.1 Esquema

Se utilizará literalmente el esquema incluido en `starter/schema.sql`:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE
);
```

Se añadirán datos iniciales suficientes para comprobar las consultas. La relación es uno a muchos: cada usuario puede tener varias tareas.

### 3.2 Consultas de `queries.sql`

Se escribirán consultas que respondan a:

1. Número de tareas de cada usuario mediante `GROUP BY` y `COUNT`.
2. Usuario con mayor número de tareas abiertas.
3. Cinco tareas más recientes junto con el correo de su propietario. Como `tasks` no incluye `created_at`, se utilizará `ORDER BY t.id DESC LIMIT 5`.
4. Lista paginada mediante `LIMIT 10` y dos valores de `OFFSET`, demostrando que diferentes desplazamientos devuelven filas distintas.

### 3.3 Modelo `tasksModel.js`

`createTasksModel(db)` devolverá:

| Método | Operación SQL | Resultado |
|---|---|---|
| `findAll()` | Selección ordenada de todas las tareas | Array de filas |
| `findById(id)` | `WHERE id = $1` | Fila o `null` |
| `create({ title, userId, done })` | `INSERT ... RETURNING` | Fila creada |
| `update(id, fields)` | `UPDATE ... COALESCE(...) ... RETURNING` | Fila o `null` |
| `remove(id)` | `DELETE ... RETURNING id` | `true` o `false` |
| `findByOwner(userId, { limit, offset })` | Filtro por propietario y paginación | Página de filas |

Todas las entradas deben pasarse mediante parámetros. No se concatena nunca entrada externa dentro de SQL.

### 3.4 Inyección de dependencias

El objeto `db` debe ofrecer `query(text, params)`:

```javascript
const { Pool } = require("pg");
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const tasksModel = createTasksModel(db);

const offlineTasksModel = createTasksModel(createFakePool());
```

---

## 4. Organización

En modalidad de pareja, se recomienda que una persona trabaje inicialmente en `schema.sql` y `queries.sql`, y la otra en `tasksModel.js`, intercambiando después la revisión. Cada participante debe poder explicar cualquier consulta y por qué `$1` evita una inyección SQL.

---

## 5. Requisitos

- `schema.sql` con las tablas y datos iniciales.
- `queries.sql` con las cuatro consultas comentadas.
- `package.json` con `pg` en `dependencies`, un script `test` y documentación de `DATABASE_URL`.
- `src/models/tasksModel.js` con los seis métodos parametrizados.
- `tests/tasksModel.test.js` y `tests/helpers/fakeDb.js`, a partir de las plantillas proporcionadas.
- Una comprobación de paginación con desplazamientos diferentes.

---

## 6. Procedimiento

1. Crear una carpeta propia para L6 y copiar `starter/package.json` y `starter/schema.sql`. Si existe PostgreSQL, ejecutar `psql "$DATABASE_URL" -f schema.sql`.
2. Copiar `starter/queries.sql` como `queries.sql` y completar las cuatro consultas. La consulta paginada debe incluir `ORDER BY` y comparar `OFFSET 0` con `OFFSET 2`.
3. Copiar `starter/starter_tasksModel.js` como `src/models/tasksModel.js` e implementar los seis métodos. El valor `false` debe tratarse como valor válido, no como ausencia.
4. Copiar `starter/starter_fakeDb.js` como `tests/helpers/fakeDb.js` y `starter/starter_tasksModel.test.js` como `tests/tasksModel.test.js`.
5. Ejecutar `npm install` y `npm test`. Las pruebas comprueban las seis operaciones, los casos sin resultado, la paginación y el uso de parámetros.
6. Opcionalmente, sustituir el *fake* por `new Pool({ connectionString: process.env.DATABASE_URL })` y ejecutar el mismo modelo contra PostgreSQL.

---

## 7. Entrega

- `schema.sql` con esquema y datos iniciales.
- `queries.sql` con las cuatro consultas.
- `src/models/tasksModel.js` con las seis operaciones parametrizadas.
- `tests/` con la prueba automatizada y su *fake pool*.

Esta implementación constituye la primera versión de la carpeta `models/` que se integrará posteriormente con los controladores Express.

---

## 8. Lista de comprobación

- [ ] `schema.sql` crea `users` y `tasks` con la clave foránea y `ON DELETE CASCADE`.
- [ ] Las cuatro consultas producen los resultados solicitados.
- [ ] Dos desplazamientos de paginación devuelven filas diferentes.
- [ ] Todas las consultas del modelo están parametrizadas.
- [ ] Se exporta `createTasksModel(db)` con los seis nombres exactos.
- [ ] `findById` y `update` devuelven `null` cuando no existe el id.
- [ ] `remove` devuelve `true` o `false`.
- [ ] El modelo funciona contra un *fake pool* sin base de datos.
- [ ] `npm test` finaliza correctamente.
- [ ] Cada participante puede explicar cualquier consulta y la protección que ofrecen los parámetros.

---

## 9. Integración posterior

El controlador sustituirá la lectura del array por una llamada asíncrona al modelo:

```javascript
// Before
const task = tasks.find((item) => item.id === id);

// After
const task = await tasksModel.findById(id);
```

Los *handlers* deberán utilizar `await` y reenviar errores mediante `next(err)`. En la sesión 27 se añadirá autenticación, control de propiedad y paginación sobre esta misma capa.

## 10. Solución y referencias

La solución y el ejemplo completo de Riverside FC se publicarán después de la sesión.

- [PostgreSQL SELECT](https://www.postgresql.org/docs/current/sql-select.html)
- [PostgreSQL LIMIT and OFFSET](https://www.postgresql.org/docs/current/queries-limit.html)
- [node-postgres queries](https://node-postgres.com/features/queries)
- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
