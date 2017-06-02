# Angular: Interfaces, Custom Pipes, Lifecycle Hooks, etc.

Seguimos con conceptos de Angular: Interfaces, Custom Pipes, Lifecycle Hooks y Nested Components

## Para correr el proyecto:

1) Pararse en la carpeta del proyecto: ```cd my-first-angular-project/```
2) ```npm install```
3) ```npm start```

## Hoja de Ruta

0) Mejorando nuestros componentes
1) Interfaces en Angular
2) Estilos especiales (css) para nuestros componentes
3) Ciclo de vida de los componentes: Hooks
4) Custom Pipes: Filtrado en el listado de mascotas
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
    templateUrl: './pet-list.component.html',
    styleUrls: ['./pet-list.component.css'] //agregamos esta property
})
export class PetListComponent { ... }
```

4) Vemos como ahora los cabezales de la tabla estan en azul y en tamaño mayor:

IMAGEN ESTILOS DESPUES

## Ciclo de vida de los componentes: Hooks

Todo componente de Angular, tiene un ciclo de vida. Dicho ciclo de vida (lifecycle) es gestionado mismo por Angular:

1) Angular **crea** los componentes.
2) Luego **renderiza** los componentes.
3) Una vez esto, Angular **crea y renderiza** los componentes hijos.
4) Durante la operativa normal, Angular **procesa los cambios** sobre uncomponente cuando sus "properties enlazadas" (data bound properties) cambian
5) Y finalmente **destruye** el componente antes de destruir el template del DOM.

IMAGEN CICLO DE VIDA COMPONENTES

Lo interesante aquí es ver cómo Angular provee un conjunto de *lifecycle hooks* o simplemente 'ganchos' para que los desarrolladores de componentes podamos hacer algo en cada etapa del ciclo de vida, cuando lo deseemos. Esto nos permite realizar operaciones a demanda. Por ahora veremos solo los tres más comunes:

- **OnInit**: Inicialización del componente. Es un buen lugar para obtener los datos del backend.

- **OnChanges**: Ejecutar acciones después del cambio de input properties. Todavía no hemos visto este tipo de properties pero nos permiten hacer cosas interesantes.

- **OnDestroy**: Para hacer un limpiado de los recursos que usa el componente (un CleanUp) antes de que el componente muera

Para usar un *lifecycle hook*, necesitamos hacer que nuestro componente implemente la interfaz existente para el gancho que se desee usar. Haremos una implementación de estas interfaces (donde cada interfaz tiene simplemente un método), y le daremos nuestra lógica particular.

Cada hook/interfaz define un método que es ```ngNombreHook```. Por ejemplo la interfaz ```OnInit``` define el hook ```ngOnInit```.

Hagamos un ejemplo muy simple implementando justamente ```OnInit```:

1) Importemos la interfaz ```OnInit``` desde '@angular/core':

```typescript 
import { Component, OnInit } from '@angular/core';
```

2) Nuestra clase de nuestro component ```PetListComponent``` debe ahora implementar ```OnInit```:

```typescript 
export class PetListComponent implements OnInit {...}
```

3) Implementamos ```ngOnInit``` en la clase:

```typescript
ngOnInit(): void {
    console.log("aca obtengo datos del backend!");
}
```

4) Guardemos los cambios, vayamos al explorador y apretemos ```F12``` (en Windows) o ```Command + Option + I``` (en Mac) para entrar a las developer tools del navegador y ver si efectivamente se loggeó algo en la consola o no:

IMAGEN LOG CONSOLA

## Custom Pipes: Filtrado en el listado de mascotas

Como vimos al final de la clase anterior (Clase 9: Angular Parte 2), Angular provee un conjunto de Pipes que ya vienen integrados y que sirven para transformar los datos de nuestras bound properties antes de mostrarlos en el template (HTML). Ahora veremos como construir nuestros propios, Pipes personalizados, o *Custom Pipes*. 

El código necesario para crearlos seguramente a esta altura ya nos resulte familiar:

```typescript
//1) Nos creamos nuestra propia clase PetFilterPipe
export class PetFilterPipe implements PipeTransform //2) Implementamos la interfaz PipeTransform
{ 
    
    transform(value: Array<Pet>, filterBy : string) : Array<Pet> //3) Método de la interfaz a implementar
    {
        //4) Escribimos el código para filtrar las mascotas
        // El primer parametro 'value', es el valor que estamos transformando con el pipe (la lista de mascotas)
        // El segundo parametro 'filterBy', es el criterio a utilizar para transfmar el valor (para filtrar las mascotas)
        // Es decir, lo que ingresó el usuario
    }
}
```
