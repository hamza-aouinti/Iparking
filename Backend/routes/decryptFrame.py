import sys
import json


FrameText =  sys.argv[1]
typestr=FrameText[0:2]
#print('typestr:'+typestr)
statusparkingstr=FrameText[20:22]
#print('Parking status:'+statusparkingstr)
statusparking=bin(int(statusparkingstr,16))
#print(statusparking)
status=int(statusparking[:1])
#print(status)
batterystr=statusparking[2:]
#print(batterystr)
battery=str(int(statusparking[2:] , 2)*0.1)
#print(battery)


data = { 
             
		'status':status,
		'battery':battery
            }
data_json = json.dumps(data)
print(data_json)