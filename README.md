Web demo search solr

## Build Setup Front
### Create file .env - link to backend 

```
API_ENDPOINT= http://localhost:5000/api # link backend
```

```
# install dependencies
$ npm install

# serve with hot reload at localhost:1998
$ npm run dev

```

## backend
```
@app.route("/api/search", methods=["POST", "GET"])
def get_text():
  if request.method == 'POST':
    # nhan text 
    text = request.json.get('text')
    '''
      processing 
    '''
    return jsonify(result)
```

### result co dang: 
```
  [ 
    {
      "content": "",
      "publish_date": "",
      "author": "",
      "description": "",
      "title": "",
      "topic": "" 
    }, ...
  ]
```
