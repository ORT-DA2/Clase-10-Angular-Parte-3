# Angular: Interfaces, Custom Pipes, Lifecycle Hooks, etc.

Seguimos con conceptos de Angular: Interfaces, Custom Pipes, Lifecycle Hooks y Nested Components

## Para correr el proyecto:

1) Pararse en la carpeta del proyecto: ```cd my-first-angular-project/```
2) ```npm install```
3) ```npm start```

## Hoja de Ruta

0) Mejorando nuestros componentes
1) Interfaces en Angular
2) Custom Pipes: Filtrado en el listado de mascotas
3) Lifecycle Hooks
4) ----
5) ----
6) ---

## Mejorando nuestros componentes

Cuando queremos construir buenos componentes, queremos asegurarnos de que todo esté fuertemente encapsulado: de que los estilos estén encapsulados, el template, la lógica de las clases, que respondamos a los eventos del ciclo de vida de componentes apropiadamente, y transformemos los datos a valores user-friendly a medida que los vayamos precisando.

Como los componentes **son el building block esencial de toda app en Angular**, lo más limpios, mantenibles y extensibles que sean estos componentes, mejor será nuestra aplicación. Entonces, ¿cómo mejoramos nuestros componentes?

- Usar Strong Typing permite minimizar los errores y favorecer el 'tooling'. TypeScript nos da las ventajas de tener tipos que nos tren al mundo del front-end las ventajas que teníamos a nivel del backend (intellisense, sugerencias, correcciones de sintaxis, etc).

- Usar Interfaces para aquellos objetos que no tienen un tipo particular.

- Encapsular los estilos para el component.

- Los componentes tienen un **ciclo de vida** que es manejado mismo por Angular. Angular provee *ganchos* para este ciclo de vida, o *‘lifecycle hooks’*  que nos permiten hacer cosas en diferentes etapas del ciclo de vida de un component.

- También veremos como crear Custom Pipes para transformar datos antes de mostrarlo en la View. Haremos el ejemplo del filtrado en el listado de mascotas.

Lo interesante aquí también es no olvidarse de mantener siempre los lineamientos de guías de estilo que engloban buenas prácticas, convenciones, patrones y principios del desarrollo en Angular, aquí es interesante seguir la guía de estilos oficial de Angular, trabajada por John  Papa, uno de los desarrolladores más reconocidos que usan este Framework:

https://angular.io/docs/ts/latest/guide/style-guide.html

## Interfaces en Angular

Como ya sabemos, TypeScript tiene un tipado fuerte (Strong Typing), sin embargo muchas veces podemos encontrarnos con algo así:

```typescript
pageTitle: string;
showImage: boolean;
pets: any[]; // Esto no tiene tipo!
```

Donde la property ```pets``` es un array de cualquier tipo. Para asegurarnos de que dichos elementos cumplan con cierta especificación en particular, podemos definir interfaces.

Como ya sabemos, una **interfaz** es una **especificación/contrato de un conjunto de métodos y properties**. Las clases que cumplan con dicha especificación o contrato se dicen que **implementan** tal interfaz.

ES5 y ES2015 no soportan interfaces, pero sí TypeScript, en consecuencia no existirá nada de esto en el JavaScript resultado de la transpilación.

La sintaxis es como sigue:

```typescript

export interface IPet {
    id: string;
    name: string;
    size: string;
    birthDate: Date;
    weight: number;
    breedName: string;
    imageUrl: string;
    calculateAge() : number;
}
```

Pudiendo entonces tener:

```typescript
pageTitle: string;
showImage: boolean;
pets: IPet[];
```

## Estilos especiales (css) para nuestros componentes.

Cuando construimos el template para nuestro component, muchas veces necesitamos estilos particulares para dicho componente. Por ejemplo, si estamos construyendo una barra de navegación lateral o un listado, seguramente queramos que los elementos ```<li>``` o ```<div>``` tengan un estilo particular. 

En consecuencia, es necesario que evaluemos alguna forma de que nuestros componentes tengan dichos estilos únicos. La opción má
s rápida puede ser pensar poner los **estilos inline dentro del template HTML** (por ejemplo: ```<div style="display='none'; background-color='red'"> </div>```). Sin embargo, esta opción a nivel de responsabilidades no es prolija, y también hace que a futuro los estilos sean difíciles de mantener, y de obtener reuso entre estilos.

Otra opción es definir los **estilos y referenciarlos como un link dentro del index.html**, por ejemplo usando ```<link rel="stylesheet" href="misEstilosLindos.css">```. Esto es más fácil de mantener, pero hace que el componente solo se vea adecuadamente si dicha stylesheet fue referenciada. Aquí el componente no tiene forma de asegurar que dichos estilos existen. En consecuencia, nuestros componentes no serán tan facilmente reusables, debido a que no son autocontenidos.

Sin embargo, hay una opción más prolija y reusable: **agregar estilos únicos directamente en la metadata del componente utilizando la property styles o styleUrls, siendo esta segunda opción la mejor**. Tanto la property ```styles``` como ```styleUrls``` son arrays, de manera que podemos agregar múltiples estilos o múltiples hojas de estilos, siempre separados por coma.

IMAGEN STYLES 

Siguiendo con nuestro ejemplo, le agregaremos estilos a nuestro ```PetListComponent```. Lo primero que haremos es ver los estilos actuales de nuestra lista:

IMAGEN LISTADO ACTUAL

1) Ahora dentro de la carpeta ```app/pets``` creamos un nuevo archivo ```pet-list.component.css```.

2) Le agregamos el siguiente contenido simple:

```css
thead {
    color: #337AB7;
    font-size: 16px;
}
```

3) Editamos la metadata de nuestro PetListComponent para que use dichos estilos:

```typescript
@Component({
    selector: 'pm-pets',
    templateUrl: 'app/pets/pet-list.component.html',
    styleUrls: ['app/pets/pet-list.component.css'] //agregamos esta property
})
export class PetListComponent { ... }
```

4) Vemos como ahora los cabezales de la tabla estan en azul y en tamaño mayor:

IMAGEN ESTILOS DESPUES
