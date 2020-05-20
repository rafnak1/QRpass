Program requirements:
- pyzbar;
- feh image viewer;
- wmctrl for closing feh.

Crontab settings:

[on sudo crontab] @reboot /usr/bin/python3 /home/pi/debug/kill.py

[on pi user] @reboot /usr/bin/python3 /home/pi/debug/master.py

[on pi user] @reboot DISPLAY=:0 /usr/bin/python3 /home/pi/debug/open.py

[on pi user] @reboot DISPLAY=:0 /usr/bin/python3 /home/pi/debug/close.py
