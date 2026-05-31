# Creator Portfolio Template

イラスト、制作依頼、グッズ販売、SNSリンクをまとめるための静的ポートフォリオテンプレートです。
HTML / CSS / JavaScript だけで動くので、GitHub Pages や一般的なレンタルサーバーにそのまま置けます。

## ファイル構成

- `index.html`: ページ構造です。基本的には大きく触らなくても使えます。
- `style.css`: 見た目の調整です。色は冒頭の `:root` にまとめています。
- `script.js`: サイト名、文章、作品、リンクなどの編集場所です。
- `favicon.svg`: ブラウザタブのアイコンです。

## まず編集する場所

ほとんどの差し替えは `script.js` の `TEMPLATE_CONFIG` だけで完了します。

1. `site` の `name`, `title`, `description`, `footer` を変更します。
2. `hero` と `about` を自分の紹介文に変更します。
3. `works` に作品カードを追加します。
4. `commission.links`, `shop.links`, `socialLinks` の URL を差し替えます。
5. 必要がなければ `projects`, `movie`, `goods` の項目を減らします。

## 画像を入れる方法

初期状態では、画像ファイルがなくても仮アートが表示されます。
実際の画像を使う場合は、プロジェクト内に `images` フォルダを作り、カードに `images` を追加してください。

```js
works: [
  {
    title: "Original Character",
    tag: "Character",
    images: ["./images/work-01.jpg", "./images/work-01-detail.jpg"],
  },
],
```

`colors` は仮アート用です。`images` を入れたカードでは使われません。

## 色を変える方法

`style.css` 冒頭の変数を変更してください。

```css
:root {
  --cyan: #41d9ff;
  --lime: #b8ff4f;
  --pink: #ff5fb8;
  --violet: #7d5cff;
  --orange: #ffb84d;
}
```

## 公開前チェック

- `script.js` に自分以外のリンクや仮リンクが残っていないか確認します。
- `index.html` の `<html lang="ja">` は、英語サイトにする場合 `en` に変更します。
- 外部リンクは `https://` から始まるURLにします。
- スマートフォン幅でもボタンや見出しがはみ出していないか確認します。

## クレジット表記

販売・配布する場合は、あなたの販売ページの規約に合わせてクレジット要否や再配布可否を追記してください。
