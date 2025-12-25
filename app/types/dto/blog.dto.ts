import type { CategoryDto } from './category.dto'
import type { TagDto } from './tag.dto'

export interface BlogDto {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: string;
  excerpt: string | null;
  thumbnail: string | null;
  published_at: string | null;
  view_count: number;
  category: CategoryDto;
  tags: TagDto[];
  created_at: string;
  updated_at: string;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  category_id: number;
  excerpt?: string;
  status?: string;
  tag_ids?: number[];
  thumbnail?: string;
}

export interface UpdateBlogDto {
  title?: string;
  content?: string;
  category_id?: number;
  excerpt?: string;
  status?: string;
  tag_ids?: number[];
  thumbnail?: string;
}
