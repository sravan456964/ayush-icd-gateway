import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Term {
  id: string;
  local_name: string;
  namaste_code: string;
  icd_code: string;
  description: string;
}

export const useTermSearch = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Term[]>([]);
  const { user } = useAuth();

  const logAction = async (action: string, details?: any) => {
    if (!user) return;
    
    await supabase.from('logs').insert({
      action,
      user_id: user.id,
      user_email: user.email,
      details
    });
  };

  const searchTerms = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('terms')
        .select('*')
        .or(`local_name.ilike.%${query}%,namaste_code.ilike.%${query}%,icd_code.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(10);

      if (error) throw error;

      setResults(data || []);
      
      // Log search action
      await logAction('search_terms', { query, results_count: data?.length || 0 });
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchTerms,
    results,
    loading,
    logAction
  };
};