import * as fs from "fs";
import * as path from "path";

type Topic = {
  name: string;
  goal?: string;
  status: "in-progress" | "completed" | "pending";
};

// Use the correct file extension for JSON data
const filePath = path.join(__dirname, "../data/TopicList.json");

let TopicList: Topic[] = [];

try {
  // Read and parse the JSON file
  const data = fs.readFileSync(filePath, "utf-8");
  TopicList = JSON.parse(data) as Topic[];
} catch (error) {
  console.error("Failed to load topics from file:", error);
}

export function AddTopic(newtopic: Omit<Topic, "status">): void {
  TopicList.push({
    status: "pending",
    ...newtopic,
  });

  // Write updated data back to the file
  try {
    fs.writeFileSync(filePath, JSON.stringify(TopicList, null, 2), "utf-8");
    console.log("Topic added successfully.");
  } catch (error) {
    console.error("Failed to write topics to file:", error);
  }
}

export function FetchTopics(identifier: string): Topic[] {
  if (identifier === "all") {
    return TopicList;
  } else {
    return TopicList.filter((topic) => topic.name === identifier);
  }
}
