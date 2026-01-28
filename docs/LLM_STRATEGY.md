# LLM活用戦略ドキュメント / LLM Utilization Strategy Document

## 概要 / Overview

このドキュメントでは、LLM Proofreadingアプリケーションにおけるプロンプトエンジニアリング戦略とLLM活用方針を説明します。

This document describes the prompt engineering strategy and LLM utilization policy for the LLM Proofreading application.

---

## プロンプト管理 / Prompt Management

### 構造 / Structure

すべてのプロンプトは `app/src/prompts/` ディレクトリで一元管理されています。

All prompts are centrally managed in the `app/src/prompts/` directory.

```
app/src/prompts/
├── index.ts              # エクスポートハブ / Export hub
├── microCorrections.ts   # ミクロ修正プロンプト / Micro corrections prompts
└── macroReview.ts        # マクロレビュープロンプト / Macro review prompts
```

### 設計原則 / Design Principles

1. **分離**: 各機能（ミクロ/マクロ）ごとに専用ファイル
   - **Separation**: Dedicated file for each feature (micro/macro)

2. **バージョン管理**: すべてのプロンプトはGitで管理
   - **Version Control**: All prompts are managed in Git

3. **再利用性**: 関数ベースで動的にプロンプト生成
   - **Reusability**: Function-based dynamic prompt generation

4. **ドキュメント化**: 各プロンプトに戦略とパラメータを明記
   - **Documentation**: Strategy and parameters documented for each prompt

---

## ミクロ修正（文・単語レベル）/ Micro Corrections (Sentence/Word Level)

### 目的 / Purpose

文法エラーと効果的な表現の提案を提供

Provide grammar error corrections and effectiveness suggestions

### プロンプト戦略 / Prompt Strategy

**ファイル**: `prompts/microCorrections.ts`

#### システムプロンプト構成 / System Prompt Components

1. **役割定義** / Role Definition
   ```
   "You are a professional proofreading assistant"
   ```
   - 専門的な校閲者としての役割を明確化
   - Clearly defines role as professional proofreader

2. **コンテキスト注入** / Context Injection
   - `documentPurpose`: 文書の目的（論文、メール等）
   - `correctionPolicy`: 修正方針（形式的、簡潔等）
   - Dynamically injected from user settings

3. **出力形式指定** / Output Format Specification
   ```json
   {
     "type": "grammar" | "effectiveness",
     "start": number,
     "end": number,
     "original": string,
     "suggestion": string,
     "reason": string
   }
   ```
   - JSON構造化出力で確実なパース
   - Structured JSON for reliable parsing

4. **修正タイプガイドライン** / Correction Type Guidelines
   - **Grammar**: 文法的誤り（スペル、句読点、時制等）
   - **Effectiveness**: 改善提案（語彙、明瞭性、簡潔性等）

### パラメータ設定 / Parameter Settings

```typescript
{
  temperature: 0.3,  // 低温度で一貫性のある修正
                     // Low temperature for consistent corrections
  maxTokens: 2000    // 詳細な修正リストに十分
                     // Sufficient for detailed correction lists
}
```

**温度0.3の理由** / Why Temperature 0.3:
- 決定論的な修正を実現
- 同じ誤りに対して一貫した提案
- 過度に創造的な修正を防止

- Achieves deterministic corrections
- Consistent suggestions for same errors
- Prevents overly creative corrections

### 文字位置ベースのハイライト / Character Position-Based Highlighting

- `start`と`end`を使用して正確な位置を特定
- UIでの下線表示に使用
- 複数修正の重複を避ける

- Uses `start` and `end` for precise positioning
- Used for underline display in UI
- Avoids overlapping corrections

---

## マクロレビュー（文書レベル）/ Macro Review (Document Level)

### 目的 / Purpose

文書全体の構造、流れ、論理性について包括的なフィードバックを提供

Provide comprehensive feedback on document structure, flow, and logic

### プロンプト戦略 / Prompt Strategy

