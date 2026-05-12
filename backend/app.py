import os
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


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, db.Identity(start=1, increment=1), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True, index=True)
    created_at = db.Column(
        db.DateTime, nullable=True, server_default=db.func.current_timestamp()
    )


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
            "users": [
                {"id": u.id, "name": u.name, "email": u.email} for u in pagination.items
            ],
            "total": pagination.total,
            "pages": pagination.pages,
            "current_page": pagination.page,
        }
    )


@app.route("/health")
def health():
    return {"status": "ok"}, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
