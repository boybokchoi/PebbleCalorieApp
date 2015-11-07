/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

//Dependencies
var dep1 = require('notification');
dep1.vibratePebble();
//************

var UI = require('ui');
var Vector2 = require('vector2');

var calorieCount = 0;
var calorieLimit = 2000;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd;
} 

if(mm<10) {
    mm='0'+mm;
} 

today = mm+'/'+dd+'/'+yyyy;


// Read a key's value. May be null!
var key = 1;
var storageCalorie = localStorage.getItem(key);

if (storageCalorie !== null){
  calorieCount = parseInt(storageCalorie);
}

var key2 = 2;
var storageCalorie2 = localStorage.getItem(key2);

if (storageCalorie2 !== null){
  calorieLimit = parseInt(storageCalorie2);
}



var main = new UI.Card({
  title: 'Calories',
  subtitle: today,
  body: calorieCount.toString() + "\n" + "Press select to enter calories"
});

main.show();

main.on('click', 'up', function(e) {



  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Calorie limit',
        icon: 'images/menu_icon.png',
        subtitle: calorieLimit.toString()
      }, {
        title: 'Set time',
        subtitle: 'Time to reset calories'
      }]
    }]
  });
  menu.on('select', function(e) {
     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
  var limitWindow = function(){
  var counter = calorieLimit;
  var calorieLimitWindow = new UI.Window({
    fullscreen: true,
  });  
    var txtLimit = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: counter.toString(),
    textAlign: 'center'
  });
  calorieLimitWindow.add(txtLimit);
  calorieLimitWindow.show();
  calorieLimitWindow.on('click', 'up', function(e) {
    counter += 50;
    txtLimit.text(counter.toString());
  });
  if (counter !== 0 && counter - 50 >= 0){    
    calorieLimitWindow.on('click', 'down', function(e) {      
      counter -= 50;
      txtLimit.text(counter.toString());  
    });
  }
   calorieLimitWindow.on('click', 'select', function(e) {
    calorieLimit = counter;
     menu.item(0, 0, {subtitle: calorieLimit.toString()});
    
    // Write a key with associated value
    localStorage.setItem(key2, calorieLimit);
    calorieLimitWindow.hide();
    menu.show();
    
  });
};
    if(e.itemIndex === 0){
      limitWindow();
    }
    if(e.itemIndex === 0){
      timeWindow();
    }
    
  });
  menu.show();
});

main.on('click', 'down', function(e) {
  calorieCount = 0;
  localStorage.setItem(key, calorieCount);  
   main.body(calorieCount.toString()+ "\n" + "Press select to enter calories");
});
        
main.on('click', 'select', function(e) {

  var counter = 0;
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: "0",
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
  wind.on('click', 'up', function(e) {
    counter += 50;
    textfield.text(counter.toString());
  });
  if (counter !== 0 && counter - 50 >= 0){    
    wind.on('click', 'down', function(e) {      
      counter -= 50;
      textfield.text(counter.toString());  
    });
  } 
  wind.on('click', 'select', function(e) {
    calorieCount = calorieCount + counter;
    main.body(calorieCount.toString()+ "\n" + "Press select to enter calories");
    
    // Write a key with associated value
    localStorage.setItem(key, calorieCount);
    
    wind.hide();
    main.show();
    
  });
});
