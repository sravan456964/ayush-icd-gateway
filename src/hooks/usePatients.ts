import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  namaste_code: string;
  icd_code: string;
  fhir_record?: any;
  created_at: string;
}

interface CreatePatientData {
  name: string;
  age: number;
  diagnosis: string;
  namaste_code: string;
  icd_code: string;
  fhir_record?: any;
}

export const usePatients = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
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

  const createPatient = async (patientData: CreatePatientData) => {
    if (!user) throw new Error('User must be authenticated');

    setLoading(true);
    try {
      // Generate FHIR record
      const fhirRecord = {
        resourceType: "Patient",
        id: crypto.randomUUID(),
        meta: {
          profile: ["http://hl7.org/fhir/StructureDefinition/Patient"]
        },
        identifier: [
          {
            system: "https://namaste.ayush.gov.in",
            value: patientData.namaste_code
          },
          {
            system: "https://icd.who.int/browse11",
            value: patientData.icd_code
          }
        ],
        name: [
          {
            use: "official",
            text: patientData.name
          }
        ],
        birthDate: new Date().getFullYear() - patientData.age,
        condition: [
          {
            code: {
              coding: [
                {
                  system: "https://namaste.ayush.gov.in",
                  code: patientData.namaste_code,
                  display: patientData.diagnosis
                },
                {
                  system: "https://icd.who.int/browse11",
                  code: patientData.icd_code,
                  display: patientData.diagnosis
                }
              ]
            }
          }
        ]
      };

      const { data, error } = await supabase
        .from('patients')
        .insert({
          ...patientData,
          user_id: user.id,
          fhir_record: fhirRecord
        })
        .select()
        .single();

      if (error) throw error;

      // Log patient creation
      await logAction('create_patient', { 
        patient_id: data.id, 
        diagnosis: patientData.diagnosis,
        codes: { namaste: patientData.namaste_code, icd: patientData.icd_code }
      });

      return { data, error: null };
    } catch (error) {
      console.error('Create patient error:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPatients(data || []);
      
      // Log fetch action
      await logAction('fetch_patients', { count: data?.length || 0 });
    } catch (error) {
      console.error('Fetch patients error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createPatient,
    fetchPatients,
    patients,
    loading
  };
};