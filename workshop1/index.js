const line = require("@line/bot-sdk");
const express = require("express");
const fortunes = require("./fortune.json");
const messagingClient = new line.messagingApi.MessagingApiClient(lineConfig);

const lineConfig = {
  channelSecret: "8da444a80397eaa7e358d515e3fadc1c",
  channelAccessToken: "FgzWVyx0A998BabWVhmFABdJLraIZOMteOoPFeesQ+dyLt+CjkqBrfD30mxZ3Pv+bwcsw6fMlTSJbdQMVWoTErdfeX4wW4X/KkYi/OwdPxkc3ow4KqYndZbPufdi0E2yNH+hVsbq9R2/btEP124jLAdB04t89/1O/w1cDnyilFU=",
};

const app = express();
app.post("/", line.middleware(lineConfig), handlePostRequest);
app.listen(3000);

async function handlePostRequest(req, res) {
  const { events } = req.body;

  const eventHandledPromises = events.map(handleLineEvent);

  const result = await Promise.all(eventHandledPromises);

  return res.send(result);
}

function reply(event, ...messages) {
  return messagingClient.replyMessage({
    replyToken: event.replyToken,
    messages: messages.map(message => ({
      type: "text",
      text: message,
    })),
  });
}

function handleLineEvent(event) {
  return reply(event, "สวัสดีจากดูดวง Bot");
}