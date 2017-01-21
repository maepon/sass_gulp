# Sassとgulpのハンズオン

---

## 今日の目標

1. SassからCSSが出力できる
2. gulpで操作する

---

## node.jsのインストール

1. node.jsのインストール
2. npmの使い方

---

## 一度Sassを動かしてみる

[http://bit.ly/gyokSGSass](http://bit.ly/gyokSGSass)

1. ```npm install -g node-sass```
2. サンプルファイルのディレクトリへ移動
3. ```node-sass -w scss/ -o css/```

scssファイルを編集するとCSSが編集される

---

## リロードがいちいち面倒なので

1. 新しいウィンドウでコマンドプロンプト（ターミナル）を開く
2. ```browser-sync start --server --files "css/*.css"```

---

## 他の様々なツール

1. Autoprefixer
2. sourcemaps

などなど、それぞれコマンド打つのは面倒

CodeKitなどもツールはあるけども‥‥

---

## gulp

---

## gulpとは？

「タスクランナー」と呼ばれています

### タスクランナー

様々なコマンドラインツールを組み合わせて実行するツール


## gulpで今やったことを再現してみましょう

---

## 必要な準備

各パッケージを導入します

1. ```npm init```
2. ```npm install --save-dev gulp gulp-sass gulp-autoprefixer browser-sync gulp-sourcemaps gulp-plumber```

---

### npm init

- package.jsonの生成
- 環境に必要な情報を保存しておく

---

### npm install --save-dev .....

必要なパッケージをインストールしていく

- gulp
- gulp-sass
- gulp-autoprefixer
- browser-sync
- gulp-sourcemaps
- gulp-plumber

---

## Gulpfile.jsを書く

たぶん難関です

---

```javascript
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    bs = require('browser-sync'),
    plumber = require('gulp-plumber');


var prefixer_setting = {
	browsers: [
	'last 2 versions',
	'ie > 9' ,
	'Android > 4'
	]
	};
```
---

```javascript
gulp.task('sass', function () {
  gulp.src('scss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer(prefixer_setting))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('css/'));
});
```

```javascript
gulp.task('serve',['sass'],function(){
  var initObj = {server: '.'};

  bs.init(initObj);

  gulp.watch(['**/*.html'],bs.reload);
  gulp.watch(['css/**/*.css'],bs.reload);
  gulp.watch(['scss/**/*.scss'],['sass']);

});

gulp.task('default',['serve']);
```

---

それぞれがどういう意味かをざっくり解説

---

## では、Sassに戻りましょう

基本的な動作はここに解説が

[http://sass-lang.com/guide](http://sass-lang.com/guide)

---

### 他に覚えておきたい

#### 「`&`」

```scss
.list{
  width: 500px;
  display: flex;
  justify-content: space-between;
  &__item{
    width: calc(50% - 10px);
  }
  #top &{
    width: 100%;
  }
}
```
---

#### 「`#{....}`」

```scss
$img_path: "../img/";
.hoge{
  background-image: url(#{$img_path}main_bg.jpg);
}
```

---

### 他にもこちらがおすすめ

現場で役立つ実践Sass（1）Sassの環境を整える | Adobe Creative Station<br> [https://blogs.adobe.com/creativestation/web-practical-sass-01-dev-environment](https://blogs.adobe.com/creativestation/web-practical-sass-01-dev-environment)

---

## Bootstrap4

のSassもこのGulpファイルでコンパイルできます
