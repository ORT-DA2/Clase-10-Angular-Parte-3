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

## Interfaces en Angular

Como ya sabemos, TypeScript tiene un tipado fuerte (Strong Typing), sin embargo muchas veces podemos encontrarnos con algo así:

```typescript
pageTitle: string;
showImage: boolean;
pets: any[]; // Esto no tiene tipo!
```

Donde la property ```pets``` es un array de cualquier tipo. Para asegurarnos de que dichos elementos cumplan con una cierta interfaz particular, podemos definir interfaces.

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
pets: IPet[]; // Esto no tiene tipo!
```
