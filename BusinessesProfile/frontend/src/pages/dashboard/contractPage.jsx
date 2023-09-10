import React from 'react';

const ContractPage = ({ volunteerName, contractTitle, terms }) => {
  return (
    <div className="contract-page max-w-xl mx-auto my-4 p-6 bg-white rounded-lg shadow-lg">
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td className="font-semibold pr-4">Contract Title:</td>
            <td>{contractTitle}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Volunteer:</td>
            <td>{volunteerName}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Terms and Conditions:</td>
            <td>{terms}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContractPage;
