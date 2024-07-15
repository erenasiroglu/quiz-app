import axios from "axios";

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const questions = response.data.slice(0, 10).map((post, index) => ({
      id: index + 1,
      title: post.title,
      body: post.body,
    }));
    return questions;
  } catch (error) {
    throw new Error("Error fetching questions: ", error);
  }
};
