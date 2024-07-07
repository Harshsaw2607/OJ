import React, { useState } from 'react';
import ProblemForm from './ProblemForm';
// import ProblemList from './ProblemDetails/ProblemDetails';
import ProblemDetail from './ProblemSet';

const ProblemSetterPage = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const handleAddProblem = (newProblem) => {
    // Add new problem to the list
    setProblems([...problems, newProblem]);
  };

  const handleSelectProblem = (problem) => {
    // Set the selected problem for editing
    setSelectedProblem(problem);
  };

  const handleSaveProblem = (updatedProblem) => {
    // Update the existing problem in the list
    const updatedProblems = problems.map((p) => (p.title === updatedProblem.title ? updatedProblem : p));
    setProblems(updatedProblems);
    setSelectedProblem(null); // Clear selected problem after saving
  };

  return (
    <div>
      <ProblemForm onSubmit={handleAddProblem} />
      {/* <ProblemList problems={problems} onSelectProblem={handleSelectProblem} /> */}
      <ProblemDetail problem={selectedProblem} onSave={handleSaveProblem} />
    </div>
  );
};

export default ProblemSetterPage;
