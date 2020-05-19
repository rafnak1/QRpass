from os import system
from time import sleep
PATH = '/home/pi/debug/'

sleep(22)

while True:

    with open(PATH + 'open-order') as order:
        window = order.read()
    
    system('feh ' + PATH + window + ' -F -Z')
    


