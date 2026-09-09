# 筑习 V1 → 正式规范题库接入包

## 已完成

- 来源：`01《建筑设计规范常用条文速查手册》（重庆大学版）.pdf`
- 转换为结构化 JSON
- 每条题目包含：`id / chapter_id / section_id / number / prompt / answer / references / page / type / tags`
- 支持按章节、条文、题型、标签检索
- `page` 用于“查看参照”时定位 PDF 页码
- `references` 保存原手册中的《规范名称》及条号
- 当前数据共 386 条结构化条目、186 个章节/小节节点

## 目录建议

```text
zhu-xi/
├─ index.html
├─ manifest.webmanifest
├─ sw.js
└─ data/
   └─ code-bank.min.json
```

把 `code-bank.min.json` 放入仓库的 `data/` 文件夹。

## 重要说明

这是“用户提供手册”的原文结构化转换，不等同于 2026 年现行国家规范数据库。手册内部引用的规范版本可能已经变化，因此程序中应明确显示“来源手册版本”，不要把它标成“现行规范”。

## “查看参照”应该显示

- 规范名称及条号：来自 `references`
- 手册 PDF 页码：来自 `page`
- 来源：`建筑设计规范常用条文速查手册（重庆大学版）`

这样点击“查看依据”时，不再出现“正式题库将在部署版本中……”的占位文本。
