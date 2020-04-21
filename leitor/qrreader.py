from picamera import PiCamera
from pyzbar.pyzbar import decode
from PIL import Image
from os import system
from time import time

def refreshwindow():
    global currwindow
    system('wmctrl -c firefox')
    system('firefox ' + currwindow + ' kiosk')

def job():
    global cyclecount
    global sync
    global currwindow

    serverurl = 'https://ilhabela-c33df.web.app/'

    camera.capture('rbpipic.jpg')
    QR = decode(Image.open('/home/pi/proj/rbpipic.jpg'))

    if len(QR) != 0:
        if sync:
            if QR[0].data == syncQR and cyclecount > 0:
                system('shutdown now')
            else:   #send qr data in GET request
                system('curl ' + serverurl + '?'+ 'q=' + str(QR[0].data, 'utf-8') + ' -o response')
                
                with open('/home/pi/proj/response', 'rb') as resp:
                    response = resp.read()
                if response == b'no match':
                    currwindow = '/home/pi/proj/nousrmatch.html'
                    refreshwindow()

                else:   #if response isn't "no match", then it must have found a picture.
                    currwindow = '/home/pi/proj/response'
                    refreshwindow()
        else:
            #send qr data in GET request
            system('curl ' + serverurl + '?' + 'q=' + str(QR[0].data, 'utf-8') + ' -o response')
            
            with open('/home/pi/proj/response', 'rb') as resp:
                response = resp.read()
            
            if response == b'no match':
                currwindow = '/home/pi/proj/noeventmatch.html'
                refresh()
            
            else:
                currwindow = '/home/pi/proj/eventlocked.html'
                refresh()
                syncQR = QR[0].data
                sync = True

#main-------------

sync = False

#prepare camera
camera = PiCamera()
camera.resolution = (1024, 768)
camera.start_preview()

#open "offsync" window
currwindow = '/home/pi/offsync.html'
system('firefox ' + currwindow + ' -kiosk') 

cyclecount = 0

while True:
    t0 = time()
    while time() - t0 < 30:

        job()
    
    #refreshes window every 30 seconds
    refreshwindow()

    cyclecount += 1
