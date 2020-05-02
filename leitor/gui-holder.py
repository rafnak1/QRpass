import os
import time

path = '/home/pi/QRpass/'

time.sleep(30)

while True:

    with open('window-order') as order:
        window = order.read()

    os.system('feh '+ path + window + ' -F -Z')
