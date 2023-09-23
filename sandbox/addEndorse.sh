curl 'http://0.0.0.0:4567/api/v3/posts/1/endorse' \
  -X 'PUT' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.9,zh-HK;q=0.8,zh;q=0.7,zh-CN;q=0.6' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json; charset=UTF-8' \
  -H 'Cookie: express.sid=s%3ApA0G5FEgnLylbgQTgkcjvIHK6-pbVxpb.rbiKagBu82p8ce7ZZ5qGMR2kOTHwWssUvThysKLEjwg' \
  -H 'Origin: http://0.0.0.0:4567' \
  -H 'Referer: http://0.0.0.0:4567/topic/1/welcome-to-your-nodebb' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'x-csrf-token: 9wGcb9Vj-XIyhYJOYyyDA4Q-5YWhsAXmuFEo' \
  --data-raw '{}' \
  --compressed \
  --insecure

echo ""
