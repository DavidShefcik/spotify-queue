from urllib.parse import quote
from base64 import b64encode

def encode_uri_component(value: str):
  return quote(value, safe="")

def convert_to_base64(value: str):
  value_bytes = value.encode("ascii")
  base64_bytes = b64encode(value_bytes)
  base64_value = base64_bytes.decode('ascii')

  return base64_value