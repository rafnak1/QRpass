#Execute this as root!

from time import sleep
from os import system

PATH = '/home/pi/debug/'

sleep(40)

while True:
    with open(PATH + 'kill-order') as f:
        s = f.read()

    if s == 'do':
        system('sudo reboot')
