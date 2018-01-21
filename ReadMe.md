# express RESTful API
'express-restful-api' is a RESTful web app using express js. This is meant as a template for web server apps. 

Features include:
 - MongoDb connection class
 - Logging with Bunyan
 - Flow for type checking
 - eslint
 - Scripts for various build stages

---
# Lastest Environment Versions Used:
- npm: 5.5.1
- node: v8.7.0

---
# Setup 
see package.json for all.

Install:
```
  npm install
  npm install -g --save flow
```

Run tests:
```
  npm test
```

Run in dev mode:
```
  npm run dev
```
  
Run in production mode:
```
  npm start
```

Run "forever"
```
./node_modules/.bin/forever start -c "npm start" ./
```

Stop "forever"

Currently "forever" has a bug where the stop action does not work.  In order to truly stop the application you'll have to kill all node processes.
```
ps -ef | grep node
sudo kill -9 <NODE_PIDs> 
```

---
# Logging
Logging output can be directed to either log files in ```./logs```, or the console, or both. Running in dev mode will log to both. Running in production mode will log to files only.  This can be configured at:
```
./config/development.json.logging
./config/production.json.logging
```

There is also a CLI for pretty-printing these log files:
https://www.npmjs.com/package/bunyan#cli-usage

Note records may get lost when processing large files through the CLI.

Example Usage:
```
tail -f ./logs/expressRestfulApi.log | ./node_modules/.bin/bunyan
```

---
# API Manual Examples
GET data:
```
curl -v  'http://localhost:3000/expressrestfulapi/api/1.0/'
```

POST data:
```
curl -v -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"name":"myJsonNam, "category":"myJsonCategory"}' 'http://localhost:3000/expressrestfulapi/api/1.0/'
```



MIT License

Copyright (c) 2017 Alfredo Perez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.