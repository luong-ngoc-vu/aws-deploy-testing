import os
import re
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

DB_URL = (
    f"postgresql+pg8000://{DB_USER}:{DB_PASSWORD}" f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

app.config["SQLALCHEMY_DATABASE_URI"] = DB_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, db.Identity(start=1, increment=1), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True, index=True)
    created_at = db.Column(
        db.DateTime, nullable=True, server_default=db.func.current_timestamp()
    )


def serialize_user(user):
    return {"id": user.id, "name": user.name, "email": user.email}


def validate_user_payload(payload, user_id=None):
    errors = {}
    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip().lower()

    if not name:
        errors["name"] = "Name is required."

    if not email:
        errors["email"] = "Email is required."
    elif not EMAIL_REGEX.match(email):
        errors["email"] = "Email is invalid."

    if name:
        query = User.query.filter(db.func.lower(User.name) == name.lower())
        if user_id is not None:
            query = query.filter(User.id != user_id)
        if query.first():
            errors["name"] = "Name already exists."

    if email:
        query = User.query.filter(db.func.lower(User.email) == email.lower())
        if user_id is not None:
            query = query.filter(User.id != user_id)
        if query.first():
            errors["email"] = "Email already exists."

    return {"name": name, "email": email}, errors


@app.route("/")
def home():
    return {"message": "hello aws 123"}


@app.route("/users")
def get_users():
    page = request.args.get("page", 1, type=int)
    page_size = request.args.get("page_size", 10, type=int)

    pagination = User.query.paginate(page=page, per_page=page_size, error_out=False)

    return jsonify(
        {
            "users": [serialize_user(u) for u in pagination.items],
            "total": pagination.total,
            "pages": pagination.pages,
            "current_page": pagination.page,
        }
    )


@app.route("/users", methods=["POST"])
def create_user():
    payload = request.get_json(silent=True) or {}
    values, errors = validate_user_payload(payload)

    if errors:
        return jsonify({"message": "Validation failed.", "errors": errors}), 400

    user = User(name=values["name"], email=values["email"])
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully.", "user": serialize_user(user)}), 201


@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    payload = request.get_json(silent=True) or {}
    values, errors = validate_user_payload(payload, user_id=user_id)

    if errors:
        return jsonify({"message": "Validation failed.", "errors": errors}), 400

    user.name = values["name"]
    user.email = values["email"]
    db.session.commit()

    return jsonify({"message": "User updated successfully.", "user": serialize_user(user)})


@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully."})


@app.route("/health")
def health():
    return {"status": "ok"}, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
