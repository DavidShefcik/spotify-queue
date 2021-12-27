from mongoengine import Document
from mongoengine.document import EmbeddedDocument
from mongoengine.fields import BooleanField, EmbeddedDocumentField, IntField, ListField, StringField, DateTimeField, ObjectIdField

# ===================
# Users
# ===================
class User(Document):
  _id = ObjectIdField(required=True)
  username = StringField(required=True, unique=True)
  spotifyId = StringField(required=True, unique=True)
  accessToken = StringField(required=True)
  refreshToken = StringField(required=True)
  tokenExpiresAt = DateTimeField(required=True)
  localToken = StringField()

# ===================
# Queue
# ===================
class QueueMember(EmbeddedDocument):
  _id = ObjectIdField(required=True)
  username = StringField(required=True, unique=True)
  spotifyId = StringField(required=True, unique=True)

class QueueSong(EmbeddedDocument):
  _id = ObjectIdField(required=True)
  songName = StringField(required=True)
  isCurrent = BooleanField(required=True)

class Queue(Document):
  _id = ObjectIdField(required=True)
  host = EmbeddedDocumentField(QueueMember)
  members = ListField(EmbeddedDocumentField(QueueMember))
  code = IntField(required = True)
  songs = ListField(EmbeddedDocumentField(QueueSong))