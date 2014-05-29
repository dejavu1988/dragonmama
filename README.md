DragonMama
==========

DragonMama: A Music Mix Player Controlled by Limbs

DragonMama is 
designed for DJs or music fans to control and mix their
music with hands and feet instead of laborious keyboard
manipulations. So the operators can focus on the essence
of music without distraction.

DragonMama, as a typical HCI prototype, consists of a
sensor-based gesture input module, a server for listening
signals, and a web-based client with graphical and audio
output. The input module is implemented with an
Arduino module and peripheral pressure-based sensors,
responsible for transferring ngers or feet gestures into
digital signals. The server is implemented on a host with
Noduino.js that receives sensor signals from the socket
and triggers the related operations dened in the client.
The client is a stack of webpages written in HTML5 with
jQuery and jPlayer library that presents visual and audio
feedback of music selection, sound setting, and mix
indication.

User Study: [questionnaire](https://docs.google.com/forms/d/1-py5HNrSw_4GpVYpmu6zPVSF9zuEGODUZNJirohb-P8/viewform)

Project summary: [report](https://github.com/dejavu1988/dragonmama/blob/master/report/intsys_report.pdf)
