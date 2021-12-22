FROM python:3.9

WORKDIR /srv/api

COPY requirements.txt .

RUN pip install -r requirements.txt

CMD ["uvicorn", "src.app:app", "--reload", "--port", "8000", "--host", "0.0.0.0"]