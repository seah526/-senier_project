import { useRouter } from 'next/router';
import QuestionBox from './QuestionBox';

const QuestionTable = ({ data, question }) => {
  const { subject: courseName, questions } = data;

  const router = useRouter();
  const filterProfessor = router.query.professor;
  const sortedQuestions = questions
    ? questions
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter(ele => {
          if (filterProfessor == -1 || filterProfessor == undefined)
            return true;
          return ele.professor.id == filterProfessor;
        })
    : [];
  const renderData = sortedQuestions.map(question => {
    return (
      <QuestionBox
        key={question.id}
        question={question}
        courseName={courseName}
      />
    );
  });
  return (
    <ul>
      {renderData.length > 0 ? renderData : <div>표시할 데이터 없음</div>}
    </ul>
  );
};

export default QuestionTable;
