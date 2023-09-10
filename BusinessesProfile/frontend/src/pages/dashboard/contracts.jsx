import React from 'react';

const ContractPages = () => {
  const contracts = [
    {
      volunteerName: 'Alice Smith',
      contractTitle: 'Social Media Marketing Contract',
      skills: 'Social Media, Marketing, Content Creation',
      startDate: '2023-10-01',
      endDate: '2023-11-30',
      terms: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac elementum ex, at egestas leo.',
    },
    {
      volunteerName: 'John Doe',
      contractTitle: 'Event Coordination Contract',
      skills: 'Event Planning, Coordination, Marketing',
      startDate: '2023-09-15',
      endDate: '2023-12-15',
      terms: 'Fusce id arcu vitae purus efficitur fermentum. Pellentesque a urna at lectus vestibulum ullamcorper.',
    },
    {
      volunteerName: 'David Johnson',
      contractTitle: 'Website Development Contract',
      skills: 'Web Development, Frontend, Backend',
      startDate: '2023-10-05',
      endDate: '2023-11-30',
      terms: 'Vivamus eget tortor vehicula, ultrices sapien sed, suscipit dui.',
    },
    {
      volunteerName: 'Emily Brown',
      contractTitle: 'Graphic Design Contract',
      skills: 'Graphic Design, Adobe Creative Suite',
      startDate: '2023-09-20',
      endDate: '2023-11-15',
      terms: 'Cras tristique luctus orci, ut lacinia purus cursus nec.',
    },
    {
      volunteerName: 'Michael Wilson',
      contractTitle: 'Content Writing Contract',
      skills: 'Content Writing, Blogging, SEO',
      startDate: '2023-10-10',
      endDate: '2023-12-10',
      terms: 'Suspendisse potenti. Sed nec volutpat augue, non lacinia ipsum.',
    },
  ];

  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Volunteer</th>
            <th className="py-3 px-6 text-left">Contract Title</th>
            <th className="py-3 px-6 text-left">Skills</th>
            <th className="py-3 px-6 text-left">When Started</th>
            <th className="py-3 px-6 text-left">Expected Time to Finish</th>
            <th className="py-3 px-6 text-left">View Contract</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {contracts.map((contract, index) => (
            <tr key={index}>
              <td className="py-4 px-6 font-semibold">{contract.volunteerName}</td>
              <td className="py-4 px-6">{contract.contractTitle}</td>
              <td className="py-4 px-6">{contract.skills}</td>
              <td className="py-4 px-6">{contract.startDate}</td>
              <td className="py-4 px-6">{contract.endDate}</td>
              <td className="py-4 px-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractPages;
