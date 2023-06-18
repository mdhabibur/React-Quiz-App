import { useNavigate, useParams, useHistory, useLocation } from "react-router-dom";
import Analysis from "../Analysis";
import Summary from "../Summary";
import useAnswers from "../../hooks/useAnswers";
import _ from 'lodash';
import { check } from "prettier";

export default function Result() {

  const {id} = useParams();

  const location = useLocation();
  const { state } = location;

  const {qna} = state;
  //inside 'qna' there the the whole questions object with 'checked' set to true or false
  //and from firebase's 'answers' object we will get the same questions object but with 'correct' answer set to 'true'

  const {loading, error, answers} = useAnswers(id);

  console.log(answers);

  function calculate(){
    var score = 0;

    var correctIndexes = [];
    var checkedIndexes = [];

    answers.forEach( (question, index1) =>

      {
      //'answers' node came from firebase and 'qna' array is from our local state
      //for the questions whose 'correct' is set to true from 'answers' node and 'checked' is set to true from 'qna' local state, those are answered correctly by user
      //so we will create an array of 'correct' index and another of 'checked' index and compare them. if they are same then the answer given by the user was true

      question.options.forEach( (option, index2) => 

        {

          if(option.correct){
            correctIndexes.push(index2);
  
          }

          if(qna[index1].options[index2].checked) {
            checkedIndexes.push(index2);
            option.checked = true; //answer jeta setai toiri hoye thaklo , checked bosano obosthai. ati pore lagbe result analysis page
  
          }
  
          console.log(correctIndexes);
          console.log(checkedIndexes);

        }


      )

      //now compare the two arrays

      //if the two arrays are structurally same, then it will return true
      if(_.isEqual(correctIndexes, checkedIndexes)){
        score = score + 5;
      }

      }


    );

    return score;
  }


  const userScore = calculate();

  return (
    <>
      { loading && <div>Loading...</div> }
      { error && <div> there was an error </div>}

      {answers && answers.length > 0 && (
        <>
          <Summary  score = {userScore} noq = {answers.length} />
          <Analysis answers = {answers} />
          {/* answers er vitore each and everything ase.
          in this 'answers' array there are both the 'correct' and the 'checked' property as the 'option.checked = true' above  */}


        </>

      )
      }

    </>
  );
}