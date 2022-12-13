# Wild DrunKing :tropical_drink:

**Grupo:** Web-0

**Integrantes:** Antonia González, Jorge Guzmán y Natalia Zamorano

## Entrega 4

### Documentación

La documentación se realzó en Postman, y está en el siguiente link:

https://documenter.getpostman.com/view/24529184/2s8Ysoyufn

### Lógica

Se agregó el modelo *GoodPlayerHexagon* para poder guardar las casillas a las que un jugador puede moverse durante un turno, con el objetivo de asegurar que se elija una adyacente y de acuerdo a su nivel de alcohol (NA):

- 0 < NA <= 0.3 : el jugador puede elegir cualquiera de las casillas adyacentes.
- 0.3 < NA <= 0.7: el jugador puede escoger entre dos de las casillas adyacentes (al azar cual no).
- 0.7 < NA < 1: el jugador puede escoger solo una de las casillas adyacentes (al azar).
- 1 <= NA: el jugador pierde el turno.

El nivel de alcohol se revisa al inicio de cada turno del jugador.

### Manejo de sesión y JWT

Al igual que en la **Entrega 3**.

Para el caso del admin, se necesita un autenticación JWT para poder eliminar usuarios.

### Datos y archivo .env

Al igual que en la entrega 3.

### Consideraciones adicionales

Antes de correr cualquier cosa es necesario correr:

```javascript
 yarn sequelize db:drop
 yarn sequelize db:create
 yarn sequelize db:migrate
 yarn sequelize db:seed:all
 ```

Ya que, se hicieron cambios en el contenido y orden de las migraciones y/o seeds respecto a la entrega anterior.


## Entrega 3

### Lógica

Se agregaron todos los elementos del modelo que nos faltaron en la entrega pasada. Estos son:
- Dice
- Hexagon
- Square
- Player
- Shot
- Vertex
- Admin

Además, de los modelos intermedios para relacionar los anteriores entre sí y el de Session. También, 
se mantuvieron los modelos anteriores (Match y User).

Por otra parte, también se realizaron los endpoints necesarios para la implementación del juego. La 

mayoría de ellos se encuentra en ```src/routes/matches.js```, ya que aquí es donde se maneja toda la información de cada partida.



### Manejo de sesión y validaciones

Se creo el modelo *Session*, de manera de manejar las sesiones de los usuarios y del admin. Para hacerlo se siguió el mismo formato que en las cápsulas del curso (utilizando *user* en lugar de *player*).

En ```src/routes/auth.js``` se maneja el inicio y cierre de sesión, además, del GET de los datos del usuario (sesión iniciada). Para el caso del inicio de sesión, se revisa que el email y contraseña ingresados correspondan con los datos de la base de datos. Y para el signup, se revisa que tanto el email como el usuario no estén ya utilizados.

Además, cuando un usuario quiere ver la información de los usuarios, este solo puede ver la propia, mientras que el admin puede ver la de todos.


### Archivo .env

Los datos necesarios en el archivo ```.env``` son los siguientes: 
- DB_USER
- DB_NAME
- DB_PASSWORD
- DB_HOST
- REACT_APP_SERVER_URL
- APP_KEYS
- JWT_SECRET


### Consideraciones adicionales

Antes de correr cualquier cosa es necesario correr:

```javascript
 yarn sequelize db:drop
 yarn sequelize db:create
 yarn sequelize db:migrate
 yarn sequelize db:seed:all
 ```

Ya que, se hicieron cambios en el contenido y orden de las migraciones y/o seeds respecto a la entrega anterior.

### Otros datos

Para el usuario admin, el email es ```antog@gmail.com``` y la contraseña ```12345678```.


## Entrega 2

### Modelo
La realización del modelo se realizó implementando Node Js. Se utilizaron los componentes de Koa, los que corresponden al router, middlewares y controllers. Con esto realizamos la arquitectura modelo vista controlador.

En cuanto al modelo: 
Se hizo la implementación de los modelos User, Match y UserMatch con la utilización de sequelize, se corrieron las migraciones para saber que cambios en las base de datos se realizaron, esto con la utilización de postgres, se realizaron las asociaciones correspondientes dentro de los modelos, finalmente utilizamos seeds para poblar las tablas.

Para encontrar problemas o errores se utilizó un linter llamado EsLint.

### Componentes

En el siguiente árbol se puede observar la estructura general de los componentes y subcomponentes dentro de la carpeta src del repositorio del backend

'''
-app.js

-config -config.js

-index.js

-migrations -20221014215737-create-user.js

            -20221015015959-create-match.js

            -20221016220634-add-match-status.js

            -20221016230049-create-user-match.js 

-models     -index.js

            -match.js

            -user.js

            -usermatch.js

-routes     -matches.js

            -usermatches.js

            -users.js
-routes.js

-seeders -20221017214005-seed-users.js

         -20221017214018-seed-matches.js

         -20221017214031-seed-usermatches.js
'''
### Juego

Dentro del juego, lo que está implementado es:
- Cambios de turno 
- Lanzamiento del dado


Estas implementaciones se realizaron con los métodos GET y POST dentro de la carpeta src-routes-matches.js

## Fuentes
Toda la información se obtuvo de las cápsulas, ayudantías y los repositorios de ejemplo (dccat) del curso.

