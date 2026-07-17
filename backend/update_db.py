import sqlite3

conn = sqlite3.connect("users.db")

cursor = conn.cursor()


cursor.execute("""
ALTER TABLE users 
ADD COLUMN github TEXT
""")


cursor.execute("""
ALTER TABLE users 
ADD COLUMN linkedin TEXT
""")


cursor.execute("""
ALTER TABLE users 
ADD COLUMN profile_image TEXT
""")


conn.commit()

conn.close()

print("Database updated successfully")