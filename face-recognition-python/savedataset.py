import cv2
import os
import sys
import faceTraining

cam = cv2.VideoCapture(0)
cam.set(3, 640) # set video width
cam.set(4, 480) # set video height

faceDetector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# faceId = input('\n Enter user id an press <return> ===> ')
faceId = sys.argv[1]

count = 0
while(True):

    ret,frame = cam.read()
    cv2.imshow('frame', frame)

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceDetector.detectMultiScale(gray)

    # membuat folder
    pathDataset = 'dataset/' + str(faceId) + '/'
    if not os.path.exists(pathDataset):
        os.makedirs(pathDataset)

    # proses menyimpan gambar
    for (x,y,w,h) in faces:
        count  +=1
        cv2.imwrite(pathDataset + str(count) + '.jpg' , gray[y:y+h, x:x+w])
        


    k = cv2.waitKey(100) & 0xff
    if k == 27:
        break
    elif count == 30:
        break
    
#Training Data
faceTraining.training()
    
print("\n [INFO] Exiting Program and cleanup stuff")
cam.release()
cv2.destroyAllWindows()
