const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

const databaseId = process.env.NOTION_DATABASE_ID;

module.exports = async function getTasks() {
  const payload = {
    path: `databases/${databaseId}/query`,
    method: 'POST',
  };

  const { results } = await notion.request(payload);

  const tasks = results.map(page => {
    console.log(page.properties.Description.rich_text[0].text.content);

    console.log(page.properties.Tags);

    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      date: page.properties.Date.date.start,
      tags: page.properties.Tags.multi_select[0].name,
      description: page.properties.Description.rich_text[0].text.content,
    };
  });

  return tasks;
};