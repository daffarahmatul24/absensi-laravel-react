import cv2
import time
from database import fetchUser

font = cv2.FONT_HERSHEY_SIMPLEX
recognition = True
ask = False
username = ''
userId = ''
notMe = []
saving = False
saved = False
start = 0

recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('trainer/trainer.yml')

faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

cam = cv2.VideoCapture(0)
cam.set(3, 640)
cam.set(4, 480)

while True:
    ret, frame = cam.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(gray)

    if recognition:
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

            id, confidence = recognizer.predict(gray[y:y+h, x:x+w])

            if confidence < 100:
                user = fetchUser(id)
                if user:  # pastikan user ada di DB
                    userId = user['id']
                    username = user['name']
                else:
                    username = f"User {id}"

                cv2.putText(frame, username, (x+5, y-5), font, 1, (255, 255, 255), 2)
                recognition = False
                ask = True
            else:
                cv2.putText(frame, "Unknown", (x+5, y-5), font, 1, (0, 0, 255), 2)

    elif ask:
        cv2.putText(frame, f"Apakah kamu {username} ?", (30, 400), font, 1, (255, 255, 255), 2)
        cv2.putText(frame, "Enter = Ya | X = Tidak", (30, 440), font, 1, (255, 255, 255), 2)

    cv2.imshow('Face Recognition', frame)

    k = cv2.waitKey(10)

    if k == 27:  # ESC
        print("FAILED")
        break
    elif k == 120:  # X
        notMe.append(userId)
        recognition = True
        ask = False
    elif k == 13:  # ENTER
        saved = True
        saving = True
        start = int(time.time()) + 2
        print(f"MATCH:{userId}")
        break

print("[INFO] EXIT")
cam.release()
cv2.destroyAllWindows()