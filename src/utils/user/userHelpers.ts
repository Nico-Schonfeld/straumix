import { UserIDType } from "@/types/user/user";

// Tipo para la respuesta de getAllUsers
type GetAllUsersResponse =
  | {
      error: false;
      success: true;
      message: string;
      users: {
        id: number;
        name: string;
        lastName: string;
        username: string;
        email: string;
        avatar: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
      }[];
    }
  | {
      error: true;
      success: false;
      message: string;
    };

/**
 * Extrae los datos del usuario de forma segura desde UserIDType
 * Retorna null si hay error o el usuario no existe
 */
export const extractUserData = (userResponse: UserIDType) => {
  if (userResponse.success && !userResponse.error) {
    return userResponse.user;
  }
  return null;
};

/**
 * Extrae los datos de todos los usuarios de forma segura
 * Retorna array vacío si hay error o no hay usuarios
 */
export const extractUsersData = (usersResponse: GetAllUsersResponse) => {
  if (
    usersResponse.success &&
    !usersResponse.error &&
    "users" in usersResponse
  ) {
    return usersResponse.users;
  }
  return [];
};

/**
 * Hook personalizado para obtener datos del usuario de forma más limpia
 */
export const useUserData = (userResponse: UserIDType) => {
  const user = extractUserData(userResponse);

  return {
    user,
    isLoading: false, // Podrías extender esto si necesitas estado de carga
    hasError: userResponse.error,
    errorMessage: userResponse.error ? userResponse.message : null,
  };
};

/**
 * Hook personalizado para obtener datos de múltiples usuarios
 */
export const useUsersData = (usersResponse: GetAllUsersResponse) => {
  const users = extractUsersData(usersResponse);

  return {
    users,
    isLoading: false,
    hasError: usersResponse.error,
    errorMessage: usersResponse.error ? usersResponse.message : null,
  };
};
