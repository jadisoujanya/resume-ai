from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Notification

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/notifications/{user_id}")
def get_notifications(user_id:int, db:Session=Depends(get_db)):

    notifications = (
        db.query(Notification)
        .filter(Notification.user_id==user_id)
        .order_by(Notification.created_at.desc())
        .limit(20)
        .all()
    )

    return notifications


@router.put("/notifications/read/{notification_id}")
def mark_read(notification_id:int, db:Session=Depends(get_db)):

    notification = db.query(Notification).filter(
        Notification.id==notification_id
    ).first()

    if notification:

        notification.is_read=True

        db.commit()

    return {"success":True}

@router.put("/notifications/read-all/{user_id}")
def mark_all_read(user_id: int, db: Session = Depends(get_db)):

    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .all()
    )

    for n in notifications:
        n.read = True

    db.commit()

    return {"success": True}