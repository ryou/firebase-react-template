# Firebase(Hosting/FireStore/Functions)開発テンプレート

## cloneしてからやること

+ firebaseプロジェクトを作成(production/staging)
+ 作成したfirebaseプロジェクトを設定
    + `firebase projects:list` でプロジェクトIDを確認し、 `.firebaserc` に設定
+ CircleCIのためのトークンを取得
    + `firebase login:ci` で取得できる
    + `firebase use <alias>` でアクティブなプロジェクトを切り替えられる
+ CircleCIにて取得したトークンを設定
    + productionは `FIREBASE_TOKEN`、stagingは `FIREBASE_TOKEN_STAGING` で設定
+ frontend用のenvファイル `frontend/.env` を設定

## `functions/.runtimeconfig.sample.json` に関して

ローカルエミュレータで環境変数をエミュレートするために必要なもの。

実際に使用する際は、同じディレクトリに `.runtimeconfig.json` という名前でコピーして使うこと。

## 手動デプロイ方法

### 本番環境

```
npm run deploy:production
```

### ステージング環境

```
npm run deploy:staging
```
