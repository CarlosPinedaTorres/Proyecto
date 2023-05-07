FROM python:3.10
LABEL 5986905 "5986905@alu.murciaeduca.es"
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --upgrade pip && \
pip install --no-cache-dir -r requirements.txt
RUN pip install pydotplus
EXPOSE 8000
ENTRYPOINT ["python","manage.py","runserver","0.0.0.0:8000"]
