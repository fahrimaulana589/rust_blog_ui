export interface ProfileLanguageDto {
  name: string;
  level: string;
}

export interface ProfileDto {
  full_name: string;
  headline: string;
  summary: string;
  role: string;
  location: string;
  profile_image: string;
  availability: string;
  years_of_experience: number;
  resume_url: string;
  email: string;
  work_philosophy: string;
  timezone: string;
  specializations: string[];
  tech_focus: string[];
  languages: ProfileLanguageDto[];
}
