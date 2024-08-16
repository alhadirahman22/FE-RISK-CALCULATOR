import { useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';

const useRiskCalculator = () => {
    const [probability, setProbability] = useState([]);
    const [exposure, setExposure] = useState([]);
    const [consequence, setConsequence] = useState([]);
    const [selectedProbability, setSelectedProbability] = useState('');
    const [selectedExposure, setSelectedExposure] = useState('');
    const [selectedConsequence, setSelectedConsequence] = useState('');
    const [riskLevel, setRiskLevel] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('');

    useEffect(() => {
        const fetchRiskOptions = async () => {
            try {
                const [probResponse, expResponse, conResponse] = await Promise.all([
                    axiosInstance.get('/api/probability'),
                    axiosInstance.get('/api/exposure'),
                    axiosInstance.get('/api/consequence')
                ]);
                setProbability(probResponse.data);
                setExposure(expResponse.data);
                setConsequence(conResponse.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchRiskOptions();
    }, []);

    const handleSubmit = async () => {
        if (selectedProbability && selectedExposure && selectedConsequence) {
            try {
                const response = await axiosInstance.post('/api/risk-calculator', {
                    weight_probability: selectedProbability,
                    weight_exposure: selectedExposure,
                    weight_consequence: selectedConsequence,
                });
                setSubmissionStatus(`Risk Score: ${response.data.data.result
                    }`);
                setRiskLevel(response.data.data.level)
            } catch (error) {
                setSubmissionStatus(`Error: ${error.message}`);
                setRiskLevel(null)
            }
        } else {
            setSubmissionStatus('Please select all fields before submitting.');
            setRiskLevel(null)
        }
    };

    return {
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
    };
};

export default useRiskCalculator;
