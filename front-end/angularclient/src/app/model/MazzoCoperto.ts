// import { Mazzo } from './Mazzo';
// import { Carta } from './Carta';
// import { Simbolo } from './Simbolo.enum';
// import { Valore } from './Valore.enum';

// export class MazzoCoperto extends Mazzo {

//     private simboli: string[] = ['Quadrato', 'Triangolo', 'Cerchio', 'Ancora'];
//     private valori: string[] = ['1', '2', '3', '4', '5', '6', '7']

//     constructor() {
//         super();
//         for (let s of Simbolo) {
//             for (let v of Valore) {
//                 this.getListaCarte().push(new Carta(s, v));
//             }
//         }
//         for(let i=0;i<5;i++){
//         this.getListaCarte().push(new Carta('Punta', '0'));
//         }
//             this.listaCarte=this.shuffle(this.getListaCarte());
//     }

//     public  shuffle(array: any[]): any[] {
//         var currentIndex = array.length, temporaryValue, randomIndex;

//         // While there remain elements to shuffle...
//         while (0 !== currentIndex) {

//             // Pick a remaining element...
//             randomIndex = Math.floor(Math.random() * currentIndex);
//             currentIndex -= 1;

//             // And swap it with the current element.
//             temporaryValue = array[currentIndex];
//             array[currentIndex] = array[randomIndex];
//             array[randomIndex] = temporaryValue;
//         }

//         return array;
//     }

// }
