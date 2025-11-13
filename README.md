## Arquitectura Utilizada: MVC (Modelo-Vista-Controlador)
- Elegimos implementar la arquitectura MVC porque, aunque en esta fase solo estábamos trabajando en el inicio de sesión (login) de la app, esta arquitectura nos ofrecía la mejor base para escalar la aplicación en el futuro.

- `Decidimos implementarla porque:`

    - 1. **Organización y Claridad:** Vimos que la separación de responsabilidades era crucial. Queríamos tener la lógica de la base de datos (models) totalmente aislada de la lógica de negocio (controllers) y de la interfaz (pages/components). Esto nos permite saber exactamente dónde buscar cuando hay un error o necesitamos agregar una nueva función.

    - 2. **Mantenibilidad y Colaboración en Equipo:** Al estar el código tan bien dividido, si un compañero del equipo estaba trabajando en el diseño visual (frontend - Vista), no rompía accidentalmente el código que otro compañero estaba haciendo para guardar los usuarios en la base de datos (backend - Modelo).

    - 3. **Implementación de Patrones:** La estructura de MVC nos facilitó la inserción de otros patrones que necesitábamos, como el uso de middlewares para la seguridad de la sesión, que es fundamental en una aplicación con información de usuarios y pagos.

## ¿Cómo Implementamos MVC?
**`Dividimos el proyecto en carpetas clave, cada una encargada de una parte del sistema:`**

### 1. El Modelo (models, lib/mongodb, db)

- **¿Qué hace?** Es el cerebro de los datos. Se encarga de conectarse a la base de datos (MongoDB en lib), guardar la información (como los usuarios en User.js) y asegurarse de que los datos estén bien estructurados.

- *Dato clave:* El Controlador le pide cosas, y el Modelo las busca o las guarda.

### 2. La Vista (pages, components)

- **¿Qué hace?** Es todo lo que el usuario ve e interactúa. Contiene las pantallas (como login.js, index.js) y los bloques de interfaz más pequeños que reutilizamos (components).

- **Dato clave:** Muestra los datos que le envía el Controlador.

### 3. El Controlador (controllers, pages/api)

- **¿Qué hace?** Es el intermediario. Recibe lo que el usuario hace (clics, formularios), le dice al Modelo qué datos necesita y luego le dice a la Vista qué debe mostrar. Maneja la lógica de negocio, como verificar la autenticación (authController.js).

- **Dato clave:** Conecta la Vista con el Modelo.

### Elementos Extras
- `middlewares:`<br> Códigos que se ejecutan antes de que el Controlador actúe. Lo usamos principalmente para seguridad, como verificar si un usuario ya inició sesión (authMiddleware.js).

- `services:`<br> Lógica de negocio más compleja que sacamos del Controlador para mantenerlo limpio (authService.js).

- `utils:`<br> Herramientas y funciones que usamos en muchas partes del proyecto (tokenUtils.js).

## Patrones de Diseño

### Patrones Creacionales

1. **Patrón:**  `Singleton`

- **Implementación en el Proyecto**: `lib/mongodb.js`
 
- **¿Por qué?:** Se usa para asegurar que solo exista una única instancia de la conexión a la base de datos, evitando desperdicio de recursos y garantizando un acceso global compartido.

### Patrones Estructurales

1. **Patrón:** `Adapter`

- **Implementación en el Proyecto**: `lib/mongodb.js`
 
- **¿Por qué?:** Se usa si la interfaz de tu capa de datos es diferente a la librería externa que usas (MongoDB/Mongoose). El archivo mongodb.js o una clase dentro de models puede actuar como un adaptador, traduciendo las peticiones de tu código interno a las peticiones que entiende la librería de la base de datos.

### Patrones de Comportamiento

1. **Patrón:**  `Chain of Responsibility`

- **Implementación en el Proyecto**: `src/middlewares/`
 
- **¿Por qué?:** Las funciones de middleware (ej. validar un usuario, verificar el token) forman una cadena. Cada función procesa o delega la solicitud al siguiente, permitiendo ejecutar pasos secuenciales y desacoplados antes de llegar al controlador final.

2. **Patrón:**  `Strategy`

- **Implementación en el Proyecto**: `src/utils/ o src/services`
 
- **¿Por qué?:** Este patrón es probable si dentro de los utils o services hay algoritmos intercambiables (ej. diferentes métodos de hashing para contraseñas, o diferentes esquemas de validación). Permite cambiar el algoritmo sin tocar la clase que lo usa.

## Atributos de Calidad

1. **Idoneidad Funcional**<br>
`Mi estructura organizada me ayuda a saber que mi proyecto hace lo que tiene que hacer:`

- **Completitud Funcional:** Al separar todo en models, controllers y services, puedo revisar rápidamente que cada función o requisito del sistema esté implementado.

- **Exactitud Funcional:** Tengo la lógica principal en controllers y services, lo que me facilita verificar que cada operación (como el login o guardar un dato) dé el resultado correcto y esperado.

2. **Eficiencia de Ejecución**<br>
`Aunque la velocidad depende del código, mi organización me ayuda a ser eficiente:`

- **Uso de Recursos:** Al usar el patrón Singleton en mi conexión a la base de datos (lib/mongodb.js), me aseguro de que solo haya una única conexión activa, lo que ahorra recursos del servidor.

- **Tiempo de Comportamiento:** Tener controllers y models limpios me permite encontrar y arreglar fácilmente las partes lentas del código (cuellos de botella) para mejorar la velocidad de respuesta de la aplicación.
