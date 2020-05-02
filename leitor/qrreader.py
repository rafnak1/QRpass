from picamera import PiCamera
from pyzbar.pyzbar import decode
from PIL import Image
from os import system
from time import time
from time import sleep

gui_app = 'feh'
kiosk_switch = '-F -Z'
server_url = 'https://ilhabela-c33df.web.app/?qr='
path = '/home/pi/proj/'

no_usr_match = 'nousrmatch.html'
no_event_match = 'noeventmatch.html'
event_found = 'eventlocked.html'
off_sync = 'offsync.html'

#Returns the server's answer (in bytes) from the "response" file.
def readResponse():
    global path
    with open(path + 'response', 'rb') as resp:
        response = resp.read()
    return response

def curlToServer(payload):
    global server_url
    global path
    system('curl ' + server_url + payload + ' -o ' + path + 'response')

def refreshWindow():
    global gui_app
    global current_window
    global kisk_switch
    system('wmctrl -c ' + gui_app)
    system(gui_app + ' ' + current_window + ' ' + kiosk_switch)

def preSync():
    pass #code!

def postSync():
    pass #code!

def job():
    global cycle_count
    global synced
    global current_window
    global server_url
    global path
    global sync_QR
    
    camera.capture('rbpic.jpg')
    QR = decode(Image.open(path + 'rbpic.jpg'))

    if len(QR) != 0:       
        if synced:
            if QR[0].data == sync_QR and cycle_count > 0:
                system('shutdown now')
            else:   #send qr data in GET request
                curlToServer(QR[0].data) 

                if readResponse == b'no match\n':
                    current_window = path + no__usr_match
                    refreshWindow()

                else:   #if response isn't "no match", then it must have found a picture.
                    current_window = path + response
                    refreshWindow()
        
        else:
            curlToServer(QR[0].data)
                        
            if readResponse() == b'no match':
                current_window = path + no_event_match
                refreshWindow()
            
            else:
                current_window = path + event_found 
                refreshWindow()
                sync_QR = QR[0].data
                synced = True

#main-------------

sleep(27)

updateWindow(off_sync)

sync_QR = b'0'
synced = False

#prepare camera
camera = PiCamera()
camera.resolution = (1024, 768)

cycle_count = 0

while True:
    t0 = time()
    while time() - t0 < 30:
        if not synced:
            preSync()
        else:
            postSync()
    
    #refreshes window every 30 seconds
    refreshWindow()

    cycle_count += 1
