export interface ProjectStackDto {
  id: number;
  nama_stack: string;
}

export interface ProjectDto {
  id: number;
  nama_projek: string;
  deskripsi: string;
  status: string;
  progress: number;
  link_demo: string | null;
  slug: string;
  repository: string | null;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  stacks: ProjectStackDto[];
  created_at: string;
  updated_at: string;
}

export interface CreateProjectDto {
  nama_projek: string;
  deskripsi: string;
  status: string;
  progress: number;
  link_demo: string | null;
  repository: string | null;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  stack_ids: number[];
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> { }
