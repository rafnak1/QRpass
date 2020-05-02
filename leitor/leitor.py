from picamera import PiCamera
from pyzbar.pyzbar import decode
from PIL import Image
from os import system
from time import time
from time import sleep

negative_answer = b'no match'
gui_app = 'feh'
kiosk_switch = '-F -Z'
server_url = 'https://ilhabela-c33df.web.app/?qr='
path = '/home/pi/QRpass/'

no_usr_match = 'no-usr-match.png'
no_event_match = 'no-event-match.png'
event_found = 'event-locked.png'
off_sync = 'off-sync.png'

#The following are small functionalities. ----------

#Returns the server's answer (in bytes) from the "response" file.
def readResponse():
    global path
    with open(path + 'response', 'rb') as resp:
        response = resp.read()
    return response

def curlToServer(payload):
    global server_url
    global path
    system('curl ' + server_url + str(payload, 'utf-8') + ' -o ' + path + 'response')

def refreshWindow(new_window):
    global gui_app

    with open('window-order', 'w') as order:
        order.write(new_window)

    system('wmctrl -c ' + gui_app)

#The following are logical functionalities. ------------

def preSync():
    global negative_answer
    global no_event_match
    global event_found
    global synced
    global sync_QR

    curlToServer(QR[0].data)
            
    if readResponse() == negative_answer:
        refreshWindow(no_event_match)

    else:
        refreshWindow(event_found)
        sync_QR = QR[0].data
        synced = True


def postSync():
    global negative_answer
    global synced
    global cycle_count
    global no_usr_match

    #It should turn off when the sync QR is shown once again.
    if QR[0].data == sync_QR and cycle_count > 0:
        system('shutdown now')
    
    else:   
        #send qr data in GET request; let's see if it's a valid user QR...
        curlToServer(QR[0].data) 

        if readResponse() == negative_answer:
            refreshWindow(no_usr_match)

        else:   #if response isn't "no match", then it must have found a picture.
            refreshWindow('response')

#main-------------

sleep(25)

refreshWindow(off_sync)

sync_QR = b'0'
synced = False

#prepare camera
camera = PiCamera()
camera.resolution = (1024, 768)

cycle_count = 0

while True:
    t0 = time()
    
    while time() - t0 < 30:
        
        camera.capture('rbpic.jpg')
        QR = decode(Image.open(path + 'rbpic.jpg'))
 
        if len(QR) != 0:
        
            if not synced:
                preSync()
            
            else:
                postSync()
    
    #refreshes window every 30 seconds
    system('wmctrl -c ' + gui_app)
    
    if synced:
        cycle_count += 1
