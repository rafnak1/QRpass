import os
import time

time.sleep(30)

while True:

    with open('order') as order:
        window = order.read()

    os.system('feh ' + window + ' -F -Z')
