class SpotifyOAuthError(Exception):
  """ Raised when an error occurs with the Spotify OAuth process """
  pass

class SpotifyAPIError(Exception):
  """ Raised when an error occurs with the Spotify API """
  pass