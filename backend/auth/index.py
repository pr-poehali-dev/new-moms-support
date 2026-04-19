"""
Авторизация: регистрация, вход, выход, получение профиля.
Роутинг через query-параметр ?action=register|login|logout|me
"""
import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = "t_p25510910_new_moms_support"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Id",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def json_response(status: int, data: dict):
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data, ensure_ascii=False)}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    headers = event.get("headers") or {}
    session_id = headers.get("x-session-id") or headers.get("X-Session-Id")
    params = event.get("queryStringParameters") or {}
    action = params.get("action", "")

    # GET ?action=me
    if method == "GET" and action == "me":
        if not session_id:
            return json_response(401, {"error": "Не авторизован"})
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT u.id, u.name, u.email, u.role FROM {SCHEMA}.sessions s "
            f"JOIN {SCHEMA}.users u ON u.id = s.user_id "
            f"WHERE s.id = %s AND s.expires_at > NOW()",
            (session_id,)
        )
        row = cur.fetchone()
        conn.close()
        if not row:
            return json_response(401, {"error": "Сессия истекла"})
        return json_response(200, {"id": row[0], "name": row[1], "email": row[2], "role": row[3]})

    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    # POST ?action=register
    if method == "POST" and action == "register":
        name = (body.get("name") or "").strip()
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""
        if not name or not email or not password:
            return json_response(400, {"error": "Заполните все поля"})
        if len(password) < 6:
            return json_response(400, {"error": "Пароль минимум 6 символов"})
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = %s", (email,))
        if cur.fetchone():
            conn.close()
            return json_response(409, {"error": "Email уже зарегистрирован"})
        pw_hash = hash_password(password)
        # Первый пользователь получает роль admin
        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.users")
        count = cur.fetchone()[0]
        role = "admin" if count == 0 else "member"
        cur.execute(
            f"INSERT INTO {SCHEMA}.users (name, email, password_hash, role) VALUES (%s, %s, %s, %s) RETURNING id, name, email, role",
            (name, email, pw_hash, role)
        )
        user = cur.fetchone()
        sid = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {SCHEMA}.sessions (id, user_id) VALUES (%s, %s)", (sid, user[0]))
        conn.commit()
        conn.close()
        return json_response(200, {"session_id": sid, "user": {"id": user[0], "name": user[1], "email": user[2], "role": user[3]}})

    # POST ?action=login
    if method == "POST" and action == "login":
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""
        if not email or not password:
            return json_response(400, {"error": "Введите email и пароль"})
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, name, email, role, password_hash FROM {SCHEMA}.users WHERE email = %s", (email,))
        row = cur.fetchone()
        if not row or row[4] != hash_password(password):
            conn.close()
            return json_response(401, {"error": "Неверный email или пароль"})
        sid = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {SCHEMA}.sessions (id, user_id) VALUES (%s, %s)", (sid, row[0]))
        conn.commit()
        conn.close()
        return json_response(200, {"session_id": sid, "user": {"id": row[0], "name": row[1], "email": row[2], "role": row[3]}})

    # POST ?action=logout
    if method == "POST" and action == "logout":
        if session_id:
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(f"UPDATE {SCHEMA}.sessions SET expires_at = NOW() WHERE id = %s", (session_id,))
            conn.commit()
            conn.close()
        return json_response(200, {"ok": True})

    return json_response(404, {"error": "Не найдено"})