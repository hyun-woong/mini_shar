from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
from datetime import datetime

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:sparta@cluster0.whvqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def post():
    return render_template("post_save.html")

@app.route('/api/post_save', methods=['POST'])
def save_post():
    file = request.files['file_give']
    title = request.form['title_give']
    address = request.form['address_give']
    comment = request.form['comment_give']
    star = request.form['star_give']
    tag = request.form['tag_give']

    extension = file.filename.split('.')[-1]

    today = datetime.now()
    mytime = today.strftime('%Y-%m-%d-%H-%M-%S')

    filename = f'file-{mytime}'

    save_to = f'static/image/{filename}.{extension}'

    file.save(save_to)

    doc = {
        'post_file': f'{filename}.{extension}',
        'post_title': title,
        'post_address': address,
        'post_comment': comment,
        'post_star': star,
        'post_tag': tag,
    }

    db.mini_post.insert_one(doc)

    return jsonify({'msg':'업로드 완료!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)