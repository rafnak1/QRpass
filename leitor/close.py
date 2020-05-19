#!/usr/bin/python3

from os import system
from time import sleep

PATH = '/home/pi/debug/'

sleep(24)

while True:
    with open(PATH + 'close-order') as f:
        s = f.read()

    if s != 'a':
        with open(PATH + 'close-order', 'w') as f:
            f.write('a')
            system('wmctrl -c feh')

