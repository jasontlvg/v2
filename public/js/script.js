const socket= io();
let autorizacionRun= false;
let servidorConectado=false;
let statusMotor= false;
let firstArduinoConnection=true;
let firstTimeSendAutorizationSupervisor=true;

// socket.on("chat:message", (data) => {
//     messageContainer.innerHTML += `<p class="container-chat__messages-container__message">${data}</p>`;
// });

var grid_container = new Vue({ 
    el: '#grid_container',
    data: {
        server_status_data: 'Disconnected',
        btn_status_data: 'U N K N O W',
        motor1_data: 0,
        motor2_data: 0
    }, 
    computed: {
        // Revisa en Tiempo Real 
        server_status_data_print: function(){
            if(this.server_status_data=="Connected"){
                thumb_status.classList.toggle("green");
                return "Connected"
            }else{
                let thumb_status= document.getElementById("thumb_status");
                thumb_status.classList.toggle("green");
                return "Disconnected"
            }
        },
        motor1_print: function(){
            if(servidorConectado){
                socket.emit("clientMotor1Value", this.motor1_data);
                console.log("emitimos al server motor1");
            }
            // console.log(this.motor1_data);
            let res= ((this.motor1_data)*100)/255;
            return Math.floor(res);
        },
        // motor2_print: function(){
        //     if(servidorConectado){
        //         socket.emit("motor1_control", this.motor1_data);
        //         console.log("emitimos al server motor2");
        //     }
        //     console.log(this.motor2_data);
        //     let res= ((this.motor2_data)*100)/255;
        //     return Math.floor(res);
        // },
        
    },
    methods:{
        btn_status_print: function(){
            let thumb_motor1= document.getElementById("thumb_motor--1");
            let btn= document.getElementById("thumb_btn");
            if(this.btn_status_data == "R U N"){
                if(autorizacionRun){
                    // this.btn_status_data= "S T O P";
                    // btn.classList.remove("run");
                    // btn.classList.add("stop");
                    // thumb_motor1.classList.toggle("disabled");
                    // firstTimeSendAutorizationSupervisor=true;
                }else{
                    if(firstTimeSendAutorizationSupervisor){
                        M.toast({html: 'Confirmacion de Confirmacion Enviada'})
                        firstTimeSendAutorizationSupervisor=false;
                        socket.emit("clientRunPermissionAsk", this.motor1_data);
                    }else{
                        M.toast({html: 'Esperando Autorizacion de Supervisor'})
                    }
                }
                // Si le damos STOP entonces, se desabilita
            }else if(this.btn_status_data == "S T O P"){ // CUANDO ESTA PRESIONAMOS STOP
                this.btn_status_data= "R U N";
                let btn= document.getElementById("thumb_btn");
                btn.classList.remove("stop");
                btn.classList.add("run");
                // Si le damos RUN entonces, se habilita
                thumb_motor1.classList.toggle("disabled");
                // Manda al Server
                socket.emit("clientEmergencyStop", 0);
                this.motor1_data= 0;
                console.log("Boton de Emergencia Presionado");
            }else{
                thumb_motor1.classList.add("disabled");
                btn.classList.add("disabled");
            }
        }
    },
    components: {
        circleslider: VueCircleSlider.VueCircleSlider
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems, {
        edge: "left"
    });
    // let el = M.Sidenav.getInstance(document.getElementById('slide-out')); // ID del SideNav
});

// Funciones para Activar/Desactivar el Boton
let stop_state= function(btn, thumb_motor1){
    grid_container.btn_status_data= "S T O P";
    btn.classList.toggle("disabled");
    btn.classList.add("stop");
    thumb_motor1.classList.toggle("disabled");
};
let run_state= function(btn, thumb_motor1){
    grid_container.btn_status_data= "R U N";
    btn.classList.remove("disabled");
    btn.classList.add("run");
};
let close_state= function(btn, thumb_motor1){
    grid_container.btn_status_data= "U N K N O W";
    grid_container.server_status_data="Disconnected"
    btn.classList.add("disabled");
    btn.classList.remove("run");
    btn.classList.remove("stop");
    thumb_motor1.classList.add("disabled");
};


let leds_off= function(){
    let led_1= document.getElementById("led_1");
    let led_2= document.getElementById("led_2");
    let led_3= document.getElementById("led_3");

    led_1.classList.remove("on");
    led_2.classList.remove("on");
    led_3.classList.remove("on");
}


let i= function(){
    let btn= document.getElementById("thumb_btn");
    let thumb_motor1= document.getElementById("thumb_motor--1");
    run_state(btn, thumb_motor1);
    servidorConectado= true;
}
let p= function(){
    let btn= document.getElementById("thumb_btn");
    let thumb_motor1= document.getElementById("thumb_motor--1");
    run_state(btn, thumb_motor1);
    servidorConectado= true;
}

// ChartJS
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: ["Azul", "Rojo", "Verde"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: [
                'rgba(21, 101, 192, 1)',
                'rgba(211, 47, 47, 1)',
                'rgba(76, 175, 80, 1)'
            ],
            // borderColor: 'rgb(255, 99, 132)',
            data: [35, 35, 35],
        }]
    },

    // Configuration options go here
    options: {responsive: true}
});

