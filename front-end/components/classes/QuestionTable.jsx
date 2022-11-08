import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosInstance from '../../pages/api';
import QuestionBox from './QuestionBox';
const questions = [
  {
    createdAt: new Date(),
    id: 1,
    title: '네트워크',
    author: {
      nickname: '2je0',
    },
    contents: '제목있음',
    answerCount: 10,
  },
  {
    createdAt: new Date(),
    id: 2,
    title: '네트워크',
    author: {
      nickname: '2je0',
    },
    contents: '제목있음',
    answerCount: 10,
  },
];
const courseName = '네트워크';
const QuestionTable = ({ courseId }) => {
  //   const [questions, setQuestions] = useState("");
  //   const [courseName, setCourseName] = useState("");
  const router = useRouter();
  // useEffect(() => {
  // 	if (!router.isReady) return;
  // 	fetchQuestions(courseId)
  // 		.then((res) => {
  // 			const orderedDate = res.data.sort(
  // 				(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  // 			);
  // 			setQuestions(orderedDate);
  // 		})
  // 		.catch((e) => console.log('questions/course/${courseId}' + e));
  // }, [router.isReady]);
  // useEffect(() => {
  // 	if (!router.isReady) return;
  // 	fetchCourseName(courseId)
  // 		.then((res) => {
  // 			setCourseName(res.data.title);
  // 		})
  // 		.catch((e) => console.log(e));
  // }, [router.isReady]);

  return (
    <ul>
      {questions.map(question => {
        return (
          <QuestionBox
            key={question.id}
            question={question}
            courseName={courseName}
          />
        );
      })}
    </ul>
  );
};

export default QuestionTable;
