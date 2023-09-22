curl 'http://0.0.0.0:4567/api/v3/posts/1/bookmark' \
  -X 'PUT' \
  -H 'Connection: keep-alive' \
  -H 'Cookie: express.sid=s%3A0zaa4EqYzZ7-qBMKP7p3CQ4TuCenEBDz.sQw9ce3%2F%2BdEay6ThJs7VyNj9U7tg71YF3yFluLp6Vdk' \
  -H 'Origin: http://0.0.0.0:4567' \
  -H 'Referer: http://0.0.0.0:4567/topic/1/welcome-to-your-nodebb' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36' \
  -H 'accept: */*' \
  -H 'accept-language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7' \
  -H 'content-type: application/json; charset=UTF-8' \
  -H 'x-csrf-token: jCU0ZXN4-IlzwlzyQFwOdhuaX_fzc6tW8gPs' \
  -H 'x-requested-with: XMLHttpRequest' \
  --data-raw '{}' \
  --compressed \
  --insecure

echo ""
