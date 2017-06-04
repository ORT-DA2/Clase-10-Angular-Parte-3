# Angular: Conceptos avanzados

Seguimos con conceptos de Angular: Interfaces, Custom Pipes, Lifecycle Hooks, Nested Components y Servicios.

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
5) Componentes anidados o Nested components
6) Servicios e Inyección de dependencias

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

import { Pipe, PipeTransform } from '@angular/core'; //0) importamos

//1) Nos creamos nuestra propia clase PetFilterPipe y la decoramos con @Pipe

@Pipe({
    name: 'petFilter'
})
export class PetFilterPipe implements PipeTransform //2) Implementamos la interfaz PipeTransform
{ 
    transform(value: Array<Pet>, filterBy : string) : Array<Pet> //3) Método de la interfaz a implementar
    {
        //4) Escribimos el código para filtrar las mascotas
        // El primer parametro 'value', es el valor que estamos transformando con el pipe (la lista de mascotas)
        // El segundo parametro 'filterBy', es el criterio a utilizar para transfmar el valor (para filtrar las mascotas)
        // Es decir, lo que ingresó el usuario
        // El retorno es la lista de mascotas filtrada
    }
}
```

Como podemos ver, tenemos que crear una **clase**, y hacerla que implemente la interfaz **PipeTransform**. Dicha interfaz tiene un método **transform** que es el que será encargado de filtrar las mascotas. A su vez decoramos la clase con un ```@Pipe``` que hace que nuestra clase sea un Pipe. Como notamos, la experiencia a la hora de programar en Angular es bastante consistente, esto es muy similar a cuando creamos componentes.

Luego, para usar este CustomPipe en un template, debemos hacer algo así:

```html
<tr *ngFor='let pet of pets | petFilter:listFilter'> </tr>
```

Siendo:

- petFilter: el pipe que acabamos de crear.
- listFilter: el string por el cual estaremos filtrando.

Si quisieramos pasar más argumentos además del listFilter, los ponemos separados por ```:```.

También nos falta agregar el Pipe a nuestro módulo. Si queremos que el componente pueda usarlo, entonces debemos decirle a nuestro AppModule que registre a dicho Pipe. Siempre que queremos que un Componente use un Pipe, entonces el módulo del componente debe referenciar al Pipe. Lo haremos definiendo al Pipe en el array ```declarations``` del decorador ```ngModule``` de nuestro módulo.

Armemos el Pipe!

### 1) Creamos un archivo para el Pipe

Creamos en la carpeta ```app/pets```, un ```pet-filter-.pipe.ts```, siguiendo nuestras convenciones de nombre.

### 2) Agregamos la lógica del Pipe:

```typescript
import { Pipe, PipeTransform} from '@angular/core';
import { Pet } from './pet';

@Pipe({
    name: 'petFilter'
})
export class PetFilterPipe implements PipeTransform {

    transform(value:Array<Pet>, filterBy:string): Array<Pet> 
    {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        // usamos programacíon funcional (similar a las lambdas expressions en .NET)
        // esto se llama 'arrow syntax' (por la flechita :P)
        return filterBy ? value.filter((pet:Pet) =>
        pet.name.toLocaleLowerCase().indexOf(filterBy) != -1) : value;
    }
}
```

En caso de que no tengan la clase Pet separada, creen un ```pet.ts```, y luego pongan el código de la clase Pet ahí. Ver el código fuente para tener una referencia.

### 3) Agregamos el filtrado en el template y sus estilos

Vamos a ```pet-list.component.html``` y donde usamos ```*ngFor```, agregamos el filtrado tal cual lo vimos arriba:

```html
<tr *ngFor='let aPet of pets | petFilter : listFilter'>
```

### 4) Agregamos el Pipe a nuestro AppModule

Vamos a ```app.module.ts``` y agregamos el pipe:

```typescript

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PetFilterPipe } from './pets/pet-filter.pipe'

import { AppComponent }  from './app.component';
import { PetListComponent }  from './pets/pet-list.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, PetListComponent, PetFilterPipe],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

