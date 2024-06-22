from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

# Path to the directory containing MP3 files
SONGS_DIR = '../public/songs'

@app.route('/api/songs', methods=['GET'])
def get_songs():
    mp3_files = [f for f in os.listdir(SONGS_DIR) if f.endswith('.mp3')]
    return jsonify(mp3_files)

@app.route('/songs/<filename>')
def get_song(filename):
    return send_from_directory(SONGS_DIR, filename)
