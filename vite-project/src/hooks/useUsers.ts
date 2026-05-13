import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUsersResponse {
  users: IUser[];
  total: number;
  pages: number;
  current_page: number;
}

export type UserPayload = {
  name: string;
  email: string;
};

export type UserValidationErrors = Partial<Record<keyof UserPayload, string>>;

export type UserApiError = {
  message?: string;
  errors?: UserValidationErrors;
};

const API_BASE_URL = "https://d1qcsdbpz6o0bc.cloudfront.net";
const USERS_QUERY_KEY = "users";

const requestJson = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw body as UserApiError;
  }

  return body as T;
};

export const useGetUsers = (page: number, pageSize: number) =>
  useQuery({
    queryKey: [USERS_QUERY_KEY, page, pageSize],
    queryFn: () =>
      requestJson<IUsersResponse>(
        `${API_BASE_URL}/users?page=${page}&page_size=${pageSize}`,
      ),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserPayload) =>
      requestJson<{ message: string; user: IUser }>(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UserPayload }) =>
      requestJson<{ message: string; user: IUser }>(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      requestJson<{ message: string }>(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};
