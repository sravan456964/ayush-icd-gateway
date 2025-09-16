-- Create terms table for NAMASTE to ICD-11 mapping
CREATE TABLE public.terms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  local_name TEXT NOT NULL,
  namaste_code TEXT NOT NULL,
  icd_code TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patients table for patient records with dual coding
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  diagnosis TEXT NOT NULL,
  namaste_code TEXT NOT NULL,
  icd_code TEXT NOT NULL,
  fhir_record JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create logs table for audit trail
CREATE TABLE public.logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  user_id UUID,
  user_email TEXT,
  details JSONB,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for terms (public read, authenticated users can search)
CREATE POLICY "Terms are publicly readable" 
ON public.terms 
FOR SELECT 
USING (true);

-- RLS Policies for patients (users can only see their own records)
CREATE POLICY "Users can view their own patients" 
ON public.patients 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own patients" 
ON public.patients 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own patients" 
ON public.patients 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for logs (only authenticated users can read their own logs)
CREATE POLICY "Users can view their own logs" 
ON public.logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert logs" 
ON public.logs 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_terms_updated_at
  BEFORE UPDATE ON public.terms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert seed data for terms table with common diseases and their NAMASTE/ICD codes
INSERT INTO public.terms (local_name, namaste_code, icd_code, description) VALUES
  ('Jwara', 'NAM-001', 'R50.9', 'Fever, unspecified - Traditional Ayurvedic term for fever conditions'),
  ('Prameha', 'NAM-002', 'E11.9', 'Type 2 diabetes mellitus without complications - Ayurvedic diabetes classification'),
  ('Kasa', 'NAM-003', 'R05', 'Cough - Ayurvedic respiratory condition'),
  ('Shwasa', 'NAM-004', 'J44.1', 'Chronic obstructive pulmonary disease with acute exacerbation - Breathing difficulties'),
  ('Atisara', 'NAM-005', 'K59.1', 'Diarrhea, unspecified - Ayurvedic digestive disorder'),
  ('Arsha', 'NAM-006', 'K64.9', 'Hemorrhoids, unspecified - Ayurvedic term for piles'),
  ('Kamala', 'NAM-007', 'K72.9', 'Hepatic failure, unspecified - Jaundice in Ayurveda'),
  ('Pandu', 'NAM-008', 'D50.9', 'Iron deficiency anemia, unspecified - Ayurvedic anemia'),
  ('Shotha', 'NAM-009', 'R60.9', 'Edema, unspecified - Ayurvedic swelling condition'),
  ('Kushtha', 'NAM-010', 'L30.9', 'Dermatitis, unspecified - Ayurvedic skin diseases'),
  ('Vatarakta', 'NAM-011', 'M10.9', 'Gout, unspecified - Ayurvedic joint disorder'),
  ('Shirahshula', 'NAM-012', 'G44.1', 'Vascular headache, not elsewhere classified - Ayurvedic headache'),
  ('Hikka', 'NAM-013', 'R06.6', 'Hiccough - Ayurvedic hiccup condition'),
  ('Chardi', 'NAM-014', 'R11', 'Nausea and vomiting - Ayurvedic nausea'),
  ('Gulma', 'NAM-015', 'K92.9', 'Disease of digestive system, unspecified - Abdominal mass in Ayurveda'),
  ('Udara', 'NAM-016', 'K92.9', 'Disease of digestive system, unspecified - Ayurvedic abdominal diseases'),
  ('Grahani', 'NAM-017', 'K58.9', 'Irritable bowel syndrome without diarrhea - Ayurvedic digestive disorder'),
  ('Amlapitta', 'NAM-018', 'K21.9', 'Gastro-esophageal reflux disease without esophagitis - Ayurvedic acidity'),
  ('Agnimandya', 'NAM-019', 'K30', 'Functional dyspepsia - Ayurvedic poor digestion'),
  ('Yakritpleeha', 'NAM-020', 'K76.9', 'Liver disease, unspecified - Ayurvedic liver-spleen disorders'),
  ('Mutrakrichra', 'NAM-021', 'R30.0', 'Dysuria - Difficult urination in Ayurveda'),
  ('Mutraghata', 'NAM-022', 'R33', 'Retention of urine - Ayurvedic urinary retention'),
  ('Pramehadrava', 'NAM-023', 'N25.9', 'Disorder of kidney and ureter, unspecified - Diabetic kidney disease'),
  ('Hridroga', 'NAM-024', 'I25.9', 'Chronic ischemic heart disease, unspecified - Ayurvedic heart disease'),
  ('Unmada', 'NAM-025', 'F29', 'Unspecified psychosis not due to a substance - Ayurvedic mental disorder'),
  ('Apasmara', 'NAM-026', 'G40.9', 'Epilepsy, unspecified - Ayurvedic seizure disorder'),
  ('Madhumeha', 'NAM-027', 'E11.9', 'Type 2 diabetes mellitus without complications - Sweet urine disease'),
  ('Raktapitta', 'NAM-028', 'K92.2', 'Gastrointestinal hemorrhage, unspecified - Bleeding disorders in Ayurveda'),
  ('Vishama Jwara', 'NAM-029', 'B54', 'Unspecified malaria - Intermittent fever/malaria in Ayurveda'),
  ('Santatajwara', 'NAM-030', 'A01.0', 'Typhoid fever - Continuous fever in Ayurveda');

-- Create indexes for better performance
CREATE INDEX idx_terms_local_name ON public.terms(local_name);
CREATE INDEX idx_terms_namaste_code ON public.terms(namaste_code);
CREATE INDEX idx_terms_icd_code ON public.terms(icd_code);
CREATE INDEX idx_patients_user_id ON public.patients(user_id);
CREATE INDEX idx_logs_user_id ON public.logs(user_id);
CREATE INDEX idx_logs_timestamp ON public.logs(timestamp DESC);