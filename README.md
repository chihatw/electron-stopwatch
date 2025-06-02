# Electron Stopwatch

エレガントなデザインのシンプルなストップウォッチアプリです。Electron 製。

## 特徴

- 黒を基調とした柔らかい UI
- 数字は中央・大きく・細い Lato フォント
- ボタンはアイコンのみで直感的
- npm のみで動作

## モード

このアプリには 2 つのモードがあります。

- **Working モード**: 着席時（仕事時間の計測）。ダークテーマで表示されます。
- **Break モード**: 離席時（休憩時間の計測）。ライトテーマで表示されます。

画面上部のスイッチでモードを切り替えることができます。モードを切り替えると、計測中の時間はリセットされ、テーマがクロスフェードで変化します。

## スクリーンショット

![スクリーンショット](/images/look.png)
![スクリーンショット](/images/break.png)

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

## Electron の main プロセスと renderer プロセスについて

### main プロセス

- Electron アプリのエントリーポイント。
- Node.js の API をフルに利用できる。
- アプリ全体のライフサイクル管理（ウィンドウ生成・終了など）を担当。
- 例: `src/main.js` で `BrowserWindow` を作成し、`index.html` を読み込む。

### renderer プロセス

- 各ウィンドウごとに動作するプロセス。
- Web ページ（HTML/CSS/JS）を表示・実行。
- 通常の Web ブラウザと同じ環境だが、Electron の設定次第で Node.js API も利用可能。
- 例: `src/renderer.js` で UI の制御やイベント処理を行う。

### 役割の違い

- main プロセスはアプリ全体の制御、renderer プロセスは UI の表示・操作を担当。
- セキュリティの観点から、renderer プロセスでは Node.js API の利用を制限することが推奨される（`contextIsolation: true` など）。

### プロセス間通信

- main/renderer 間でデータのやり取りが必要な場合は、`ipcMain`/`ipcRenderer`モジュールを使う。

---

このように、Electron アプリは main プロセスと renderer プロセスの役割分担によって構成されています。

## ライセンス

MIT
