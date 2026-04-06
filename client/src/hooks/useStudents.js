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
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });

      const { data } = await api.get('/students', { params });
      setStudents(data.students);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    const timer = setTimeout(fetchStudents, filters.search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchStudents, filters.search]);

  return { students, loading, error, refetch: fetchStudents };
};

export default useStudents;
