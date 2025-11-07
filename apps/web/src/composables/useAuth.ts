import { ref, computed, type Ref } from 'vue';
import { authClient, type User } from '../lib/auth';

const user: Ref<User | null> = ref(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  const setError = (message: string | null) => {
    error.value = message;
  };

  const clearError = () => {
    error.value = null;
  };

  const signUp = async (email: string, password: string, name: string) => {
    loading.value = true;
    clearError();
    
    try {
      const result = await authClient.signUp.email({ 
        email, 
        password, 
        name 
      });
      
      console.log('SignUp result:', result);
      
      if (result.data) {
        user.value = result.data.user;
        return result.data;
      } else {
        const errorMessage = result.error?.message || 'Sign up failed';
        console.error('SignUp error:', result.error);
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('SignUp exception:', err);
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
      setError(errorMessage);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signIn = async (email: string, password: string) => {
    loading.value = true;
    clearError();
    
    try {
      const result = await authClient.signIn.email({ 
        email, 
        password 
      });
      
      if (result.data) {
        user.value = result.data.user;
        return result.data;
      } else {
        const errorMessage = result.error?.message || 'Sign in failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    loading.value = true;
    try {
      await authClient.signOut();
      user.value = null;
      clearError();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign out failed';
      setError(errorMessage);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const checkSession = async () => {
    try {
      const session = await authClient.getSession();
      if (session.data) {
        user.value = session.data.user;
      } else {
        user.value = null;
      }
    } catch {
      user.value = null;
    }
  };

  return {
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    checkSession,
    clearError,
  };
}