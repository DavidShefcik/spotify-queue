import json

def database_user_to_json(user):
  user_as_json = json.loads(user.to_json())

  user_as_json['_id'] = user_as_json['_id']['$oid']
  user_as_json['tokenExpiresAt'] = user_as_json['tokenExpiresAt']['$date']

  return user_as_json

def remove_sensitive_user_values(user, remove_local_token: bool = True):
  new_user = user

  del new_user['accessToken']
  del new_user['refreshToken']
  del new_user['tokenExpiresAt']

  if remove_local_token == True:
    del new_user['localToken']

  return new_user

def remove_sensitive_database_user_values(user, remove_local_token: bool = True):
  user_as_json = database_user_to_json(user)
  safe_user = remove_sensitive_user_values(user_as_json, remove_local_token)

  return safe_user