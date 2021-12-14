# dena-review

## 遊び
1. BOTと対戦
2. 2人で対戦(オフライン用)
3. オンライン対戦

オンライン対戦 修正必須箇所
1. リセットが使用できない。
2. 部屋から出る時、タブの更新または削除に対応していない。(必ず退出しなければならない)
3. 3名以上入れてしまう。

## サーバー
MongoDBを使用しています。
https://github.com/yuki-katayama/dena-review-server

## アプリの実行方法
### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
