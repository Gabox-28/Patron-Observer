// Clase sujeto, que contiene un arreglo con los observadores y los métodos para agregar y eliminar observadores

class Subject{
    constructor(){
    this.observers = [];
  }
  subscribe(observer){
    this.observers.push(observer);
  }
  unsubscribe(observer){
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  // Método que notifica a los observadores, recorriendo todo el arreglo de observadores y llamando al método notify
  notify(model){
      this.observers.forEach(observer => {
        observer.notify(model);
      });
  }
}

// Esta clase es la se encarga de manejar el texto que se va a mostrar en el DOM de cada observador

class TextSubject extends Subject{
  constructor(){
    super();
    this.text = '';
  }
  notify(text){
    this.text = text;

    super.notify(this);
  }
}

// En estas tres clases se define lo que hará cada observador

class Block1Observer{
  notify(subject){
    document.querySelector('#block1').innerHTML = subject.text;
  }
}

class Block2Observer{
  notify(subject){
    document.querySelector('#block2').innerHTML = subject.text.length;
  }
}

class Block3Observer{
  notify(subject){
    if(subject.text.length > 5 && subject.text.length < 10){
        document.querySelector('#block3').style.backgroundColor = '#03611f';
    }else if(subject.text.length > 10 && subject.text.length < 15){
        document.querySelector('#block3').style.backgroundColor = '#8c840f';
    }else if (subject.text.length > 15){
        document.querySelector('#block3').style.backgroundColor = '#660202';
    }
  }
}

// Se crean una instancias de la clases

var textSubject = new TextSubject();
let block1 = new Block1Observer();
let block2 = new Block2Observer();
let block3 = new Block3Observer();

// Definimos el elemento que va a ser observado
const inputBox = document.querySelector('#text');

// Observamos el elemento para notificar al sujeto cuando se realice un cambio
inputBox.addEventListener('input', (e) => {
    textSubject.notify(e.target.value);
});

// Declaro los botones que suscriben y desuscriben a los observadores

const btn_s1 = document.querySelector('#btn-s1');
const btn_s2 = document.querySelector('#btn-s2');
const btn_s3 = document.querySelector('#btn-s3');
const btn_d1 = document.querySelector('#btn-d1');
const btn_d2 = document.querySelector('#btn-d2');
const btn_d3 = document.querySelector('#btn-d3');

btn_s1.addEventListener('click', () => {
    textSubject.subscribe(block1);
});
btn_s2.addEventListener('click', () => {
    textSubject.subscribe(block2);
});
btn_s3.addEventListener('click', () => {
    textSubject.subscribe(block3);
});

btn_d1.addEventListener('click', () => {
    textSubject.unsubscribe(block1);
});
btn_d2.addEventListener('click', () => {
    textSubject.unsubscribe(block2);
});
btn_d3.addEventListener('click', () => {
    textSubject.unsubscribe(block3);
});
