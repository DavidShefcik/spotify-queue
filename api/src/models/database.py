from mongoengine import Document
from mongoengine.document import EmbeddedDocument
from mongoengine.fields import BooleanField, EmbeddedDocumentField, IntField, ListField, StringField, DateTimeField

# ===================
# Users
# ===================
class User(Document):
  username = StringField(required=True, unique=True)
  spotifyId = StringField(required=True, unique=True)
  hasSpotifyPremium = BooleanField(required=True)
  accessToken = StringField(required=True)
  refreshToken = StringField(required=True)
  tokenExpiresAt = DateTimeField(required=True)
  localToken = StringField()

# ===================
# Queue
# ===================
class QueueMember(EmbeddedDocument):
  username = StringField(required=True, unique=True)
  spotifyId = StringField(required=True, unique=True)

class QueueSong(EmbeddedDocument):
  songName = StringField(required=True)
  isCurrent = BooleanField(required=True)

class Queue(Document):
  host = EmbeddedDocumentField(QueueMember)
  members = ListField(EmbeddedDocumentField(QueueMember))
  code = IntField(required = True)
  songs = ListField(EmbeddedDocumentField(QueueSong))