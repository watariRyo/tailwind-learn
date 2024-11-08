###　技術スタック
| 項目 | バージョン | 説明 |
| --- | --- | --- |
| Typescript | 5 | - |
| React | 19 | JavaScript FW |
| NextJS | 15.0.2 | React FW |
| tailwindcss | 3.4.1 | CSS フレームワーク |
| shadcn/ui | 2.1.0 | UI フレームワーク |
| swr | 2.2.5 | データ取得 |
| json-server | 0.17.4 | Mock サーバー |

### ディレクトリ構成（自動生成除く）

|- app // page 配置
|- components // 各種共通 tsx
| |\_ ui // shadcn/ui が入る
|- config // env に入れない config 系
|- lib // helper や utils
|- repository // api アクセスクラス
| |\_ models // リクエストやレスポンスの型
|- types // 型定義

### 備忘

- shadcn/ui  
  React19 への対応がまだのため、npm install が失敗する  
  本 PJ 使用において問題はないので npm install 時は`--force`を付与している
- json-server
  1 系だと middleware を使えないため、0 系の最新を使用
- swr
  React19 だと依存エラー。`--force`で入れて使えることを確認

### TODO

- URL などべた書き（env 化）
- まっとうなエラーハンドリング
- msw 使っていないので、API エンドポイントを実際に合わせて要変更（主にクエリパラメータ）
- swr のチューニング

### おためし

- `npm run dev`
  Nextjs 起動
- `npm run json-server`
  json-server 起動（スタブ）
