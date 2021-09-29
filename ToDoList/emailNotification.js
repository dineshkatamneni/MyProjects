const express = require("express");
const path = require("path");
const http = require("http");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const port = process.env.PORT || "3001";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server Running on localhost:${port}`));


var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const sns = new AWS.SNS({region: 'us-east-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var queueURL = "https://sqs.us-east-1.amazonaws.com/655674859658/taskList";

var params = {
    AttributeNames: [
        "SentTimestamp"
     ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
       "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 10
   };


const receiveMessage = () => sqs.receiveMessage(params, function(err, data) {
    console.log(data);
    let emailMsg = "";
    if (err) {
      console.log("Receive Error", err);
    } else if (data) {
      console.log('-------------- MESSAGE RECEIVED -------------');
      let body = JSON.parse(data.Messages[0].Body);
      //console.log(data[0]);
      console.log(body);
      body.forEach((m) => {
         let email = m.email;
         console.log(email);
         const length = m.tasks.length;
         console.log(length);
         for (var i = 0; i < length; i++) {
             emailMsg = emailMsg + m.tasks[i].title + m.tasks[i].description + m.tasks[i].due_date + '\n';
         }
         console.log(emailMsg);
             let params = {
             Message: emailMsg,
             Subject: 'Daily Task Notification',
             TopicArn: 'arn:aws:sns:us-east-1:655674859658:sendEmail'
        };
         sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); 
        else console.log(data);
        });
      });

    }
  });

exports.handler = receiveMessage;
