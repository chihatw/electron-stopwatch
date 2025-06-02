# Electron Stopwatch

エレガントなデザインのシンプルなストップウォッチアプリです。Electron 製。

## 特徴

- 黒を基調とした柔らかい UI
- 数字は中央・大きく・細い Lato フォント
- ボタンはアイコンのみで直感的
- npm のみで動作

## スクリーンショット

![スクリーンショット](/images/look.png)

## セットアップ

### 1. 依存パッケージのインストール

```sh
npm install
```

### 2. アプリの起動

```sh
npm start
```

## ディレクトリ構成

```
/ (プロジェクトルート)
├── package.json
├── README.md
└── src/
    ├── index.html      # UI本体
    ├── main.js         # Electronメインプロセス
    ├── renderer.js     # ストップウォッチロジック
    └── styles.css      # スタイリング
```

## 開発・カスタマイズ

- UI やロジックは`src/`配下の各ファイルを編集してください。
- デザインやフォントは`styles.css`で調整できます。

## ライセンス

MIT
