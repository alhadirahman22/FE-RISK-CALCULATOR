import React from 'react';
import useRiskCalculator from '../hooks/useRiskCalculator';
import { useEffect } from 'react';

const RiskCalculator = () => {
    const {
        probability,
        exposure,
        consequence,
        selectedProbability,
        selectedExposure,
        selectedConsequence,
        riskLevel,
        loading,
        error,
        submissionStatus,
        setSelectedProbability,
        setSelectedExposure,
        setSelectedConsequence,
        handleSubmit
    } = useRiskCalculator();



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-bold mb-4">Risk Calculator</h2>
            <div className="mb-4">
                <label htmlFor="probability" className="block text-sm font-medium text-gray-700">Probability</label>
                <select
                    id="probability"
                    value={selectedProbability}
                    onChange={(e) => setSelectedProbability(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select Probability</option>
                    {probability.map(option => (
                        <option key={option.id} value={option.weight}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="exposure" className="block text-sm font-medium text-gray-700">Exposure</label>
                <select
                    id="exposure"
                    value={selectedExposure}
                    onChange={(e) => setSelectedExposure(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select Exposure</option>
                    {exposure.map(option => (
                        <option key={option.id} value={option.weight}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="consequence" className="block text-sm font-medium text-gray-700">Consequence</label>
                <select
                    id="consequence"
                    value={selectedConsequence}
                    onChange={(e) => setSelectedConsequence(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select Consequence</option>
                    {consequence.map(option => (
                        <option key={option.id} value={option.weight}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleSubmit}
                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
                Submit
            </button>
            {riskLevel && (
                <div className="mt-4 text-lg font-semibold">
                    Risk Level: {riskLevel}
                </div>
            )}
            {submissionStatus && (
                <div className="mt-4 text-lg font-semibold">
                    {submissionStatus}
                </div>
            )}
        </div>
    );
};

export default RiskCalculator;
