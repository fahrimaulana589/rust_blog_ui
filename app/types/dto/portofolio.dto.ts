import type { ProjectDto } from "./project.dto";

export interface PortofolioDto {
  id: number;
  project: ProjectDto;
  judul: string;
  slug: string;
  deskripsi: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePortofolioDto {
  project_id: number;
  judul: string;
  deskripsi: string;
  is_active: boolean;
}

export interface UpdatePortofolioDto {
  project_id: number;
  judul: string;
  deskripsi: string;
  is_active: boolean;
}
