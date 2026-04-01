import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const useStudents = (filters = {}) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filters.country) params.country = filters.country;
      if (filters.search) params.search = filters.search;
      if (filters.examType) params.examType = filters.examType;

      const { data } = await api.get('/students', { params });
      setStudents(data.students);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }, [filters.country, filters.search, filters.examType]);

  useEffect(() => {
    const timer = setTimeout(fetchStudents, filters.search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchStudents, filters.search]);

  return { students, loading, error, refetch: fetchStudents };
};

export default useStudents;
