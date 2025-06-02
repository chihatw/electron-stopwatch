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

## スタンドアロンアプリ（配布用アプリ）の作り方

### 1. 依存パッケージのインストール

```sh
npm install
```

### 2. パッケージングツールのインストール（初回のみ）

```sh
npm install --save-dev electron-packager
```

### 3. スタンドアロンアプリの生成（macOS 用）

```sh
npx electron-packager . stopwatch --platform=darwin --arch=x64 --overwrite
```

- `stopwatch-darwin-x64` フォルダ内に `stopwatch.app` が生成されます。
- これをダブルクリックすれば、インストール不要で独立したアプリとして利用できます。
- Windows や Linux 用に作りたい場合は `--platform` と `--arch` を変更してください。

### 参考

- 詳細なオプションは [electron-packager 公式ドキュメント](https://github.com/electron/electron-packager) を参照してください。

## ライセンス

MIT