```
### 5) Veamos el filtrado!

IMAGEN FILTRO 1

IMAGEN FILTRO 2

## Componentes anidados o Nested components

Muchas veces nuestra aplicación va a tener features que son lo suficientemente complejas como para tratarlas de forma aislada, o donde existe una gran posibilidad de generar reuso en diferentes casos de uso, y por ende separarlas en componentes diferentes.

Veremos ahora como hacer componentes anidados o `Nested Componentes` y como generar interacción entre el componente **contenedor** y el componente **anidado**. Estos componentes van a mandar datos de un lado para el otro, usando inputs y mandando outputs al componente contenedor.

Hay dos formas de usar componentes anidados:

1) A traves de su directiva (como ya vimos en el index.html)
2) A traves de routing, indicandole a un componente que tiene que rutear a otro componente (lo veremos más adelant cuando demos routing). 

Por ahora usaremos la opción 1. El criterio que utilizaremos para indicar si un componente es 'anidable' o no, es simplemente a partir de **evaluar si su template maneja una parte de una view más grande, y obviamente si tiene un selector y una forma de comunicación con su contenedor**.

IMAGEN CONTENEDOR Y NESTED COMPONENT

Supongamos que nuestras mascotas en LUPI tienen una popularidad asociada. Creemos ahora un nested component que lo que haga es mostrar estrellitas por cada mascota que tengamos. Lo que queremos hacer es que el mostrado de estrellitas sea un componente aparte, que maneje su propia interacción tanto de inputs de sus componentes contenedores, como de outputs hacia otros componentes.

### 1) Creamos los archivos para nuestro StarComponent

En primer lugar, creamos una carpeta ```app/shared``` donde tenemos todos los componentes reusables (como este). Ahí
creamos los siguientes archivos:

- ```star.component.ts```
- ```star.component.html```
- ```star.component.css```

### 2) Creamos el StarComponent 

Dentro de ```star.component.ts```, pegamos el siguiente código:

```typescript
import { Component, OnChanges } from '@angular/core';

