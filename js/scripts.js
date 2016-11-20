//Zadanie nr 1
(function() {

  if(typeof String.prototype.repeat === "function" ) return; //Sprawdzenie typu obiektu (sprawdzenie metody czy itnieje sprawdzenie czy pod String.prototype istnieje jakaś funkcja)
  String.prototype.repeat = function(count){
    var output = "";
    for(var i = 0; i<count; i++){
      output += this.toString();
    }
    return output;
  };

})();
//Koniec zadania nr 1

//Zadanie nr 2
function EventEmitter() {
    this.events = {};
}
EventEmitter.prototype.on = function(type, fn) {

    if(!type || !fn) return;

    this.events[type] = this.events[type] || [];
    this.events[type].push(fn);

};
EventEmitter.prototype.emit = function(type, data) {

    var fns = this.events[type];

    if(!fns || !fns.length) return;

    for(var i = 0; i < fns.length; i++) {
        fns[i](data);
    }

};
function Database(url) {

    this.url = url;
    EventEmitter.call(this);

}

Database.prototype = EventEmitter.prototype;

Database.prototype.connect = function() {

    // fikcyjne podłączenie do bazy

    this.emit("connect", this.url);

};

Database.prototype.disconnect = function() {

    // fikcyjne zakończenie połączenia z bazą

    this.emit("disconnect", this.url);

};

// Użycie EventEmittera
var ev = new EventEmitter();

ev.on("hello", function(message) {
    console.log("Witaj " + message + "!");
});

ev.on("hello", function(message) {
    console.log("Siema " + message + ".");
});

ev.on("goodbye", function() {
    console.log("Do widzenia!");
});

ev.emit("hello", "Tytus");
ev.emit("goodbye");
ev.emit("custom"); // nic się nie wydarzy

// DO ZROBIENIA!
// Docelowe użycie klasy Database
var db = new Database("db://localhost:3000"); // fikcyjny adres

db.on("connect", function(url) {
    console.log("Połączenie z bazą pod adresem " + url + " zostało ustanowione.");
});

db.on("disconnect", function(url) {
    console.log("Połączenie z bazą pod adresem " + url + " zostało zakończone.");
});

db.connect();

// po 5 sekundach rozłączamy się
setTimeout(function() {
    db.disconnect();
}, 5000);

//Koniec zadania nr 2

//Zadanie nr 3

function giveData(url, success, fail) {

  var xhr = new XMLHttpRequest();
  xhr.open("GET",url,true);

  xhr.onload = function() {
    if(xhr.status == 200) {
      success(xhr.responseText);
    }else {
      fail(new Error("Wystąpił błąd !. Status HTTP to: " + xhr.status) );
    }
  };
  xhr.onerror = function(e){
    fail(new Error("Wystąpił nieczekiwany błąd !"));
  };
  xhr.send();
}

(function(){

  var button = document.querySelector(".getDataButton"),
      output = document.querySelector(".output");

  button.addEventListener("click",function(e){

    giveData("https://jsonplaceholder.typicode.com/users", function(data){

      console.log("sukces");

      output.textContent = data;

    }, function(err){

      console.log(err.message);
        button.prop("disabled", true);
    });

  }, false);


})();
//Koniec zadania nr 3

//Zadanie nr 4
(function(){
function createData(obj) {

    var data = obj;

    return {
      get: function(key) {
        return data[key] || null;
      },
      set: function(key,value){
        if(!key && !value){
          throw new Error('Podaj poprawnie klucz i wartosc');
        }
        data[key] = value;
      }
    };
  }

var data = createData({});
data.set("name", "Marcin info do zadania 4");
console.log( data.get("name") );

})();

//Koniec zadania 4

//Zadanie 5

function Toggler(selector) {
  this.elem = document.querySelector(selector);
}

Toggler.prototype.getElem = function(){
  return this.elem;
};
Toggler.prototype.show = function(){
  this.elem.style.display = "";
};
Toggler.prototype.hide = function(){
  this.elem.style.display = "none";
};

(function(){

var elem = new Toggler(".textsection");
var button = document.querySelector(".buttonData");

elem.hide();

button.addEventListener("click", function() {

    if(elem.getElem().style.display == "none") {
        elem.show();
        button.textContent = button.dataset.hide;
    } else {
        elem.hide();
        button.textContent = button.dataset.show;
    }

}, false);

}) ();

//Koniec zadania 5
