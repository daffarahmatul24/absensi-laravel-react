import cv2
import numpy as np
import os

font = cv2.FONT_HERSHEY_SIMPLEX

recorgnizer = cv2.face.LBPHFaceRecognizer_create()
recorgnizer.read('trainer/trainer.yml')


faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

cam = cv2.VideoCapture(0)
cam.set(3, 640)
cam.set(4, 480)

while True:
    ret, frame = cam.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(gray)

    for(x,y,w,h) in faces:

        cv2.rectangle(frame, (x,y), (x+w, y+h), (0,255,0))

        id, confidence = recorgnizer.predict(gray[y:y+h,x:x+w])

        if(confidence < 100):
            cv2.putText(frame, str(id), (x+5,y+5), font, 1, (255,255,255))
        else:
            cv2.putText(frame, str('unknwon'), (x+5,y+5), font, 1, (255,255,255))
        
            
    cv2.imshow('Face Recognition', frame)

    k = cv2.waitKey(10)
    if(k == 27):
        break

print("[INFO] EXIT")
cam.release()
cv2.destroyAllWindows()
