
 run `npm install`
node server.js or  run `npm start` // 
    
	
	
}

node default port  is 3006 to change  go server.js and change port 

chat defaut port is 3066  to change  go server.js and change port C:\...\Iparking\BackEnd\routes\chatController\chatServer.js
  to change DB fo DB.js

kafka defaut port 9092
/home/bamec/IoT/Iparking/Backend/routes/kafkaController/consumerController.js
to add a device: add it by direct application without postman

// Pour ajouter une licence
Post (localhost:3007/api/addLicense)

{
	"Company":"Treetronix",
	"nbrDevices":"1000",
	"expirationDate":"2022-02-22"
}
//////// Pour ajouter un global Sensor
Post (localhost:3007/api/addingCapteur)
{
	"code":"FFFFFF100001BE99",
	"type":"winext"
}


{
	"code":"FFFFFF1000016337",
	"type":"winext"
}


price en millimes

email alerte : /home/bamec/IoT/Iparking/Backend/routes/parkController.js

email :/home/bamec/IoT/Iparking/Backend/routes  =>nodeMailer.js
