# Используем Python 3.13
FROM python:3.13-slim

# Устанавливаем рабочую директорию
WORKDIR /code

# Устанавливаем зависимости системы для работы psycopg2
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && apt-get clean

# Копируем requirements.txt и устанавливаем зависимости
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все файлы проекта
COPY . /code/

# Запускаем сервер Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
