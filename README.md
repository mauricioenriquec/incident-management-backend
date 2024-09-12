##CREDENCIALES DE AUTENTICACION

Rol: admin
Marvin Lopez
marvinlopez@example.com
marvin1234

Rol: resident	
Mauricio Cardozo
mauriciocardozo@example.com
mauricio1234
	
Rol: admin    
Harold Carazas
haroldcarazas@example.com
harold1234

Rol: admin	
Jorge Sosa
jorgesosa@example.com
jorge1234

Rol: resident	
Hans Llanos
hansllanos@example.com
hans1234

Rol: resident	
Diego Huarsaya
diegohuarsaya@example.com
diego1234

El servidor estará disponible en http://localhost:5000.

Rutas de la API

Autenticación
POST /api/auth/login: Iniciar sesión y obtener un token JWT.
POST /api/auth/register: Registrar un nuevo usuario.

Usuarios
GET /api/users: Obtener todos los usuarios (requiere autenticación y rol de administrador).
GET /api/users/:id: Obtener un usuario por ID (requiere autenticación).
PUT /api/users/:id: Actualizar un usuario por ID (requiere autenticación).
DELETE /api/users/:id: Eliminar un usuario por ID (requiere autenticación y rol de administrador).

Incidentes
GET /api/incidents: Obtener todos los incidentes (requiere autenticación).
GET /api/incidents/:id: Obtener un incidente por ID (requiere autenticación).
POST /api/incidents: Crear un nuevo incidente (requiere autenticación).
PUT /api/incidents/:id: Actualizar un incidente por ID (requiere autenticación).
DELETE /api/incidents/:id: Eliminar un incidente por ID (requiere autenticación).

Autenticación
Este proyecto utiliza JWT para la autenticación. Asegúrate de incluir el token en el encabezado Authorization de tus solicitudes:

Authorization: Bearer <token>