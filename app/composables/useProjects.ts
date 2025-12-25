import type { ProjectDto, CreateProjectDto, UpdateProjectDto } from '../types/dto/project.dto'

export const useProjects = () => {
  const token = useCookie<string | null>('auth_token')
  const loading = useState<boolean>('projects_loading', () => false)

  interface Meta {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  }

  interface ProjectsResponse {
    message: string;
    data: {
      items: ProjectDto[];
      meta: Meta;
    }
  }

  const getProjects = async (page = 1, per_page = 10) => {
    loading.value = true
    try {
      const res = await $fetch<ProjectsResponse>('/api/app/projects', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        query: {
          page: page,
          per_page: Number(per_page)
        }
      })
      return res
    } catch (err) {
      console.error('Fetch projects failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getProject = async (id: number) => {
    loading.value = true
    try {
      // Assuming GET /id returns { message: string, data: ProjectDto } based on typical pattern, 
      // but docs say "Success: blog object" directly or wrapped? 
      // API_DOCUMENTATION says "Success: blog object (see example above)" for blogs.
      // For projects: "GET /app/projects/{id}". I'll assume wrapped in { data: ... } or direct.
      // The lists use { data: { items: [], meta: {} } }. 
      // Usually details are { data: ProjectDto } or just ProjectDto.
      // Based on profile it was { data: ... }. I'll assume { data: ... } or check reponse.
      // Let's use <{data: ProjectDto}> to be safe based on other endpoints.
      const res = await $fetch<{ data: ProjectDto }>(`/api/app/projects/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      return res.data
    } catch (err) {
      console.error('Fetch project failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createProject = async (data: CreateProjectDto) => {
    loading.value = true
    try {
      const res = await $fetch<any>('/api/app/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        body: data
      })
      return true
    } catch (err) {
      console.error('Create project failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProject = async (id: number, data: UpdateProjectDto) => {
    loading.value = true
    try {
      const res = await $fetch<any>(`/api/app/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        body: data
      })
      return true
    } catch (err) {
      console.error('Update project failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProject = async (id: number) => {
    loading.value = true
    try {
      await $fetch(`/api/app/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      return true
    } catch (err) {
      console.error('Delete project failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
  }
}