**ファイル**: `prompts/macroReview.ts`

#### システムプロンプト構成 / System Prompt Components

1. **役割定義** / Role Definition
   ```
   "You are a professional editor providing comprehensive document review"
   ```
   - 編集者としての専門性を強調
   - Emphasizes expertise as editor

2. **レビュー観点** / Review Perspectives
   - Overall logical structure / 全体的な論理構造
   - Paragraph composition and flow / パラグラフ構成と流れ
   - Argumentation and coherence / 論証と一貫性
   - Document-level improvements / 文書レベルの改善

3. **コンテキスト注入** / Context Injection
   - `documentPurpose`: レビューの焦点を調整
   - `correctionPolicy`: レビュー方針
   - Dynamically injected from user settings

4. **会話的アプローチ** / Conversational Approach
   - "conversational manner"を指定
   - フォローアップ質問に対応
   - 反復的な改善をサポート
   
   - Specifies "conversational manner"
   - Handles follow-up questions
   - Supports iterative refinement

### パラメータ設定 / Parameter Settings

```typescript
{
  temperature: 0.7,  // 高温度で創造的なフィードバック
                     // Higher temperature for creative feedback
  maxTokens: 1500    // 詳細なレビューに十分
                     // Sufficient for detailed review
}
```

**温度0.7の理由** / Why Temperature 0.7:
- より創造的で多様なフィードバック
- 文脈に応じた柔軟な提案
- 会話的な自然な応答

- More creative and diverse feedback
- Flexible suggestions based on context
- Natural conversational responses

### チャット履歴管理 / Chat History Management

```typescript
if (chatHistory.length === 0) {
  // 初回: 文書全体を含める
  // First time: Include entire document
} else {
  // 継続: 履歴を維持して文脈を保持
  // Continuation: Maintain history for context
}
```

---

## プロンプト修正・拡張ガイド / Prompt Modification & Extension Guide

### プロンプトを修正する場合 / When Modifying Prompts

1. **該当ファイルを編集** / Edit the relevant file
   - `prompts/microCorrections.ts` または `prompts/macroReview.ts`

2. **変更を文書化** / Document changes
   - コメントで変更理由を記述
   - このドキュメントを更新

3. **テストを実施** / Test thoroughly
   - 様々なテキストタイプで検証
   - 出力形式の整合性を確認

4. **バージョン管理** / Version control
   - Git commitで変更履歴を記録
   - 意味のあるコミットメッセージ

### 新しいプロンプトを追加する場合 / When Adding New Prompts

1. **新ファイル作成** / Create new file
   ```
   app/src/prompts/newFeature.ts
   ```

2. **関数エクスポート** / Export functions
   ```typescript
   export function getNewFeaturePrompt(settings: Settings): string {
     // ...
   }
   
   export const NEW_FEATURE_CONFIG = {
     temperature: 0.5,
     // ...
   } as const;
   ```

3. **インデックスに追加** / Add to index
   ```typescript
   // prompts/index.ts
   export { getNewFeaturePrompt, NEW_FEATURE_CONFIG } from './newFeature';
   ```

4. **サービスで使用** / Use in service
   ```typescript
   import { getNewFeaturePrompt } from '../prompts';
   ```

---

## ベストプラクティス / Best Practices

### 1. プロンプトの明確性 / Prompt Clarity

- **具体的な指示**: 曖昧さを避ける
  - **Specific instructions**: Avoid ambiguity
- **例示**: 必要に応じて出力例を含める
  - **Examples**: Include output examples when needed
- **制約**: 明確な制約と境界を設定
  - **Constraints**: Set clear constraints and boundaries

### 2. コンテキストの活用 / Context Utilization

- **ユーザー設定**: `documentPurpose`と`correctionPolicy`を最大限活用
  - **User settings**: Maximize use of `documentPurpose` and `correctionPolicy`
- **動的注入**: 静的プロンプトより動的生成を優先
  - **Dynamic injection**: Prefer dynamic generation over static prompts