@Component({
    selector: 'da2-star', //le ponemos un nombre reusable (nuestra compañia)
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    rating: number = 4; //hardcodeamos un valor por defecto para ver algo
    starWidth: number;

    ngOnChanges():void {
        //86 es el width de nuestras estrellitas (ver el template)
        //como estamos implementando el OnChanges, cada vez que el valor de 'rating' cambie
        //esto se va a refrescar
        this.starWidth = this.rating * 86/5; 
    }
}
```

### 3) Creamos el Template para nuestro StarComponent y sus estilos

Dentro de ```star.component.html```, pegamos el siguiente código:

```html
<div clas="crop"
    [style.width.px]="starWidht"
    [title]="rating">
    <div style="width:86px">
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
    </div>
</div>
```

A su vez, vamos a ```star.component.css```, y pegamos el siguiente código:

```css
.crop {
    overflow: hidden;
}

div {
    cursor: pointer;
}
```

### 4) Agregamos el StarComponent al AppModule

Dentro de ```app.module.ts```, reemplazamos lo que hay y pegamos el siguiente código:

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PetFilterPipe } from './pets/pet-filter.pipe'

import { AppComponent }  from './app.component';
import { PetListComponent }  from './pets/pet-list.component';
import { StarComponent }  from './shared/star.component'; //importamos el starcomponent


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, PetListComponent,StarComponent, PetFilterPipe], //agregamos a las declarations
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

### 5) Usamos el StarComponent dentro de PetListComponent

En el template de nuestro componente de listado de mascotas, es decir dentro de ```pet-list.component.html```, agregamos:

Dentro del header de la tabla, es decir, en el tag ```thead```, agregamos esta última celda:

```html
<th>Rating</th>
```

Dentro del body de la tabla, es decir, en el tag ```tbody```, y dentro del ```*ngFor``` sobre las rows, agregamos esta última celda:

```html
<td> 
   <da2-star></da2-star>
</td>
```

### 6) Usando input properties

Vemos que se muestran 5 estrellas y no 4 como habíamos hardcodeado. Ni que tampoco se modifica el valor en el OnChanges (esto es porque el OnChanges se cambia cuando alguna input property de un componente se refresca). Veamos esto:

Si un Nested Component quiere recibir inputs de su componente contenedor, debe exponer properties a partir del decorador ```@Input```. En consecuencia, cada property deberamos decorarla con tal decorador. Luego, el componente contenedor, deberá encargarse  de setearle dicha property al componente anidado a partir de property binding en el template con paréntesis rectos:

```typescript
<td> 
    <da2-star [rating]='aPet.rating'></da2-star>
</td>
```

Para hacer lo de arriba precisamos:

- Ir a ```app/pets/pet.ts``` y agregar la property rating
- Ir a ```app/pets/pet-list.component.ts``` y agregar un valor de rating en las mascotas que tengamos creadas.

Esto no se describe aquí pero se puede observar en el código fuente.

Lo que haremos es ir al HTML del template y cambiar lo que teníamos antes por lo que acabamos de ver arriba.

### 7) Definimos la Input Property Rating en StarComponent

Para ello precisamos importar Input:

```typescript
import { Component, OnChanges, Input } from '@angular/core';
```

Y luego agregar el decorador a la property ```rating```:

```typescript
@Input() rating: number;
```

Veamos como resulta el listado (agregué algunas mascotas de más para tener referencia):

IMAGEN LISTADO MASCOTA CON ESTRELLITAS

### 8) Levantando eventos desde un componente anidado

Si queremos que nuestro StarComponent se comunique con su contenedor PetListComponent, debemos usar eventos. Para ello tenemos que usar, para definirlos, el decorator ```@Output```, el cual debemos aplicar sobre la property del componente anidado que queremos usar (es importante notar que el tipo de dicha property debe ser un ```EventEmitter```, la única forma de pasar datos a su contenedor). A su vez, dicha clase se basa en generics para especificar el tipo de datos de lo que queremos pasar al componente contenedor.

La forma que usaremos para activar el evento, es a partir del método click sobre las estrellas; una vez que se haga el click, se activará la lógica que definamos del evento.

La sintaxis para activar al evento desde nuestros componentes anidados es:

onClick() {
    this.nombreDelEvento.emit('parametro a pasar al contenedor');
}

Siendo ```emit``` lo que usamos para levantar el evento al contenedor.

Vayamos al código:

Lo primero que hacemos es importar ```EventEmitter``` y ```Output``` en nuestro ```StarComponent```:

```typescript
import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
```

Luego definimos la property del evento en nuestra clase del StarComponent:

```typescript
@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
```

Luego hacemos el binding del evento en el template del evento:

```html
<div class="crop" 
    [style.width.px]="starWidth"
    title={{starWidth}}
    (click)='onClick()'>
    <div style="width: 86px">
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
    </div>
</div>
```

Y ahora volvemos al StarComponent y agregamos la funcion onClick que acabamos de declarar en nuestro template:

```typescript
onClick(): void {
    this.ratingClicked.emit(`El puntaje ${this.rating}fue clickeado!`);
}
```

Finalmente, lo que haremos es agregar es la referencia al evento en el template:

```html
 <da2-star [rating]='aPet.rating'
    (ratingClicked)='onRatingClicked($event)'>
</da2-star>
```

Y dentro del código del PetListComponent definimos el callback que queremos que se ejecute cuando se haga click en nuestras estrellas:

```typescript
onRatingClicked(message:string):void {
    this.pageTitle = 'Pet List: ' + message;
}
```

## Servicios e Inyección de Dependencias

Los componentes nos permiten definir lógica y HTML para una cierta pantalla/vista en particular. Sin embargo, ¿qué hacemos con aquella lógica que no está asociada a una vista en concreto?, o ¿qué hacemos si queremos reusar lógica común a varios componentes (por ejemplo la lógica de conexión contra una API, lógica de manejo de la sesión/autenticación)?

Para lograr eso, construiremos **servicios**. Y a su vez, usaremos **inyección de dependencias** para poder meter/inyectar esos servicios en dichos componentes. 

Definiendo servicios, son simplemente clases con un fin en particular. Los usamos para aquellas features que son independientes de un componente en concreto, para reusar lógica o datos a través de componentes o para encapsular interacciones externas. Al cambiar esta responsabilidades y llevarlas a los servicios, nuestro código es más fácil de testear, debuggear y mantener.

Angular trae un ```Injector``` *built-in*, que nos permitirá registrar nuestros servicios en nuestros componentes, y que estos sean Singleton. Este Injector funciona en base a un contenedor de inyección de dependencias, donde una vez estos se registran, se mantiene una única instancia de cada uno.

Supongamos tenemos 3 servicios: svc, log y math. Una vez un componente utilice uno de dichos servicios en su constructor, el Angular Injector le provee la instancia del mismo al componente.

IMAGEN INY DEPENDENCIAS

### Construyamos un servicio

Para armar nuestro servicio precisamos:

- Crear la clase del servicio.
- Definir la metadata con un @, es decir un decorador.
- Importar lo que precisamos.

¿Familiar? Son los mismos pasos que hemos seguido para construir nuestros componentes y nuestros custom pipes :)

### 1) Creamos nuestro servicio

Vamos a ```app/pets``` y creamos un nuevo archivo: ```pet.service.ts```. 

Luego, le pegamos el siguiente código:

```typescript

import { Injectable } from '@angular/core';
import { Pet } from './pet';
@Injectable()
export class PetService {
    
    // esto luego va a ser una llamada a nuestra api REST
    getPets(): Array<Pet> {
        return [
            new Pet("1","Bobby",4,"Grande", new Date(),20,"Golden Retriever", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Golden_Retriever_with_tennis_ball.jpg/1200px-Golden_Retriever_with_tennis_ball.jpg", 3),
            new Pet("2","Diana",4,"Mediana", new Date(),10,"Perro", "https://scontent.fmvd2-1.fna.fbcdn.net/v/t1.0-9/11056439_10152650173091621_5526444138839272280_n.jpg?oh=4f2cf438d3ecd07824ccb23fe148ad05&oe=59E7EAB0", 4),
            new Pet("3","Lupita",4,"Chica", new Date(),2.5,"Perro", "https://scontent.fmvd2-1.fna.fbcdn.net/v/t31.0-8/14991469_742030209278747_4126962164878937004_o.jpg?oh=1101068589fc36de2f6d25f9b858c4cf&oe=59DC5DDD", 5),
        ];
    }

}
```

### 2) Registramos nuestro servicio a través de un provider

Para registrar nuestro servicio en nuestro componente, debemos registrar un Provider. Un provider es simplemente código que puede crear o retornar un servicio, **típicamente es la clase del servicio mismo**. Esto lo lograremos a través de definirlo en el componente, o como metadata en el Angular Module (AppModule).

- Si lo registramos en un componente, podemos inyectar el servicio en el componente y en todos sus hijos. 
- Si lo registramos en el módulo de la aplicación, lo podemos inyectar en toda la aplicación.

En este caso, lo registraremos en el Root Component (```AppComponent```). Por ello, vamos a ```app.component.ts``` y reemplazamos todo el código para dejarlo así:

```typescript
import { Component } from '@angular/core';
import  { PetService } from './pets/pet.service'; //importamos el servicio

@Component({
  selector: 'my-app',
  template: `
    <h1>Curso de DA2 de {{name}}</h1>
    <p> <strong>Email:</strong> {{email}} </p>
    <p> <strong>Dirección:</strong> {{address.street}} {{address.number}} de la ciudad - {{address.city}} </p>
    <pm-pets></pm-pets>
  `,
  providers: [PetService] //registramos el provider en la metadata del AppComponent
})
export class AppComponent  
{
   name = 'Gabriel Piffaretti'; 
   email = "piffarettig@gmail.com";
   address = {
     street: "la dirección del profe",
     city: "Montevideo",
     number: "1234"
   }
}
```
