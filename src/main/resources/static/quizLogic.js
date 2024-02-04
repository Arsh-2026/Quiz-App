
document.addEventListener('DOMContentLoaded', function() {
    const instructionsButton = document.getElementById('Instructions');
    const backButton = document.getElementById('Back');
    const startQuizButton = document.getElementById('Start Quiz');
  
  
    if (instructionsButton) {
        instructionsButton.addEventListener('click', function() {
            window.location.href = 'Instructions.html';
        });
    }
  
    if (backButton) {
        backButton.addEventListener('click', function() { 
            window.location.href = 'quizApp.html';
        });
    }
  
    if (startQuizButton) {
        startQuizButton.addEventListener('click', function() {
            var userResponse = prompt('Enter your name before starting the quiz:');
            if (userResponse) {
                alert('Hello, ' + userResponse + '! Get ready to start the quiz!');
                window.location.href = 'quiz.html';
            } else {
                alert('Quiz cancelled. Enter your name to start the quiz.');
            }
        });
    }

    const questions = [
        {
            question:"1. What does HTML stand for?",
            options:["A. HyperText Markup Language","B. High-Level Text Manipulation Language","C. Hyperlink and Text Markup Language","D. HyperTransfer Markup Language"],
            correctAnswer : "A. HyperText Markup Language"
        },
        {
            question:"2. Which programming language is known as the 'language of the web'?",
            options:["A.java","B.python","C.JS","D.ruby"],
            correctAnswer : "C.JS"
        },
      
        {
            question:"3. Which programming language is known for its readability and simplicity?",
            options:["A.C++","B.python","C.Java","D.ruby"],
            correctAnswer : "B.Python"
        },
      
        {
            question:"4. What is the purpose of CSS in web development?",
            options:["A. Client-Side Scripting","B. Computer Style Sheet","C. Cascading Style Sheets","D. Central Style System"],
            correctAnswer : "C. Cascading Style Sheets"
        },
        
      
        {
            question:"5. In the context of databases, what does SQL stand for?",
            options:["A. Structured Question Language","B. Simple Query Language","C. Structured Query Language","D. Systematic Question Language"],
            correctAnswer : "C. Structured Query Language"
        },
        
        {
            question:"6. Which data structure follows the Last In, First Out (LIFO) principle?",
        options:["A. Queue","B. Linked List","C. Stack","D. Tree"],
            correctAnswer : "C. Stack"
        },
        
        {
            question:"7. What is the primary function of an operating system?",
            options:["A. Data Storage","B. User Interface","C. Resource Management","D. Algorithm Design"],
            correctAnswer : "C. Resource Management"
        },
        
        {
            question:"8. Which of the following is not a type of network?",
            options:["A. LAN (Local Area Network)","B. MAN (Metropolitan Area Network)","C. WAN (Wide Area Network)","D. NAN (National Area Network)"],
            correctAnswer : "D. NAN (National Area Network)"
        },
        
        {
            question:"9. What is the purpose of the git version control system?",
            options:["A. File Encryption","B. Code Collaboration and Versioning","C. Data Compression","D. Database Management"],
            correctAnswer : "B. Code Collaboration and Versioning"
        },
        
        {
            question:"10. What does the acronym URL stand for?",
            options:["A. Uniform Resource Locator","B. Universal Remote Link","C. Unified Resource Locator","D. User Registration Link"],
            correctAnswer : "B. Universal Remote Link"
        },
        
        
      ];

      const quiz = document.getElementById('quiz');
      const answer = document.querySelectorAll('.answer');
      const question = document.getElementById('question');
      const option1 = document.getElementById('option1');
      const option2 = document.getElementById('option2');
      const option3 = document.getElementById('option3');
      const option4 = document.getElementById('option4');
      const submitBtn = document.getElementById('submit-Quiz');
      const nextBtn = document.getElementById('next-Question');
      const previousBtn = document.getElementById('previous-Question');
      
      let currentQuestionIndex = 0;
      let score = 0;
      let userResponses = [] ;
      
    startQuiz() ;
    
    function startQuiz(){
        
        unselectAnswer() ;
        const currentQuestionData = questions[currentQuestionIndex];
        question.innerText = currentQuestionData.question;
        option1.innerText = currentQuestionData.options[0];
        option2.innerText = currentQuestionData.options[1];
        option3.innerText = currentQuestionData.options[2];
        option4.innerText = currentQuestionData.options[3];

        document.querySelectorAll('.answer').forEach((label, i) => {
                label.addEventListener('click', function () {
                        storeUserResponse(currentQuestionData.options[i]);
                });
        });
    }

    function storeUserResponse(optionIndex) {
        userResponses[currentQuestionIndex] = optionIndex || undefined;
    }

    function unselectAnswer() {
        const selectedOption = userResponses[currentQuestionIndex];
        if (selectedOption !== undefined) {
            const selectedRadio = document.getElementById(`option${selectedOption + 1}`);
            if (selectedRadio) {
                selectedRadio.checked = false;
            }
        }
    }
    
      function isAnyOptionSelected() {
        const selectedOption = userResponses[currentQuestionIndex];
        return selectedOption !== undefined;
    }

    nextBtn.addEventListener('click', function () {
        if (currentQuestionIndex < questions.length - 1) {
            if (isAnyOptionSelected()) {
                currentQuestionIndex++;
                startQuiz();
                var radioButtons = document.querySelectorAll('input[name="answer"]');
                radioButtons.forEach(radio => radio.checked = false);
            } else {
                alert('Please select an option before moving to the next question.');
            }
        }
    }); 

    previousBtn.addEventListener('click', function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            const radioButtons = document.querySelectorAll('input[name="answer"]');
            radioButtons.forEach(radio => radio.checked = false);
            if (userResponses[currentQuestionIndex] !== undefined) {
                const selectedRadio = document.getElementById(`option${userResponses[currentQuestionIndex] + 1}`);
                if (selectedRadio) {
                    selectedRadio.checked = true;
                }
            }
            startQuiz();
        }
    });
    
    submitBtn.addEventListener('click', function () {

        alert("Do you really want to submit the quiz?");
        score = calculateScore();
        displayFeedback(score);
    });
  
    function calculateScore() {
    
        for (let i = 0; i < questions.length; i++) {
            if (userResponses[i] === questions[i].correctAnswer) {
                score++;
            }
        }
        return score ;
    }


    function displayFeedback() {
        const quizContainer = document.getElementById('quiz');
        if (!quizContainer) {
            return;
        }

        const feedbackContentDiv = document.createElement('div');
        feedbackContentDiv.id = 'feedback-content';
        let feedbackMessage = `<h1 >You answered ${score}/${questions.length} questions correctly</h1> 
                                <h2>Take a closer look at your responses<hr></h2>`;

        for (let i = 0; i < questions.length; i++) {
            const userResponse = userResponses[i];
            const correctResponse = questions[i].correctAnswer;
            const questionText = questions[i].question;
            feedbackMessage += `
                <div>
                    <p>Question ${questionText}</p>
                    <p>Your Response: ${userResponse ? userResponse : 'Not answered'}</p>
                    <p>Correct Response: ${correctResponse}</p><hr>
                </div>`;
        }

        feedbackContentDiv.innerHTML = feedbackMessage;

        if (score == questions.length) {
            feedbackMessage += "Congratulations! You got a perfect score. Well done!";
        } else if (score >= questions.length / 2) {
            feedbackMessage += "Good job! You did well. Keep it up!";
        } else {
            feedbackMessage += "You can do better. Keep practicing and try again!";
        }

        // Apply CSS style to make the feedback content scrollable
        feedbackContentDiv.style.overflow = 'auto';
        feedbackContentDiv.style.maxHeight = '80vh';

        // Update the innerHTML of the quizContainer with the feedback-content
        quizContainer.innerHTML = '';
        quizContainer.appendChild(feedbackContentDiv);
    }
        
  });
