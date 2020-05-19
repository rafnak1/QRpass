from picamera import PiCamera
from pyzbar.pyzbar import decode
from PIL import Image
from os import system
from time import time
from time import sleep

negative_answer = b'no match'
kiosk_switch = '-F -Z'
server_url = 'https://user-media-prod-cdn.itsre-sumo.mozilla.net/uploads/gallery/images/2019-12-09-15-54-23-5c1f02.png?qr='
path = '/home/pi/debug/'

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
    global path

    with open(path + 'open-order', 'w') as f:
        f.write(new_window)

    with open(path + 'close-order', 'w') as f:
        f.write('b')

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
    global path

    #It should turn off when the sync QR is shown once again.
    if QR[0].data == sync_QR and cycle_count > 0:
        with open(path + 'kill-order', 'w') as f:
            f.write('do')
    
    else:   
        #send qr data in GET request; let's see if it's a valid user QR...
        curlToServer(QR[0].data) 

        if readResponse() == negative_answer:
            refreshWindow(no_usr_match)

        else:   #if response isn't "no match", then it must have found a picture.
            refreshWindow('response')

#main-------------

sleep(20)

#initiallize kill-order
with open(path + 'kill-order', 'w') as f:
    f.write('dont')

#initiallize close-order with 'a' to callibrate close.py
with open(path + 'close-order', 'w') as f:
    f.write('a')

#set initial screen
refreshWindow(off_sync)

#prepare camera
camera = PiCamera()
camera.resolution = (1024, 768)

#set variables
cycle_count = 0
sync_QR = b'0'
synced = False

t0 = time()

while True: 
    #continuous job
    camera.capture(path + 'rbpic.jpg')
    QR = decode(Image.open(path + 'rbpic.jpg'))
    print(QR)

    if len(QR) != 0:
        print('the reader caught something...')
    
        if not synced:
            preSync()
        
        else:
            postSync()
    
    #"Every-30-seconds" job
    if synced and time() - t0 > 30:
        cycle_count += 1
        t0 = time()
