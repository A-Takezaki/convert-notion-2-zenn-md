import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from 'fs';
import dotenv from 'dotenv';
import { resourceLimits } from "worker_threads";

dotenv.config();
const notionIntegrationToken = process.env.NOTION_INTEGRATION_TOKEN;
const notionTargetPageId = process.env.NOTION_TARGET_PAGE_ID;

 
const notion = new Client({
  auth: notionIntegrationToken,
});

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });

(async () => {
  const mdblocks = await n2m.pageToMarkdown(notionTargetPageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  console.log(mdString.parent);
})();