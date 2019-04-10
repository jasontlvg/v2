// let statusSignal= document.getElementById("");

// let x= document.getElementById("led_1")
// let x= document.getElementById("thumb_btn");
// x.addEventListener("click", () => {
//     M.toast({html: 'I am a toast!'})
// });

// let y= document.getElementById("thumb_motor--1");
// let z= document.getElementById("thumb_motor--2");

// let f= function(){
//     y.classList.toggle("disabled");
//     z.classList.toggle("disabled");
// };


// // Boton
// let m= function(){
//     let btn= document.getElementById("thumb_btn");
//     grid_container.btn_status_data= "S T O P";
//     btn.classList.toggle("disabled");
//     btn.classList.add("stop");
//     let thumb_motor1= document.getElementById("thumb_motor--1");
//     thumb_motor1.classList.toggle("disabled");
// }

// // Close
// let c= function(){
//     grid_container.btn_status_data= "U N K N O W";
// }

// Color
let led_1= document.getElementById("led_1");
let led_2= document.getElementById("led_2");
let led_3= document.getElementById("led_3");

let azul= function(){
    led_1.classList.add("on");
    led_2.classList.remove("on");
    led_3.classList.remove("on");
};
let rojo= function(){
    led_2.classList.add("on");
    led_1.classList.remove("on");
    led_3.classList.remove("on");
};
let verde= function(){
    led_3.classList.add("on");
    led_2.classList.remove("on");
    led_1.classList.remove("on");
};