### 3. 出力の構造化 / Structured Output

- **JSON使用**: パース可能な形式
  - **Use JSON**: Parseable format
- **スキーマ定義**: TypeScript型との整合性
  - **Schema definition**: Consistency with TypeScript types
- **エラー処理**: パース失敗時のフォールバック
  - **Error handling**: Fallback for parsing failures

### 4. 温度設定 / Temperature Settings

| タスク / Task | 温度 / Temp | 理由 / Reason |
|--------------|-------------|---------------|
| 文法修正 / Grammar | 0.3 | 一貫性 / Consistency |
| 文書レビュー / Review | 0.7 | 創造性 / Creativity |
| コード生成 / Code | 0.0-0.2 | 決定性 / Determinism |
| 創作支援 / Creative | 0.8-1.0 | 多様性 / Diversity |

### 5. トークン管理 / Token Management

- **システムプロンプト**: 簡潔に保つ（< 500トークン）
  - **System prompt**: Keep concise (< 500 tokens)
- **ユーザー入力**: 必要な情報のみ
  - **User input**: Only necessary information
- **出力制限**: maxTokensで制御
  - **Output limit**: Control with maxTokens

---

## トラブルシューティング / Troubleshooting

### 問題: 一貫性のない修正提案 / Issue: Inconsistent Correction Suggestions

**原因**: 温度が高すぎる
- **Cause**: Temperature too high

**解決策**: `MICRO_CORRECTIONS_CONFIG.temperature`を下げる（0.1-0.3推奨）
- **Solution**: Lower `MICRO_CORRECTIONS_CONFIG.temperature` (0.1-0.3 recommended)

### 問題: JSONパースエラー / Issue: JSON Parse Errors

**原因**: LLMが形式外の出力を生成
- **Cause**: LLM generates output outside format

**解決策**: 
- **Solution**:
  1. システムプロンプトで形式をより明確に指定
     - Specify format more clearly in system prompt
  2. "Only return the JSON array"を強調
     - Emphasize "Only return the JSON array"
  3. Few-shot例を追加
     - Add few-shot examples

### 問題: マクロレビューが表面的 / Issue: Superficial Macro Review

**原因**: 温度が低すぎる、または指示が不明確
- **Cause**: Temperature too low or unclear instructions

**解決策**:
- **Solution**:
  1. 温度を0.7-0.8に調整
     - Adjust temperature to 0.7-0.8
  2. "detailed feedback"を強調
     - Emphasize "detailed feedback"
  3. レビュー観点をより具体的に
     - Make review perspectives more specific

---

## パフォーマンス最適化 / Performance Optimization

### コスト削減 / Cost Reduction

1. **モデル選択**: タスクに応じた適切なモデル
   - **Model selection**: Appropriate model for task
   - 文法: GPT-4o Mini（十分な性能、低コスト）
   - Grammar: GPT-4o Mini (sufficient performance, low cost)
   - レビュー: GPT-4o（高品質なフィードバック）
   - Review: GPT-4o (high-quality feedback)

2. **バッチ処理**: 可能な場合は複数修正を1回で
   - **Batch processing**: Multiple corrections in one call when possible

3. **キャッシング**: 同一文書の再分析を避ける
   - **Caching**: Avoid re-analyzing same document

### レスポンス速度 / Response Speed

1. **ストリーミング**: 長文レビューではstreaming API使用を検討
   - **Streaming**: Consider streaming API for long reviews

2. **並列処理**: 独立したセクションは並列で処理
   - **Parallel processing**: Process independent sections in parallel

3. **maxTokens制限**: 不要に大きな値を避ける
   - **maxTokens limit**: Avoid unnecessarily large values

---

## 更新履歴 / Update History

| 日付 / Date | 変更内容 / Changes | 担当者 / Author |
|------------|-------------------|----------------|
| 2026-01-28 | 初版作成 / Initial version | Copilot |

---

## 参考資料 / References

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Best Practices for Prompt Engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api)
