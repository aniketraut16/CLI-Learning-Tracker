import inquirer from "inquirer";
import { AddTopic, FetchTopics } from "./modules/topics";
inquirer
  .prompt([
    {
      type: "list",
      name: "selectedOption",
      message: "What's your name?",
      choices: [
        "Add a new learning topic",
        "Log progress",
        "View summary of all topics",
        "Analyze learning trends",
        "Exit",
      ],
    },
  ])
  .then((answer: any) => {
    if (answer.selectedOption === "Add a new learning topic") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "topicName",
            message: "Enter Topic Name",
          },
          {
            type: "input",
            name: "topicGoal",
            message: "What is your Goal in context to thi topic?",
          },
        ])
        .then((newtopic: any) => {
          AddTopic({
            name: newtopic.topicName,
            goal: newtopic.topicGoal,
          });

          console.log(`${newtopic.topicName} is Succesfully Added!`);
        })
        .catch((error: any) => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
          } else {
            // Something else went wrong
            console.error(error);
          }
        });
    } else if (answer.selectedOption === "View summary of all topics") {
      const topics = FetchTopics("all");
      console.log(`TOPIC LIST \n ${topics}`);
    } else {
      console.log("Other Options are not Implemented Yet");
    }
  })
  .catch((error: any) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
      console.error(error);
    }
  });
