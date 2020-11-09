# 特定ユーザーのカスタムクレームを変更するサンプル

```
npm start -- -u <uid> -m <production or staging>
```

`uid` のユーザーのroleを `admin` に変更する

## 事前準備

+ `.env.sample` を元に、 `.env` を作成
+ 設定画面 > サービスアカウントタブからサービスアカウントキーを作成
    + 本番環境は `serviceAccountKey/production.json` という名前で配置
    + ステージング環境は `serviceAccountKey/staging.json` という名前で配置
