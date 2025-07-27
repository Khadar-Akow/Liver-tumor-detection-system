import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
from tensorflow.keras.applications.densenet import preprocess_input
from supabase import create_client, Client

app = Flask(__name__)
CORS(app)

# ✅ Your Supabase credentials
SUPABASE_URL = "https://xiwnhveiyqnaaonivfzp.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpd25odmVpeXFuYWFvbml2ZnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDI2MDEsImV4cCI6MjA2NjQxODYwMX0.e0YEi_pTHW6_87Zeb4qi-MnHu3QWvI4TqZ9QKJvBRaY"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Load model
model = load_model("liver_tumor_model.h5")

# Upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/prediction/cases/add", methods=["POST"])
def add_case():
    if "image" not in request.files:
        return jsonify({"success": False, "message": "No image file"}), 400

    file = request.files["image"]
    data = request.form

    if file.filename == "":
        return jsonify({"success": False, "message": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = file.filename
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        # Preprocess image
        img = Image.open(filepath).convert("RGB").resize((256, 256))
        img_array = preprocess_input(np.array(img))
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        prediction = model.predict(img_array)
        label = "Tumor" if prediction[0][0] > 0.5 else "No Tumor"

        # Save to Supabase
        case_data = {
            "FullName": data.get("name"),
            "Age": int(data.get("age")),
            "Gender": data.get("gender"),
            "Email": data.get("email"),
            "Phone": data.get("number"),
            "Result": label
        }
        supabase.table("Cases").insert(case_data).execute()

        return jsonify({"success": True, "result": label})

    return jsonify({"success": False, "message": "Invalid file format"}), 400



# View cases endpoint
@app.route("/prediction/cases/view", methods=["GET"])
def view_cases():
    response = supabase.table("Cases").select("Cases_id, FullName, Age, Gender, Email, Phone, Result").execute()

    if response.data:
        cases = response.data
        return jsonify({"success": True, "cases": cases})
    else:
        return jsonify({"success": False, "message": "No cases found"})


#login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Missing email or password"}), 400

    # ✅ Query Supabase users table
    response = supabase.table("users") \
        .select("*") \
        .eq("email", email) \
        .eq("password", password) \
        .execute()


    if response.data and len(response.data) > 0:
        return jsonify({"success": True, "message": "Login successful!"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

# register endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('fullName')

    if not email or not password or not full_name:
        return jsonify({"success": False, "message": "Missing fields"}), 400

    # Check if user already exists
    existing_user = supabase.table("users").select("email").eq("email", email).execute()
    if existing_user.data:
        return jsonify({"success": False, "message": "User already exists"}), 409

    # Insert user
    response = supabase.table("users").insert({
        "email": email,
        "password": password,
        "fullName": full_name
    }).execute()
    

    if response.data:
        return jsonify({"success": True, "message": "User registered successfully!"}), 201
    else:
        return jsonify({"success": False, "message": "Registration failed"}), 500

# Delete case endpoint
@app.route('/prediction/cases/delete/<int:case_id>', methods=['DELETE'])
def delete_case(case_id):
    try:
        response = supabase.table("Cases").delete().eq("Cases_id", case_id).execute()

        if response.data:
            return jsonify({"success": True, "message": "Case deleted successfully"}), 200
        else:
            return jsonify({"success": False, "message": f"No case found with ID {case_id}"}), 404
    except Exception as e:
        # If there's an error, return the exception details
        return jsonify({"success": False, "message": f"Error: {str(e)}"}), 500




if __name__ == '__main__':
    app.run(debug=True)
