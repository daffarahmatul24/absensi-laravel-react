import mysql.connector
import uuid
connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='absensi'
)

if connection.is_connected():
    print("Berhasil terhubung ke database")
else:
    print("Gagal terhubung ke database")

def fetchUser(userId):
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id = %s", (userId,))
    return cursor.fetchone()

def storeAttendace(userId):
    cursor = connection.cursor()
    query = "INSERT INTO attendances (id, user_id, status, description) VALUES (%s, %s, %s, %s)"
    values = (str(uuid.uuid4()), userId, 'attend', 'face recognition')
    cursor.execute(query,values )
    connection.commit()

storeAttendace(1)



