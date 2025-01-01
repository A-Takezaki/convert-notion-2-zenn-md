import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from 'fs';
import dotenv from 'dotenv';
import { resourceLimits } from "worker_threads";

// Initialize
// Load environment variables
dotenv.config();
const notionIntegrationToken = process.env.NOTION_INTEGRATION_TOKEN;
const notionTargetPageId = process.env.NOTION_TARGET_PAGE_ID;


const notion = new Client({
  auth: notionIntegrationToken,
});

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });
// Initialize END

// Get the page
(async () => {
  const mdblocks = await n2m.pageToMarkdown(notionTargetPageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  console.log(mdString.parent);
  // Notion記法mdファイルをzenn記法mdファイルに変換する
  // bookmarkタグを外す
  const updatedMdString = mdString.replace(/\[bookmark\]\((https:\/\/zenn.dev\/[^\)]+)\)/g, '$1');
  console.log(updatedMdString);
  // 画像をDLしてリンクを変更する
  // calloutブロックをalertタグに変換する

})();