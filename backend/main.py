from flask import Flask, request, jsonify
from PIL import Image, ImageDraw
import face_recognition
import io
from flask_cors import CORS
from openai import AsyncOpenAI
import os
import math
import asyncio

app = Flask(__name__)
CORS(app)

def detect_landmarks(image):
	face_landmarks_list = face_recognition.face_landmarks(image)
	return face_landmarks_list

def add_glasses(image, glasses_path, face_landmarks_list):
	glasses = Image.open(glasses_path).convert("RGBA")
	image = image.convert("RGBA")  # Ensure the target image is in RGBA mode
	
	for face_landmarks in face_landmarks_list:
		# Get eye coordinates
		left_eye = face_landmarks['left_eye']
		right_eye = face_landmarks['right_eye']
		
		# Calculate the center points of the eyes
		left_eye_center = ((left_eye[0][0] + left_eye[3][0]) // 2, (left_eye[1][1] + left_eye[4][1]) // 2)
		right_eye_center = ((right_eye[0][0] + right_eye[3][0]) // 2, (right_eye[1][1] + right_eye[4][1]) // 2)
		
		# Calculate the angle between the eyes
		dx = right_eye_center[0] - left_eye_center[0]
		dy = right_eye_center[1] - left_eye_center[1]
		angle = math.degrees(math.atan2(dy, dx))
		
		# Calculate the size of the glasses
		eye_width = math.hypot(dx, dy)
		glasses_width = int(eye_width * 2.5)  # Adjust width to include temples
		glasses_height = int(glasses_width * (glasses.size[1] / glasses.size[0]))
		
		# Resize and rotate the glasses
		glasses_resized = glasses.resize((glasses_width, glasses_height), Image.ANTIALIAS)
		glasses_rotated = glasses_resized.rotate(-angle, expand=True)
		
		# Calculate position to paste glasses
		eye_center_x = (left_eye_center[0] + right_eye_center[0]) // 2
		eye_center_y = (left_eye_center[1] + right_eye_center[1]) // 2
		glasses_position = (eye_center_x - glasses_rotated.width // 2, eye_center_y - glasses_rotated.height // 2)
		
		# Create a mask for blending
		mask = Image.new("L", glasses_rotated.size, 0)
		mask_draw = ImageDraw.Draw(mask)
		mask_draw.rectangle(((0, 0), glasses_rotated.size), fill=255)
		
		# Blend the glasses with the face
		image.paste(glasses_rotated, glasses_position, mask=glasses_rotated)
	
	return image

def clear_message(generated_msg):
	lines = [line.strip() for line in generated_msg.split('\n') if line.strip()]
	return lines[0] if lines else ""

async def communicate_with_gpt(prompt, conversation) -> str:
	gpt4_msg = ''
	print("conversation: ", conversation)
	try:
		response = await open_ai.chat.completions.create(
			model="gpt-4",
			messages=[
				{"role": "system", "content": prompt},
				{"role": "user", "content": conversation}
			],
			max_tokens=100
		)
		print("Response from GPT4 : ", response)
		gpt4_msg = response.choices[0].message.content.strip()
	except Exception as e:
		if "insufficient_quota" in str(e):
			return "Error:Quota exceeded. Please check your OpenAI account."
		return "Error:An error occurred. Please try again later."
	return clear_message(gpt4_msg)


@app.route('/chat', methods=['POST'])
async def chat():
	conversation = request.json
	prompt = "Your name is Juliet 26 year old girl using a tinder like app.\nYou've just encountered a user who wants to have a conversation with you on AIPlayground app developed by DevTech.\nGreet the user in a charming and humorous way.\nThen start to flirt by finding common interests with the user.\nAsk one question at a time. Keep the response concise and focused. Make sure the conversation flows naturally and stays engaging."
	response = await communicate_with_gpt(prompt, conversation + "Juliet: ")
	print("Message from GPT: ", response)
	if response.startswith("Error:"):
		return jsonify({"error": response.split('Error:')[1]})
	conversation += f"Juliet: {response}\n"
	return jsonify({"response": conversation})


@app.route('/verifyApiKey', methods=['POST'])
async def verifyApiKey():
	apiKey = request.json
 
	if not apiKey:
		return {"valid": False, "error": "API key is required"}

	global open_ai
	open_ai = AsyncOpenAI(api_key=apiKey)

	try:
		response = await open_ai.chat.completions.create(
			model="gpt-4",
			messages=[{"role": "user", "content": "Say hello!"}],
			max_tokens=5
		)
		return {"valid": True}
	except Exception as e:
		return {"valid": False, "error": str(e)}


@app.route('/glasses', methods=['POST'])
def upload_file():
	if 'file' not in request.files:
		return jsonify({'error': 'No file part'}), 400
	file = request.files['file']
	if file.filename == '':
		return jsonify({'error': 'No selected file'}), 400
	if file:
		image = face_recognition.load_image_file(file)
		face_landmarks_list = detect_landmarks(image)
		if not face_landmarks_list:
				return jsonify({'error': 'No faces detected'}), 400
		glasses_path = os.path.join(os.path.dirname(__file__), 'assets/glasses1.png')
		pil_image = Image.fromarray(image).convert("RGBA")
		result_image = add_glasses(pil_image, glasses_path, face_landmarks_list)
		img_byte_arr = io.BytesIO()
		result_image.save(img_byte_arr, format='PNG')
		img_byte_arr = img_byte_arr.getvalue()
		return img_byte_arr, 200

if __name__ == '__main__':
	asyncio.run(app.run(debug=True))
