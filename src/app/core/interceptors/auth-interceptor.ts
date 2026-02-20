import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtenemos el token de la sesión si existiera 
  const token = localStorage.getItem('supabase.auth.token'); 

  if (token) {
    // Clonamos la petición e inyectamos el JWT en la cabecera
    const peticionClonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(peticionClonada);
  }

  return next(req);
};