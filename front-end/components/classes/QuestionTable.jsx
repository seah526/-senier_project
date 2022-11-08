import { useRouter } from 'next/router';
import QuestionBox from './QuestionBox';

const QuestionTable = ({ data }) => {
  const { subject: courseName, questions } = data;

  const router = useRouter();
  const filterProfessor = router.query.professor;
  const sortedQuestions = questions
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter(ele => {
      if (filterProfessor == -1 || filterProfessor == undefined) return true;
      return ele.professor.id == filterProfessor;
    });
  return (
    <ul>
      {sortedQuestions.map(question => {
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
