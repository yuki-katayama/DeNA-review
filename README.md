# dena-review

## 遊び
1. BOTと対戦
2. 2人で対戦(オフライン用)
3. オンライン対戦(複数タグでテストが可能)

オンライン対戦 修正必須箇所
1. 3名以上入れてしまう。

オンライン対戦　仕様
1. 入室後、部屋の人数が0になると部屋はなくなります。

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
