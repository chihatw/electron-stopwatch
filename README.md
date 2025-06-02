# electron-stopwatch

macOS メニューバー対応のシンプルなストップウォッチアプリ（Electron 製）

## 主な特徴

- メインウィンドウでストップウォッチの計測・リセット・モード切替（Working/Break）が可能
- メニューバー（Tray）に計測時間とモード（W/B）を常時表示
- メニューバーアイコンは黒単色ストップウォッチ（PNG/SVG）
- メニューバーメニューから「スタート」「リセット」「モード切替」「最小化」「electron-stopwatch を終了」が選択可能
- メニュー操作時、ウィンドウが最小化・閉じていても自動で前面に復元/再生成
- ウィンドウを閉じていてもメニューから再表示可能

## インストール・起動方法

1. リポジトリをクローンまたはダウンロード
2. 依存パッケージをインストール
   ```zsh
   npm install
   ```
3. アプリを起動
   ```zsh
   npm start
   ```

## ファイル構成

- `src/main.js` ... メインプロセス（Tray・ウィンドウ管理・IPC）
- `src/renderer.js` ... レンダラープロセス（UI・ストップウォッチロジック）
- `src/preload.js` ... セキュアな IPC ブリッジ
- `src/styles.css` ... UI スタイル
- `assets/stopwatch-black.png` ... メニューバー用アイコン（黒単色 PNG）
- `assets/stopwatch-black.svg` ... アイコン SVG（変換用）

## メニューバーの表示例

- `00:12:34 W` ... Working モード
- `00:12:34 B` ... Break モード

## メニューバーメニュー

- スタート
- リセット
- モード切替
- 最小化
- ─────────────
- stopwatch を終了

## 注意事項

- Tray タイトルのフォント・サイズ・位置は macOS の仕様で変更できません
- アイコン画像は 24x24px の黒単色 PNG を推奨

## スクリーンショット

![スクリーンショット](/images/look.png)
![スクリーンショット](/images/break.png)

## スタンドアロンアプリ（配布用アプリ）の作り方

1. 依存パッケージのインストール
   ```zsh
   npm install
   ```
2. パッケージングツールのインストール（初回のみ）
   ```zsh
   npm install --save-dev electron-packager
   ```
3. スタンドアロンアプリの生成（macOS 用）
   ```zsh
   npx electron-packager . stopwatch --platform=darwin --arch=x64 --overwrite
   ```
   - `stopwatch-darwin-x64` フォルダ内に `stopwatch.app` が生成されます。
   - これをダブルクリックすれば、インストール不要で独立したアプリとして利用できます。
   - Windows や Linux 用に作りたい場合は `--platform` と `--arch` を変更してください。

## 開発・カスタマイズ

- UI やロジックは`src/`配下の各ファイルを編集してください。
- デザインやフォントは`styles.css`で調整できます。

## ライセンス

MIT
