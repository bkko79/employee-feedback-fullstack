#fullstack Coding Challenge manual

## 紹介

フールスタックのapi通信を構築する為に二つのアプリケーションを構築した後、proxyで通信するdevダミー環境を作りました。

mysqlやpostgresとの通信を真似する為にnode用ORMのsequelizeを使いました。データベースは提出の為にsqlite3のファイルで構築しました。

## 環境デプロイーマニュアル

0. 圧縮ファイルをnodeとnpmが使える場所に配置してください。
1. ./front/から```npm install```や```yarn install```を実行して必要なnode_modulesを設置させてください。
2. ./serverから```npm install```や```yarn install```を実行して必要なnode_modulesを設置させてください。
3. ./serverから````npm run dev```や```yarn dev run```でfront/server両方を一緒に実行できます。
4. http://localhost:3000/admin から全ての動作の確認ができます。

### ページリスト

アドミンビュー：http://localhost:3000/admin

ユーザービュー：http://localhost:3000/review/1

## 概要

サーバはexpressとsqlite3で作りました。データベースのmodelやmigrationはsequelizeのCLIで宣言したデータを修正して時間を短縮しました。APIは各usersとreviewsテーブルのCRUDは全て作って、frontの出力がstateに依存しないようにしました。

フロントはcreate-react-appで作った後、要らないファイルを削除してウェブアプリケーションを構築しました。React-router-domを使ってURL別のコンポネント出力を分けました。

デザインは良く使用しているMaterial UIを選びました。早めに作業する為に、テーブルのデザインコンポネントは一つのコンポネントに統一し、stateの変更とデータ通信が発生する要素を関数化して分離しました。

## 想定

チャレンジに集中したdev環境で、様々な機能が構築されたと想定して作業しました：

1. helmet、hppなどのセキュリティー関連脆弱性パッケージは反映しませんでした。
2. ログインやoAuthは別に存在する想定でpassport、cookie-parser、express-sessionは反映しませんでした。
3. API系エラーハンドリングは別のメッセージ処理がある想定でconsole.log出力にしました。
4. ユーザー情報やレビュー情報は最小化して、機能構築に集中しました。

それ以外の細かい内容はコードに記入しましたので、ご参考ください。
